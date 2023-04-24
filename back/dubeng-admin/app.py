from flask import Flask, render_template, send_file, request, redirect, url_for, jsonify

import multiprocessing, time, os, glob
from pytube import YouTube

import time, re, os, json

from pathlib import Path
from waitress import serve

# app = Flask(__name__, template_folder='frontEnd/templates', static_folder='frontEnd/static')
app = Flask(__name__)

# from download.downloadAudio import audio, video, getInfo, deletIllegalSymbols



def cleanDownloadFolder():
    time.sleep(2000)
    dwnDir = glob.glob('download/dwn/*')
    for file in dwnDir:
        os.remove(file)
    print('i cleaned the download directory.')

def audio(url):
    yt = YouTube(url)



    # yt.streams.get_audio_only().download(output_path='download/dwn', filename=name)
    stream_audio = yt.streams.get_by_itag(140)
    name = yt.streams.get_audio_only().title

    name = deletIllegalSymbols(name) + '.mp3'
    stream_audio.download(output_path='download/dwn')


    return name


def video(url):

    yt = YouTube(url)

    def down(stream):
        print('out of loop')
        name = stream.title
        name = deletIllegalSymbols(name)
        stream.download(output_path='download/dwn', filename=name)

        os.rename(f"download/dwn/{name}.mp4", f"download/dwn/{name}VIDEO.mp4")
        audio(url)
        os.rename(f"download/dwn/{name}.mp3", f"download/dwn/{name}AUDIO.mp3")

        import subprocess
        cmd = f"ffmpeg -i download/dwn/{name}VIDEO.mp4 -i download/dwn/{name}AUDIO.mp3 -c:v copy -c:a aac download/dwn/{name}.mp4"
        subprocess.call(cmd, shell=True)
        
        os.remove(f"download/dwn/{name}VIDEO.mp4")
        os.remove(f"download/dwn/{name}AUDIO.mp3")

        return name

    resolutions = ['1080p', '720p', '480p', '360p', '240p', '144p']
    for stream in yt.streams.filter(adaptive=True):
        for res in resolutions:
            if stream.resolution == res:
                name = down(stream)
                return name



def getInfo(url):
    yt = YouTube(url)

    data = {
        "title": deletIllegalSymbols(yt.title),
        "thumbnail": yt.thumbnail_url,
        "views": yt.views,
        "author": yt.author,
        "length": yt.length
    }

    return data



def deletIllegalSymbols(name):
    name = re.sub(r'\W+', ' ', name)
    name = name.replace(" ", "")
    return name


@app.route('/', methods=['POST', 'GET'])
def mainPage():
    if request.method == 'POST':
        url = request.form['urlInp']
        # url = 'https://www.youtube.com/watch?v=D16gRI7R2XI'

        return downloadMedia(url, 'audio') # mp3 파일만 다운로드 받을 것.
        # if request.form['downBut'] == 'downloadAudio':
        #     return downloadMedia(url, 'audio')
        # elif request.form['downBut'] == 'downloadVideo':
        #     return downloadMedia(url, 'video')



@app.route('/download')
def downloadMedia(urlLink, type):
    if (type == 'video'):
        extension = 'mp4'
        fileName = video(urlLink)
    elif (type == 'audio'):
        extension = 'mp3'
        fileName = audio(urlLink)
    
    return send_file(filename_or_fp=f"download/dwn/{fileName}.mp3", as_attachment=True)



@app.route('/apiRequestDownload', methods=['POST', 'GET'])
def downloadApi():
    url = request.args.get('url')
    type = request.args.get('type')

    if (type == 'audio'):
        return downloadMedia(url, 'audio')
    elif (type == 'video'):
        return downloadMedia(url, 'video')

@app.route('/apiRequestInfo', methods=['POST', 'GET'])
def sendInfo():
    url = request.args.get('url')
    dataJson = getInfo(url)

    return jsonify(dataJson)




def flaskRun():
    app.run(debug=True)
    #serve(app, host=yourip, port = yourport)



if __name__ == '__main__':
    #cleanDownloadFolder()
    flaskProcess = multiprocessing.Process(name='p1', target=flaskRun)
    deleFilesProcess = multiprocessing.Process(name='p', target=cleanDownloadFolder)
    flaskProcess.start()
    deleFilesProcess.start()
    
# if __name__ == '__main__':
#     app.run()