from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import urllib.parse

DEVELOPER_KEY = 'AIzaSyDpyrc3GmHgdivXEoluxuH1uC7kg5JoAro'
YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'

def get_video_info(video_url):
    video_url = 'https://www.youtube.com/watch?v=6jABbHh9qTM'
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
