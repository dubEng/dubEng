from flask import Flask, render_template, send_file, request, redirect, url_for, jsonify
from youtube_transcript_api import YouTubeTranscriptApi
from pydub import AudioSegment
from vedioInfo import getVedioId, get_video_info
from io import BytesIO
import classes
import subprocess
import boto3
import time
import os
import glob
from pytube import YouTube
import pymysql
import time
import re
import os
import json

from pathlib import Path
from waitress import serve


app = Flask(__name__)

f_conn = open("./env.txt")

DB_HSOT = f_conn.readline().strip()
DB_USER = f_conn.readline().strip()
DB_DATABASE_NAME = f_conn.readline().strip()
DB_CHARSET = "utf8mb4"
# CURSORCLASS = pymysql.cursors.Cursor
BUCKET_NAME = f_conn.readline().strip()
AWS_ACCESS_KEY_ID = f_conn.readline().strip()
AWS_SECRET_ACCESS_KEY = f_conn.readline().strip()
AWS_DEFAULT_REGION = 'ap-northeast-2'

f_conn.close()


def cleanDownloadFolder():
    time.sleep(600)
    dwnDir = glob.glob('download/dwn/*')
    for file in dwnDir:
        os.remove(file)
    print('i cleaned the download directory.')


def deletIllegalSymbols(name):
    name = re.sub(r'\W+', ' ', name)
    name = name.replace(" ", "")
    return name

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

    client = boto3.client('s3',
                      aws_access_key_id=AWS_ACCESS_KEY_ID,
                      aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                      region_name=AWS_DEFAULT_REGION
                      )

    client.upload_fileobj(BytesIO(audio_bytes), BUCKET_NAME, key)

    url = f"https://{BUCKET_NAME}.s3.{AWS_DEFAULT_REGION}.amazonaws.com/{key}"

    return url


def saveVideoAndScript(video, scripts, userId):
    # DB 연결
    cursorclass = pymysql.cursors.Cursor
    connection = pymysql.connect(
        host=DB_HSOT, user=DB_USER, database=DB_DATABASE_NAME, charset=DB_CHARSET, cursorclass=cursorclass)
    cursor = connection.cursor()
    sql = "INSERT INTO video (title, runtime, video_path, thumbnail, start_time, end_time, producer, gender, lang_type) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    values = (video['title'], video['runtime'],video['video_path'], video['thumbnail'], video['startTime'],
              video['endTime'], video['producer'], video['gender'], video['lang'])
    cursor.execute(sql, values)

    print(cursor.lastrowid)

    videoId = cursor.lastrowid
    for sc in scripts:
        sql = "INSERT INTO script (start_time, duration, content, translate_content, video_id, is_dub) VALUES (%s, %s, %s, %s, %s, %s)"
        values = (sc['start_time'], sc['duration'], sc['content'],
                  sc['translate_content'], videoId, sc['is_dub'])
        cursor.execute(sql, values)

    data = seperateMp3(video['video_path'], userId, video['title'])
    sql = "UPDATE video SET background_path=%s, voice_path=%s WHERE id=%s"
    cursor.execute(sql, (data['backUrl'], data['vocalUrl'], videoId))

    connection.commit()
    connection.close()

    return True

def seperateMp3(url, userId, videoTitle):
    
    import os
    cnt = 0
    yt = YouTube(url, on_progress_callback=None)
    while True:
        try:
            newname = userId+'.mp3'
            yt.streams.filter(only_audio=True).first().download(output_path='download/dwn', filename=newname)
            
            # mp3FilePath = filePath.replace('.mp4', newname)
            # os.rename(filePath, mp3FilePath)
            # print(mp3FilePath)
            # stream_audio = yt.streams.get_by_itag(140)
            # name = yt.streams.get_audio_only().title + '.mp3'
            # stream_audio.download(output_path='download/dwn', filename=name)
            break
        except:
            time.sleep(2)
            yt = YouTube(url, on_progress_callback=None)
            cnt+=1
            print('retrying....',cnt)
            continue


    path = "./download/dwn/"
    os.chdir(path)

    print('기다려주세요.')
    spl = r'spleeter separate -p spleeter:2stems -o output '+newname
    # 'spleeter separate -p spleeter:2stems -o output my_song.mp3'
    os.system(spl)
    # result = subprocess.getstatusoutput(spl)
    print("--------------------")
    # print(result)

    # S3 버킷 업로드    
    backgroundPath = "./output/"+userId+"/accompaniment.wav"
    backgroundName = userId+"_accompaniment.wav"
    vocalPath = "./output/"+userId+"/vocals.wav"
    vocalName = userId+"_vocals.wav"

    backUrl = uploadToBucket(backgroundPath, backgroundName)
    vocalUrl = uploadToBucket(vocalPath, vocalName)
    result = {
        "backUrl":backUrl,
        "vocalUrl":vocalUrl
    }
    return result



# 영상 정보 불러오기 (기본정보 및 스크립트)
@app.route('/admin/videoInfo', methods=['POST', 'GET'])
def sendInfo():
    # url = request.args.get('url')
    # start = request.args.get('start')
    # end = request.args.get('end')
    url = request.get_json()['url']
    start = request.get_json()['start']
    end = request.get_json()['end']
    video_id = getVedioId(url)

    # yt = YouTube(url)

    data = get_video_info(url)
    # captions = yt.captions

    # for caption in captions:
    #     print(caption)  # 가져올 수 있는 언어 확인

    sc = YouTubeTranscriptApi.get_transcript(video_id)
    result = list()
    for s in sc:
        if float(s['start']) >= float(start) and float(s['start']) <= float(end):
            result.append(s)
        elif s['start'] > float(end):
            break
    last = {
        "vedioInfo": data,
        "scripts": result
    }
    return last


@app.route('/admin/saveVedio', methods=['POST'])
def saveApi():
    req = request.get_json()['video']
    scripts = request.get_json()['scripts']
    userId = request.get_json()['userId']

    flag = saveVideoAndScript(req, scripts,userId)
    if flag:
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}

    return json.dumps({'success': False}), 405, {'ContentType': 'application/json'}


@app.route('/admin/download', methods=['POST', 'GET'])
def downloadApi():
    url = request.get_json()['url']
    seperateMp3(url, "12937", "videoTitle")

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/cleanDir', methods=['POST', 'GET'])
def cleanDir():
    cleanDownloadFolder()
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)


def flaskRun():
    app.run(debug=True)
    # serve(app, host=yourip, port = yourport)
# if __name__ == '__main__':
#     # cleanDownloadFolder()
#     flaskProcess = multiprocessing.Process(name='p1', target=flaskRun)
#     deleFilesProcess = multiprocessing.Process(
#         name='p', target=cleanDownloadFolder)
#     flaskProcess.start()
#     deleFilesProcess.start()
