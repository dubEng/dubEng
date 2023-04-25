from flask import Flask, render_template, send_file, request, redirect, url_for, jsonify
from youtube_transcript_api import YouTubeTranscriptApi

import multiprocessing
import time
import os
import glob
from pytube import YouTube

import time
import re
import os
import json
import xmltodict

from pathlib import Path
from waitress import serve

app = Flask(__name__)


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


def getInfo(url):
    yt = YouTube(url)
    print("[영상 제목]", yt.title)  # 영상제목
    data = {
        "title": deletIllegalSymbols(yt.title),
        "thumbnail": yt.thumbnail_url,
        "author": yt.author,
        "length": yt.length,  # 영상 길이
        "age_restricted": yt.age_restricted,
    }
    return data


@app.route('/apiRequestDownload', methods=['POST', 'GET'])
def downloadApi():
    url = request.args.get('url')
    yt = YouTube(url)
    stream_audio = yt.streams.get_by_itag(140)
    name = yt.streams.get_audio_only().title

    name = deletIllegalSymbols(name)
    stream_audio.download(output_path='download/dwn',
                          filename='original_audio.mp3')

    import os

    # stems = str(input('stems 선택 : 2, 4, 5 >>>'))
    # path = str(input(r'파일이 있는 경로를 정해주세요. >>>'))
    path = "./download/dwn/"
    os.chdir(path)
    # file_name = str(input('음악 파일의 이름을 적어주세요. >>>'))
    file_name = "original_audio"

    nsfile_name = file_name.replace(' ', '_')

    try:
        os.rename(path+file_name+'.mp3', path+nsfile_name+'.mp3')
    except FileNotFoundError:
        pass
    print('기다려주세요.')
    spl = r'spleeter separate -p spleeter:2stems -o output '+nsfile_name+'.mp3'
    # 'spleeter separate -p spleeter:2stems -o output my_song.mp3'
    os.system(spl)

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/cleanDir', methods=['POST', 'GET'])
def cleanDir():
    cleanDownloadFolder()
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/apiRequestInfo', methods=['POST', 'GET'])
def sendInfo():
    url = request.args.get('url')
    video_id = request.args.get('video_id')
    yt = YouTube(url)
    while True:
        try:
            yt = YouTube(url)
            title = yt.title
            break
        except:
            print("Failed to get name. Retrying...")
            time.sleep(1)
            yt = YouTube(url)
            continue
    data = {
        "title": yt.title,
        "thumbnail": yt.thumbnail_url,
        "author": yt.author,
        "length": yt.length,  # 영상 길이
        "age_restricted": yt.age_restricted,
    }
    captions = yt.captions

    for caption in captions:
        print(caption)  # 가져올 수 있는 언어 확인

    caption = captions.get_by_language_code('a.en')
    # print(caption)

    # print(caption.xml_captions)  # xml형태로 가져옴
    result = xmltodict.parse(caption.xml_captions)
    # result = xmltodict.parse(caption)
    dictionary = json.loads(json.dumps(result))

    sc = YouTubeTranscriptApi.get_transcript(video_id)
    result = list()
    for s in sc:
        if s['start'] > 0 and s['start'] < 10:
            result.append(s)
        else:
            break
    last = {
        "data": data,
        "result": result
    }
    return last
    # return jsonify(data)


def flaskRun():
    app.run(debug=True)
    # serve(app, host=yourip, port = yourport)


if __name__ == '__main__':
    # cleanDownloadFolder()
    flaskProcess = multiprocessing.Process(name='p1', target=flaskRun)
    deleFilesProcess = multiprocessing.Process(
        name='p', target=cleanDownloadFolder)
    flaskProcess.start()
    deleFilesProcess.start()

# if __name__ == '__main__':
#     app.run()
