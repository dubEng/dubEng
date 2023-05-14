import subprocess
from flask import Flask, request, jsonify
from youtube_transcript_api import YouTubeTranscriptApi
from pydub import AudioSegment
from videoInfo import getVideoId, get_video_info
from io import BytesIO
import boto3
import time
import os
import glob
from pytube import YouTube
import pymysql
import time
import os
import json
import logging
from pitch import getPitches
import numpy as np
import traceback

app = Flask(__name__)

# env 파일 읽어오기
f_conn = open("./env.txt")

DB_HSOT = f_conn.readline().strip()
DB_USER = f_conn.readline().strip()
DB_DATABASE_NAME = f_conn.readline().strip()
DB_PASSWORD = f_conn.readline().strip()
DB_CHARSET = "utf8mb4"
# CURSORCLASS = pymysql.cursors.Cursor
BUCKET_NAME = f_conn.readline().strip()
AWS_ACCESS_KEY_ID = f_conn.readline().strip()
AWS_SECRET_ACCESS_KEY = f_conn.readline().strip()
AWS_DEFAULT_REGION = 'ap-northeast-2'

f_conn.close()
# 로그 생성

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)


def cleanDownloadFolder(userId):
    time.sleep(3)
    path = './download/output/'+userId+'/*'
    if os.path.exists('download/output/'+userId):
        dwnDir = glob.glob(path)
        for file in dwnDir:
            os.remove(file)
        logging.info(f"I cleaned the download directory")
        path = './download/'+userId+'.mp3'
        if os.path.exists(path):
            os.remove(path)
            logging.info(f"I cleaned the original mp3")
            return True
    return False


def deletIllegalSymbols(name):
    # 허용되지 않는 문자 제거
    name = name.replace(r'[^\w\s-]', '').strip()
    # 공백을 언더바로 변경
    name = name.replace(r'\s+', '_')
    return name


# 장르/상황 카테고리 목록 가져오는 함수
def getCategories():
    categories = []  # DB에서 가져온 카테고리 정보를 저장할 객체를 담을 리스트

    # DB 연결
    cursorclass = pymysql.cursors.Cursor
    connection = pymysql.connect(
        host=DB_HSOT, user=DB_USER, database=DB_DATABASE_NAME, password=DB_PASSWORD, charset=DB_CHARSET, cursorclass=cursorclass)
    cursor = connection.cursor()

    # 카테고리 테이블에서 정보 얻어오기
    sql = "select * from category"
    cursor.execute(sql)
    rows = cursor.fetchall()

    for r in rows:
        cate = {
            "id": r[0],
            "name": r[1]
        }
        categories.append(cate)

    connection.commit()
    connection.close()

    return categories


def uploadToBucket(filePath, uploadName):
    key = uploadName
   # 음원 데이터를 메모리 내에서 처리하기 위해 BytesIO 객체 생성
    audio_bytesio = BytesIO()

    # AudioSegment 객체 생성
    audio_segment = AudioSegment.from_file(filePath)

    # AudioSegment 객체를 BytesIO에 기록
    audio_segment.export(audio_bytesio, format="wav")

    # BytesIO에서 바이트 스트림 읽어오기
    audio_bytes = audio_bytesio.getvalue()

    client = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=AWS_SECRET_ACCESS_KEY, region_name=AWS_DEFAULT_REGION)

    client.upload_fileobj(BytesIO(audio_bytes), BUCKET_NAME, key)

    url = f"https://{BUCKET_NAME}.s3.{AWS_DEFAULT_REGION}.amazonaws.com/{key}"

    return url


# 비디오 및 스크립트 Table에 저장하는 함수
def saveVideoAndScript(video, scripts, userId, categories, file_exist):
    # DB 연결
    try:
        cursorclass = pymysql.cursors.Cursor
        connection = pymysql.connect(
            host=DB_HSOT, user=DB_USER, database=DB_DATABASE_NAME, password=DB_PASSWORD, charset=DB_CHARSET, cursorclass=cursorclass)
        cursor = connection.cursor()
        # 비디오 지속시간 계산
        duration = int(video['endTime'])-int(video['startTime'])
        # 비디오 테이블에 데이터 삽입
        sql = "INSERT INTO video (title, runtime, video_path, thumbnail, start_time, end_time, producer, gender, lang_type) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        values = (video['title'], str(duration), video['videoPath'], video['thumbnail'], str(video['startTime']),
                  str(video['endTime']), video['producer'], str(video['gender']), video['lang'])
        cursor.execute(sql, values)

        videoId = cursor.lastrowid
        # 비디오 카테고리 테이블에 데이터 삽입
        for cate in categories:
            sql = "insert into video_category (video_id, category_id) values (%s, %s)"
            values = (videoId, cate)
            cursor.execute(sql, values)
        # 영상 음원 배경음, 보컬 분리, 주파수 계산
        data = seperateMp3(video['videoPath'], userId,
                           video['title'], file_exist, videoId)
        # 음원 저장 경로 테이블에 저장
        if data is not None:
            sql = "UPDATE video SET background_path=%s, voice_path=%s, pitch=%s WHERE id=%s"
            cursor.execute(
                sql, (data['backUrl'], data['vocalUrl'], data['pitch'], str(videoId)))
        else:
            return False
        pitch = json.loads(data['pitch'])
        standard = data['standard']
        # 스크립트 저장
        for sc in scripts:
            sql = "INSERT INTO script (start_time, duration, content, translate_content, video_id, is_dub, pitch) VALUES (%s, %s, %s, %s, %s, %s, %s)"
            temp = list()
            # 프론트에서 startTime, duration 값이 스트링으로 넘어오는 경우 대비 형변환 ---- (1)
            start = float(sc['startTime']) * standard
            end = float(start)+float(sc['duration']) * standard
            # 피치 데이터 찾기
            for idx in range(int(start), int(end)):
                if np.isnan(pitch[idx]):
                    temp.append(0)
                else:
                    temp.append(int(pitch[idx]))

            pitch_text = json.dumps(temp)
            pitch_text = pitch_text.replace('[', '').replace(']', '')
            # (1)과 동일한 이유로 형변환
            dur = float(sc['duration'])*1000
            st = float(sc['startTime'])*1000
            values = (str(st), str(dur), sc['content'],
                      sc['translateContent'], str(videoId), sc['isDub'], pitch_text)
            cursor.execute(sql, values)

        connection.commit()
        connection.close()
    except Exception as e:    # 모든 예외의 에러 메시지를 출력할 때는 Exception을 사용
        print(e)
        print(traceback.format_exc())
        return False
    return True


# 음원 추출 및 분리하는 함수
def seperateMp3(url, userId, videoTitle, file_exist, videoId):
    import os
    cnt = 0
    newname = userId+'.mp3'
    # pytube로 영상 정보 가져오기
    yt = YouTube(url, on_progress_callback=None)
    result = None
    if file_exist == False:
        # 가져와질 때까지 retry...
        while True:
            try:
                # userId의 이름으로 영상 저장
                yt.streams.filter(only_audio=True).first().download(
                    output_path='download', filename=newname)
                break

            except:
                if cnt > 25:
                    return result
                time.sleep(2)
                yt = YouTube(url, on_progress_callback=None)
                cnt += 1
                logging.info(f"retrying.....{cnt}")

    # 음원이 저장된 경로로 이동
    newname = "./download/"+userId+".mp3"

    # # 배경음과 보컬 분리해서 로컬에 저장
    spl_command = ['spleeter', 'separate', '-p',
                   'spleeter:2stems', '-o', './download/output', newname]

    subprocess.run(spl_command, check=True)

    # 사람 소리 주파수 추출해서 배열 정제하라?
    pitch_result = getPitches(userId)

    # 로컬 음원 S3 버킷 업로드
    videoTitle = deletIllegalSymbols(videoTitle)
    videoIdStr = str(videoId)
    backgroundPath = "./download/output/"+userId+"/accompaniment.wav"
    backgroundName = userId+"_"+videoIdStr+"_accompaniment.wav"
    vocalPath = "./download/output/"+userId+"/vocals.wav"
    vocalName = userId+"_"+videoIdStr+"_vocals.wav"

    backUrl = uploadToBucket(backgroundPath, backgroundName)
    vocalUrl = uploadToBucket(vocalPath, vocalName)
    result = {
        "backUrl": backUrl,  # 배경음원 저장 주소
        "vocalUrl": vocalUrl,  # 보컬 음원 저장 주소
        "pitch": pitch_result['pitch'],  # 피치 데이터
        "standard": pitch_result['standard']  # 초당 데이터 수
    }

    return result


# 영상 정보 불러오기 (기본정보 및 스크립트)
@app.route('/admin/videoInfo/<start>/<end>', methods=['GET'])
def sendInfo(start, end):
    try:
        url = request.args.get('url')
        lang = request.args.get('lang')
        # url 뒤에 있는 video id 추출 -> script 불러올 때 필요한 video Id
        video_id = getVideoId(url)
        logging.info(f"{url}")
        # video 정보 가져오기
        data = get_video_info(url)
        result = list()

        if lang == 'english':
            # script 가져오기
            sc = YouTubeTranscriptApi.get_transcript(video_id, languages=[data['lang'], 'en', 'en-US'])
            transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
            transcript = transcript_list.find_transcript([data['lang'], 'en', 'en-US'])
            translated_transcript = transcript.translate('ko').fetch()  # 한국어 script

            for s, t in zip(sc, translated_transcript):
                if float(s['start']) >= float(start) and float(s['start']) <= float(end):
                    s['translation'] = t['text']
                    result.append(s)
                elif float(s['start']) >= float(end):
                    break
        response = {
            "videoInfo": data,
            "scripts": result,
        }
    except Exception as e:    # 모든 예외의 에러 메시지를 출력할 때는 Exception을 사용
        print(e)
        print(traceback.format_exc())
        return json.dumps({'success': False}), 400, {'ContentType': 'application/json'}
    return response


@app.route('/admin/saveVideo', methods=['POST'])
def saveApi():
    try:
        req = json.loads(request.form['data'])
        video = req['video']
        scripts = req.get('scripts')
        userId = req.get('userId')
        categories = req.get('categories')

        file_exist = False
        if 'file' in request.files:
            file = request.files['file']
            if file.filename == '':
                logging.info(f"no file, i will download from youtube")
                file_exist = False
            else:
                os.makedirs('download/output/'+userId, exist_ok=True)
                file.save('download/'+userId+'.mp3')
                file_exist = True
        flag = saveVideoAndScript(
            video, scripts, userId, categories, file_exist)
        if flag:
            cleanDownloadFolder(userId)
            return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
        elif flag == False:
            return json.dumps({'success': "False, Tried too many. Save again."}), 405, {'ContentType': 'application/json'}
    except Exception as e:    # 모든 예외의 에러 메시지를 출력할 때는 Exception을 사용
        print('예외가 발생했습니다.', e)
        print(traceback.format_exc())

    return json.dumps({'success': False}), 400, {'ContentType': 'application/json'}


@ app.route('/admin/download', methods=['POST', 'GET'])
def downloadApi():
    url = request.get_json()['url']
    seperateMp3(url, "39576", "testTitle")

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@ app.route('/admin/cleanDir', methods=['POST', 'GET'])
def cleanDir():
    userId = request.args.get('userId')
    if cleanDownloadFolder(userId):
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}

    else:
        return json.dumps({'success': "Not Found Dir or File"}), 405, {'ContentType': 'application/json'}


@ app.route('/admin/category', methods=['GET'])
def getCate():
    try:
        result = getCategories()
    except:
        return json.dumps({'success': "not found"}), 404, {'ContentType': 'application/json'}
    return jsonify(result)


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)


def flaskRun():
    app.run(debug=True)
