from pytube import YouTube

video_url = 'https://www.youtube.com/watch?v=D16gRI7R2XI'
yt = YouTube(video_url)
stream_audio = yt.streams.get_by_itag(140)
stream_audio.download()