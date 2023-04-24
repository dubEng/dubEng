from pytube import YouTube

import time, re, os, json

from pathlib import Path

def audio(url):
    yt = YouTube(url)

    name = yt.streams.get_audio_only().title

    name = deletIllegalSymbols(name)

    yt.streams.get_audio_only().download(output_path='download/dwn', filename=name)

    os.rename(f"download/dwn/{name}.mp4", f"download/dwn/{name}.mp3")

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