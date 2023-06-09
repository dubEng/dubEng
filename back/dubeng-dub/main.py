from fastapi import FastAPI
import uvicorn

from pydub import AudioSegment
from pydub.utils import make_chunks

import pymysql
import boto3
from io import BytesIO
from datetime import datetime
import requests
import json
import logging

from fastapi.middleware.cors import CORSMiddleware

from urllib.request import urlopen


#커스텀 객체 클래스 import
import videoClass


app = FastAPI()

origins = [
    "https://k8b208.p.ssafy.io",
    "https://k8b208.p.ssafy.io/",
    "https://dub-eng.com/",
    "https://dub-eng.com",
    "http://127.0.0.1:8000/"
]

# 미들웨어 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#env.txt 파일에서 정보 읽어오기
f_conn = open("./env.txt")

DB_HOST = f_conn.readline().strip()
DB_USER = f_conn.readline().strip()
DB_DATABASE_NAME = f_conn.readline().strip()
DB_PASSWORD = f_conn.readline().strip()
DB_CHARSET = "utf8mb4"
BUCKET_NAME = f_conn.readline().strip()
AWS_ACCESS_KEY_ID = f_conn.readline().strip()
AWS_SECRET_ACCESS_KEY = f_conn.readline().strip()
AWS_DEFAULT_REGION = 'ap-northeast-2'

f_conn.close()

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)


#videoId를 이용하여 해당 영상 정보를 DB에서 가져오는 함수
def getVideoInfo(videoId):
    video = videoClass.video() #DB에서 가져온 정보를 저장할 video 객체

    #DB 연결
    cursorclass = pymysql.cursors.Cursor
    connection = pymysql.connect(host=DB_HOST, user=DB_USER,passwd=DB_PASSWORD, database=DB_DATABASE_NAME, charset=DB_CHARSET, cursorclass=cursorclass)
    cursor = connection.cursor()

    #video 테이블에서 정보 얻어오기
    sql = "select title, thumbnail, runtime, video_path, background_path, voice_path, start_time, end_time from video where id = %s"
    cursor.execute(sql, [videoId])
    rows = cursor.fetchall()
    for r in rows:
        video.set(r[0],r[1],r[2],r[3],r[4],r[5],r[6],r[7])
    
    connection.commit()
    connection.close()

    return video

#videoId를 이용하여 해당 영상의 script 정보를 DB에서 가져오는 함수
def getScriptInfo(videoId):
    scriptList = [] #DB에서 가져온 정보를 저장할 script 객체를 담을 리스트 

    #DB 연결
    cursorclass = pymysql.cursors.Cursor
    connection = pymysql.connect(host=DB_HOST, user=DB_USER,passwd=DB_PASSWORD, database=DB_DATABASE_NAME, charset=DB_CHARSET, cursorclass=cursorclass)
    cursor = connection.cursor()

    #video 테이블에서 정보 얻어오기
    sql = "select start_time, duration, is_dub from script where video_id = %s"
    cursor.execute(sql, [videoId])
    rows = cursor.fetchall()
    
    for r in rows:
        dbScript = videoClass.dbScript()
        dbScript.set(r[0], r[1], r[2])
        scriptList.append(dbScript)
    
    connection.commit()
    connection.close()
    
    return scriptList

def getOppositList(original, scripts, videoST, videoET):
    #자르기 시작하는 시간(ms)
    startTime = 0
    #script 객체 배열 반복문 시작 시점
    startIdx = 0

    #첫 script의 시작시간이 video의 startTime과 동일할 경우에는 그 이후부터 음원 자르기 수행
    if (scripts[0].startTime == videoST):
        startTime = scripts[0].startTime + scripts[0].duration
        startIdx = 1
    

    #########상대역 음원 부분을 배열에 저장하기#########
    oppositeTimeList = []

    for script in range(startIdx, len(scripts)):
        time = scripts[script].startTime - startTime
        startTime = scripts[script].startTime+scripts[script].duration  

        if(time==0):
            continue
        oppositeTimeList.append(time)

    lastTime = scripts[len(scripts)-1].startTime + scripts[len(scripts)-1].duration
    #script가 끝나고 뒤에 음성이 더 있는 경우
    if (lastTime < videoET):
        time = videoET - lastTime
        oppositeTimeList.append(time)

    #########상대역 음성파일 잘라서 리스트에 넣기#########
    offset = 0 #상대역이 먼저 시작할 경우

    if (startIdx!=0): #유저가 먼저 시작할 경우
        offset = scripts[0].startTime + scripts[0].duration

    chunks = []
    startIdx = 0
    for duration in oppositeTimeList:
        chunk = original[offset:offset+duration]
        chunks.append(chunk)

        if(startIdx == len(scripts)):
            break

        offset+=(duration+scripts[startIdx].duration)
        startIdx += 1


    
    return chunks

def mergeAudio(firstList, lastList, bgAudio, videoST, videoET):
    isSame = False
    if (len(firstList) == len(lastList)): #시작과 끝이 다른 리스트에 있는 경우
        isSame = True

    logging.info(f"This is fristList length: {len(firstList)}")
    logging.info(f"This is lastList length: {len(lastList)}")
    
    #두 음원 파일을 번갈아가면서 붙이기
    chunks = []
    for i in range(0,len(lastList)):
        chunks.append(firstList[i])
        chunks.append(lastList[i])
    
    if (not isSame): #끝나는 부분이 fisrtList 있기 때문에 한 번 더 더해주기
        chunks.append(firstList[len(firstList)-1])

    #배열에 있는 음원들을 하나의 AudioSegment 객체로 합치기
    mergedAudio = sum(chunks)

    #음성파일의 길이에 맞춰서 배경음악의 길이 자르기
    bgm_chunks = make_chunks(bgAudio, len(mergedAudio))

    temp = AudioSegment.empty()
    for chunk in bgm_chunks:
        temp += chunk.overlay(mergedAudio)

    result = temp[videoST:videoET]

    return result

def uploadToBucket(target, uploadName):
    key = uploadName

    # 음원 데이터를 메모리 내에서 처리하기 위해 BytesIO 객체 생성
    audio_bytesio = BytesIO()

    # AudioSegment 객체를 BytesIO에 기록
    target.export(audio_bytesio, format="wav")

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

def getFile(videoId,nickname):
    request_url = f"https://k8b208.p.ssafy.io/file/dublist?videoId={videoId}&nickname={nickname}"
    response = requests.get(request_url)

    data = json.loads(response.content)
    return data


@app.post('/record/preview')
def maekPreviewAudio(item: videoClass.previewReq):

    videoId = item.videoId
    nickname = item.nickname
    userId = item.userId

    userVoiceList = getFile(videoId, nickname)
    
    #videoId로 DB에서 해당 video 정보 가져오기
    videoInfo = getVideoInfo(videoId)

    #videoId로 DB에서 script 정보 가져오기
    getScripts = getScriptInfo(videoId)
    scripts = []
    for sc in getScripts:
        if(sc.isDub):
            script = videoClass.script()
            script.set(sc.startTime, sc.duration)
            scripts.append(script)


    #원본 음성 파일 중 상대역 부분만 잘라서 리스트로 만들기
    response = urlopen(videoInfo.voicePath)
    wav_data = response.read()
    original = AudioSegment.from_file(BytesIO(wav_data), format="wav")
    oppositeAudioList = getOppositList(original, scripts, videoInfo.startTime*1000, len(original))

    #사용자가 녹음한 음성파일 리스트를 AudioSegment 객체로 만든 후 리스트에 담기
    userAudioList = []

    for userVoice in userVoiceList:
        logging.info(f"링크: {userVoice}")
        user = AudioSegment.from_file(userVoice)
        user = user.apply_gain(-12)
        userAudioList.append(user)

    logging.info(f"userAudioList length: {len(userAudioList)}")

    #두 녹음 파일과 배경음악 합치기
    response = urlopen(videoInfo.bgPath)
    wav_data = response.read()
    bgAudio = AudioSegment.from_file(BytesIO(wav_data), format="wav")
    finalAudio = AudioSegment.empty()
    if (scripts[0].startTime == videoInfo.startTime*1000): #사용자가 먼저 시작할 경우
        logging.info(f"User First")
        finalAudio = mergeAudio(userAudioList, oppositeAudioList, bgAudio, videoInfo.startTime*1000, videoInfo.endTime*1000)
    else: #상대역이 먼저 시작할 경우
        logging.info(f"Opposite First")
        finalAudio = mergeAudio(oppositeAudioList, userAudioList, bgAudio, videoInfo.startTime*1000, videoInfo.endTime*1000)
    



    #s3 버킷에 업로드하기
    keyStr = userId + str(videoId) + ".wav"
    resultUrl = uploadToBucket(finalAudio, keyStr)

    return resultUrl
    

@app.post('/record/save')
async def save(item: videoClass.saveReq):
    #request에서 정보 가져오기
    videoId = item.videoId
    userId = item.userId
    url = item.url
    totalRecordCount = item.totalRecordCount
    totalRecordTime = item.totalRecordTime
    runtime = item.runtime
    date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    #DB 연결
    cursorclass = pymysql.cursors.Cursor
    connection = pymysql.connect(host=DB_HOST, user=DB_USER,passwd=DB_PASSWORD, database=DB_DATABASE_NAME, charset=DB_CHARSET, cursorclass=cursorclass)
    cursor = connection.cursor()
    #record 테이블에 해당 콘텐츠를 녹음한 기록이 있는지 검사
    sql = "SELECT id from record where video_id = %s and user_id = %s "
    cursor.execute(sql, [videoId, userId])
    result = cursor.fetchone()

    logging.info(f"Is Exist?: {result[0]}")

    if result:
        # 이미 녹음한 기록이 있을 경우 
        update_sql = "UPDATE record SET record_path = %s, updated_date = %s WHERE id = %s "
        cursor.execute(update_sql, [url, date, result[0]])
    else:
        #record 테이블에 녹음 데이터 넣기
        insert_sql = "INSERT INTO record (video_id, user_id, is_public, is_active, play_count, record_path, like_count, vote_count, created_date, updated_date) VALUES (%s, %s, 1, 1, 0, %s, 0, 0, %s, %s)"
        values = (videoId, userId, url, date, date)
        cursor.execute(insert_sql, values)

    # 변경사항을 커밋
    connection.commit()

    totalRecordCount += 1
    totalRecordTime += runtime

    #user 정보 업데이트
    sql = "update user set record_count = %s , total_rec_time = %s where id = %s "
    cursor.execute(sql, [totalRecordCount, totalRecordTime, userId])

    connection.commit()
    connection.close()

    return str(videoId)


if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=5000)
