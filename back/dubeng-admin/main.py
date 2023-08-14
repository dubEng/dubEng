import subprocess
from fastapi import FastAPI, Query, Form, File, UploadFile,status,HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from typing import List
# from requestClass import script, video
import requestClass
from flask import Flask, request, jsonify
from youtube_transcript_api import YouTubeTranscriptApi
from pydub import AudioSegment
from videoInfo import getVideoId, get_video_info, createEmptyList
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

origins = [
    "https://dub-eng.com"
]
app = FastAPI()

# 미들웨어 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# env 파일 읽어오기
f_conn = open("./env.txt")

DB_HSOT = f_conn.readline().strip()
DB_USER = f_conn.readline().strip()
DB_DATABASE_NAME = f_conn.readline().strip()
DB_PASSWORD = f_conn.readline().strip()
DB_CHARSET = "utf8mb4"
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


def clean_download_folder(user_id):
    time.sleep(3)
    path = './download/output/'+user_id+'/*'
    if os.path.exists('download/output/'+user_id):
        dwn_dir = glob.glob(path)
        for file in dwn_dir:
            os.remove(file)
        logging.info(f"I cleaned the download directory")
        path = './download/'+user_id+'.mp3'
        if os.path.exists(path):
            os.remove(path)
            logging.info(f"I cleaned the original mp3")
            return True
    return False


def delet_illegal_symbols(name):
    # 허용되지 않는 문자 제거
    name = name.replace(r'[^\w\s-]', '').strip()
    # 공백을 언더바로 변경
    name = name.replace(r'\s+', '_')
    return name


# 장르/상황 카테고리 목록 가져오는 함수
def get_categories():
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


def upload_to_bucket(file_path, upload_name):
    key = upload_name
   # 음원 데이터를 메모리 내에서 처리하기 위해 BytesIO 객체 생성
    audio_bytesio = BytesIO()

    # AudioSegment 객체 생성
    audio_segment = AudioSegment.from_file(file_path)

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
def save_video_and_script(video, scripts, user_id, categories, file_exist):
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

        video_id = cursor.lastrowid
        # 비디오 카테고리 테이블에 데이터 삽입
        for cate in categories:
            sql = "insert into video_category (video_id, category_id) values (%s, %s)"
            values = (video_id, cate)
            cursor.execute(sql, values)
        # 영상 음원 배경음, 보컬 분리, 주파수 계산
        data = seperateMp3(video['videoPath'], user_id,
                           video['title'], file_exist, video_id)
        # 음원 저장 경로 테이블에 저장
        if data is not None:
            sql = "UPDATE video SET background_path=%s, voice_path=%s, pitch=%s WHERE id=%s"
            cursor.execute(
                sql, (data['backUrl'], data['vocalUrl'], data['pitch'], str(video_id)))
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
                      sc['translateContent'], str(video_id), sc['isDub'], pitch_text)
            cursor.execute(sql, values)

        connection.commit()
        connection.close()
    except Exception as e:    # 모든 예외의 에러 메시지를 출력할 때는 Exception을 사용
        print(e)
        print(traceback.format_exc())
        return False
    return True


# 음원 추출 및 분리하는 함수
def seperateMp3(url, user_id, video_title, file_exist, video_id):
    import os
    cnt = 0
    newname = user_id+'.mp3'
    # pytube로 영상 정보 가져오기
    yt = YouTube(url, on_progress_callback=None)
    result = None
    if file_exist == False:
        # 가져와질 때까지 retry...
        while True:
            try:
                # userId의 이름으로 영상 저장
                yt.streams.filter(only_audio=True).first().download(output_path='download', filename=newname)
                break

            except Exception as e:
                if cnt > 10:
                    return result
                time.sleep(1)
                yt = YouTube(url, on_progress_callback=None)
                cnt += 1
                logging.info(f"retrying.....{cnt}")
                logging.info(f"retrying.....{yt.author}")
                print('예외가 발생했습니다.', e)


    # 음원이 저장된 경로로 이동
    newname = "./download/"+user_id+".mp3"

    # # 배경음과 보컬 분리해서 로컬에 저장
    spl_command = ['spleeter', 'separate', '-p',
                   'spleeter:2stems', '-o', './download/output', newname]

    subprocess.run(spl_command, check=True)

    # 사람 소리 주파수 추출해서 배열 정제하라?
    pitch_result = getPitches(user_id)

    # 로컬 음원 S3 버킷 업로드
    video_title = delet_illegal_symbols(video_title)
    videoIdStr = str(video_id)
    background_path = "./download/output/"+user_id+"/accompaniment.wav"
    background_name = user_id+"_"+videoIdStr+"_accompaniment.wav"
    vocal_path = "./download/output/"+user_id+"/vocals.wav"
    vocal_name = user_id+"_"+videoIdStr+"_vocals.wav"

    backUrl = upload_to_bucket(background_path, background_name)
    vocalUrl = upload_to_bucket(vocal_path, vocal_name)
    result = {
        "backUrl": backUrl,  # 배경음원 저장 주소
        "vocalUrl": vocalUrl,  # 보컬 음원 저장 주소
        "pitch": pitch_result['pitch'],  # 피치 데이터
        "standard": pitch_result['standard']  # 초당 데이터 수
    }

    return result


# 영상 정보 불러오기 (기본정보 및 스크립트)
@app.get('/admin/videoInfo/{start}/{end}')
def sendInfo(start:int, end:int, url: str = Query(default=None), lang: str = Query(default=None)):
    try:
        # url = request.args.get('url')
        # lang = request.args.get('lang')
        # url 뒤에 있는 video id 추출 -> script 불러올 때 필요한 video Id
        video_id = getVideoId(url)
        logging.info(f"{url}")
        # video 정보 가져오기
        data = get_video_info(url)
        result = list()

        if lang == 'english':
            try:
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
            except:
                result = createEmptyList()

        else:
            result = createEmptyList()


        response = {
            "videoInfo": data,
            "scripts": result,
        }
    except Exception as e:    # 모든 예외의 에러 메시지를 출력할 때는 Exception을 사용
        print(e)
        print(traceback.format_exc())
        raise HTTPException(status_code=404, detail="exception 발생")
    return response


@app.post('/admin/saveVideo', status_code=status.HTTP_200_OK)
async def saveApi(file: UploadFile =File(default=None), data:str=Form(...)):
    try:
        req = json.loads(data)
        video = req['video']
        print(video['videoPath'])
        scripts = req.get('scripts')
        user_id = req.get('userId')
        categories = req.get('categories')

        file_exist = False
        if file is not None:
                os.makedirs('download/output/'+user_id, exist_ok=True)                
                mp3 = await file.read()
                filename = user_id + '.mp3'
                with open(os.path.join('download', filename), "wb") as fp:
                    fp.write(mp3)
                # file.save('download/'+user_id+'.mp3')
                file_exist = True

        flag = save_video_and_script(
            video, scripts, user_id, categories, file_exist)
        if flag:
            clean_download_folder(user_id)
            return {"message":"success"}
        elif flag == False:
            raise HTTPException(status_code=404, detail="Item not found by kms")
    except Exception as e:    # 모든 예외의 에러 메시지를 출력할 때는 Exception을 사용
        print('예외가 발생했습니다.', e)
        message = "예외발생" + traceback.format_exc()
        raise HTTPException(status_code=404, detail=message)

    


@app.get('/admin/category')
def getCate():
    try:
        result = get_categories()
    except:
        raise HTTPException(status_code=404, detail="Item not found")
    return result


if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=5000)


