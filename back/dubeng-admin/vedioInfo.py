from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import urllib.parse

DEVELOPER_KEY = 'AIzaSyDpyrc3GmHgdivXEoluxuH1uC7kg5JoAro'
YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'

class video:
    def __init__(self):
        self.title = ""
        self.videoPath = ""
        self.bgPath = ""       
        self.runtime = 0        
        self.thumbnail = ""
        self.startTime = 0
        self.endTime = 0
        self.producer = ""
        self.gender = ""
        self.voicePath = ""


    
    def set(self, title, thumbnail, runtime, videoPath, bgPath, voicePath, startT, endT, producer, gender):
        self.title = title
        self.videoPath = videoPath
        self.bgPath = bgPath   
        self.runtime = runtime       
        self.thumbnail = thumbnail
        self.startTime = startT
        self.endTime = endT
        self.producer = producer
        self.gender = gender
        self.voicePath = voicePath
    

def get_video_info(video_url):
    # video_url = 'https://www.youtube.com/watch?v=6jABbHh9qTM'
    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=DEVELOPER_KEY)
    video_id = urllib.parse.urlparse(video_url).query.split('=')[1]
    request = youtube.videos().list(part='snippet', id=video_id)
    response = request.execute()
    info = response['items'][0]['snippet']
    print(info['title']) # 영상 제목
    print(info['thumbnails']['maxres']['url']) # 썸네일
    print(info['channelTitle'])
    data = {
        "title":info['title'],
        "thumbnails":info['thumbnails']['maxres']['url'],
        "channelTitle":info['channelTitle']
    }
    return data

def getVedioId(url):
    video_id = url.split("v=")[1] # "v=" 다음에 오는 값 추출
    # print(video_id) # 동영상 ID 출력
    return video_id




