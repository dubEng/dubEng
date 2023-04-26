from flask import Flask, render_template, send_file, request, redirect, url_for, jsonify
from youtube_transcript_api import YouTubeTranscriptApi
from vedioInfo import getVedioId, get_video_info
import classes

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

def saveVideo(req):
    try:
        print(req['title'])
        print(type(req["endTime"]))
        #DB 연결
        cursorclass = pymysql.cursors.Cursor
        connection = pymysql.connect(host=DB_HSOT, user=DB_USER, database=DB_DATABASE_NAME, charset=DB_CHARSET, cursorclass=cursorclass)
        cursor = connection.cursor()
        sql = "INSERT INTO VIDEO (title, runtime, thumbnail, start_time, end_time, producer, gender, lang_type) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        # cursor.execute(sql, (req['title'], req['runtime'], req['thumbnail'], req['startTime'], req['endTime'], req['producer'], req['gender'], req['lang']))
        values=(req['title'], req['runtime'], req['thumbnail'], req['startTime'], req['endTime'], req['producer'], req['gender'], req['lang'])
        cursor.execute(sql,values)
        connection.commit()
        connection.close()
    except:
        return False
    return True    


# 영상 정보 불러오기 (기본정보 및 스크립트)
@app.route('/videoInfo', methods=['POST', 'GET'])
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
        elif s['start']>float(end) :
            break
    last = {
        "vedioInfo": data,
        "scripts": result
    }
    return last

@app.route('/admin/saveVedio', methods=['POST'])
def saveApi():
    req = request.get_json()['video']
    flag = saveVideo(req)
    print(flag)
    if flag:
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
 

    return json.dumps({'success': False}), 405, {'ContentType': 'application/json'}


@app.route('/admin/download', methods=['POST', 'GET'])
def downloadApi():
    url = request.get_json()['url']
    while True: 
        try:
            yt = YouTube(url)
            stream_audio = yt.streams.get_by_itag(140)
            name = yt.streams.get_audio_only().title + '.mp3'

            stream_audio.download(output_path='download/dwn',
                                filename=name)
            break
        except:
            yt = YouTube(url)
            print('retrying....')
            continue

    import os

    path = "./download/dwn/"
    os.chdir(path)

    print('기다려주세요.')
    spl = r'spleeter separate -p spleeter:2stems -o output '+name
    # 'spleeter separate -p spleeter:2stems -o output my_song.mp3'
    os.system(spl)

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

