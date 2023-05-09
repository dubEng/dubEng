from flask import Flask, request
from flask_cors import CORS
from pydub import AudioSegment
from pydub.utils import make_chunks

import pymysql
import boto3
from io import BytesIO
from datetime import datetime

import json
from urllib.request import urlopen

#커스텀 객체 클래스 import
import videoClass


app = Flask(__name__)
CORS(app, supports_credentials=True)


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

#videoId를 이용하여 해당 영상 정보를 DB에서 가져오는 함수
def getVideoInfo(videoId):
    video = videoClass.video() #DB에서 가져온 정보를 저장할 video 객체

    #DB 연결
    cursorclass = pymysql.cursors.Cursor
    connection = pymysql.connect(host=DB_HOST, user=DB_USER, passwd=DB_PASSWORD, database=DB_DATABASE_NAME, charset=DB_CHARSET, cursorclass=cursorclass)
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
    connection = pymysql.connect(host=DB_HOST, user=DB_USER, passwd=DB_PASSWORD, database=DB_DATABASE_NAME, charset=DB_CHARSET, cursorclass=cursorclass)
    cursor = connection.cursor()

    #video 테이블에서 정보 얻어오기
    sql = "select start_time, duration, content, translate_content from script where video_id = %s"
    cursor.execute(sql, [videoId])
    rows = cursor.fetchall()
    
    for r in rows:
        script = videoClass.script()
        script.set(r[0], r[1], r[2], r[3])
        scriptList.append(script)
    
    connection.commit()
    connection.close()
    
    return scriptList

def getOppositList(original, scripts, runtime):
    #자르기 시작하는 시간(ms)
    startTime = 0
    #script 객체 배열 반복문 시작 시점
    startIdx = 0

    #첫 script의 시작시간이 0일 경우에는 그 이후부터 음원 자르기 수행
    if (scripts[0].startTime == 0):
        startTime = (scripts[0].startTime+scripts[0].duration)
        startIdx = 1
    

    #########상대역 음원 부분을 배열에 저장하기#########
    oppositeTimeList = []
    for script in range(startIdx, len(scripts)):
        time = scripts[script].startTime - startTime
        oppositeTimeList.append(time)
        startTime += scripts[script].duration    

    lastTime = scripts[len(scripts)-1].startTime+scripts[len(scripts)-1].duration
    #script가 끝나고 뒤에 음성이 더 있는 경우
    if (lastTime < runtime):
        time = runtime - lastTime
        oppositeTimeList.append(time)
    

    #########상대역 음성파일 잘라서 리스트에 넣기#########
    offset = 0 #상대역이 먼저 시작할 경우

    if (startIdx!=0): #유저가 먼저 시작할 경우
        offset = scripts[0].duration

    chunks = []
    for duration in oppositeTimeList:
        chunk = original[offset:offset+duration]
        chunks.append(chunk)
        offset+=duration
    
    return chunks

def mergeAudio(firstList, lastList, bgAudio):
    isSame = False
    if (len(firstList) == len(lastList)): #시작과 끝이 다른 리스트에 있는 경우
        isSame = True
    
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

    result = AudioSegment.empty()
    for chunk in bgm_chunks:
        result += chunk.overlay(mergedAudio)

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


@app.route('/record/preview', methods=['POST'])
def maekPreviewAudio():
    
    #request에서 정보 가져오기
    req = json.loads(request.form['data'])
    videoId = req.get("videoId")
    userId = req.get("userId")
    
    #videoId로 DB에서 해당 video 정보 가져오기
    videoInfo = getVideoInfo(videoId)

    #videoId로 DB에서 script 정보 가져오기
    scripts = getScriptInfo(videoId)

    #사용자가 녹음한 음성파일 리스트를 AudioSegment 객체로 만든 후 리스트에 담기
    userAudioList = []
    files = request.files.getlist('file')

    for file in files:
        wav_data = file.read()
        audio_segment = AudioSegment.from_wav(BytesIO(wav_data))
        userAudioList.append(audio_segment)

    #원본 음성 파일 중 상대역 부분만 잘라서 리스트로 만들기
    response = urlopen(videoInfo.voicePath)
    wav_data = response.read()
    original = AudioSegment.from_file(BytesIO(wav_data), format="wav")
    oppositeAudioList = getOppositList(original, scripts, videoInfo.runtime)


    #두 녹음 파일과 배경음악 합치기
    response = urlopen(videoInfo.bgPath)
    wav_data = response.read()
    bgAudio = AudioSegment.from_file(BytesIO(wav_data), format="wav")
    finalAudio = AudioSegment.empty()
    if (scripts[0].startTime == 0): #사용자가 먼저 시작할 경우
        finalAudio = mergeAudio(userAudioList, oppositeAudioList, bgAudio)
    else: #상대역이 먼저 시작할 경우
        finalAudio = mergeAudio(oppositeAudioList, userAudioList, bgAudio)
    
    #s3 버킷에 업로드하기
    keyStr = str(userId) + videoInfo.title + ".wav"
    resultUrl = uploadToBucket(finalAudio, keyStr)

    return resultUrl
    

@app.route('/record/save', methods=['POST'])
def save():
    #request에서 정보 가져오기
    videoId = request.get_json()["videoId"]
    userId = request.get_json()["userId"]
    url = request.get_json()["url"]
    date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    #DB 연결
    cursorclass = pymysql.cursors.Cursor
    connection = pymysql.connect(host=DB_HOST, user=DB_USER, passwd=DB_PASSWORD, database=DB_DATABASE_NAME, charset=DB_CHARSET, cursorclass=cursorclass)
    cursor = connection.cursor()

    #video 테이블에서 정보 얻어오기
    sql = "INSERT INTO record (video_id, user_id, is_public, is_active, play_count, record_path, like_count, vote_count, created_date, updated_date) VALUES (%s, %s, 1, 1, 0, %s, 0, 0, %s, %s)"
    values = (videoId, userId, url, date, date)
    cursor.execute(sql, values)

    connection.commit()
    connection.close()

    return "done"


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)