from flask import Flask, request
from flask_cors import CORS
from pydub import AudioSegment

import pymysql

#커스텀 객체 클래스 import
import videoClass

app = Flask(__name__)
CORS(app)

#연결정보 가져오는 함수
def getConnectInfo():
    #DB 연결정보 불러오기
    f_conn = open("./env.txt")

    host = f_conn.readline().strip()
    user = f_conn.readline().strip()
    database = f_conn.readline().strip()
    charset = "utf8mb4"
    cursorclass = pymysql.cursors.Cursor

    f_conn.close()

    result = [host, user, database, charset, cursorclass]

    return result


#videoId를 이용하여 해당 영상 정보를 DB에서 가져오는 함수
def getVideoInfo(videoId):
    video = videoClass.video() #DB에서 가져온 정보를 저장할 video 객체

    #DB에 연결할 정보 가져오기
    connectInfo = getConnectInfo()

     #DB 연결
    connection = pymysql.connect(host=connectInfo[0], user=connectInfo[1], database=connectInfo[2], charset=connectInfo[3], cursorclass=connectInfo[4])
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

    #DB에 연결할 정보 가져오기
    connectInfo = getConnectInfo()

     #DB 연결
    connection = pymysql.connect(host=connectInfo[0], user=connectInfo[1], database=connectInfo[2], charset=connectInfo[3], cursorclass=connectInfo[4])
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

# def mergeAudio(firstList, lastList):
    


@app.route('/dub/start', methods=['POST'])
def startDub():
    
    #request에서 정보 가져오기
    videoId = request.get_json()["videoId"]
    originalVoicePath = request.get_json()["originalPath"]
    userVoiceList = request.get_json()["userPath"]

    #videoId로 DB에서 해당 video 정보 가져오기
    videoInfo = getVideoInfo(videoId)

    #videoId로 DB에서 script 정보 가져오기
    scripts = getScriptInfo(videoId)

    #원본 음성 파일 중 상대역 부분만 잘라서 리스트로 만들기
    original = AudioSegment.from_file(originalVoicePath, format="mp3")
    oppositeAudioList = getOppositList(original, scripts, videoInfo.runtime)

    #사용자가 녹음한 음성파일 리스트를 AudioSegment 객체로 만든 후 리스트에 담기
    userAudioList = []
    for userVoice in userVoiceList:
        user = AudioSegment.from_file(userVoice, format="mp3")
        userAudioList.append(user)
    
    # #두 녹음 파일 합치기
    # finalAudio = ""
    # if (scripts[0].startTime == 0): #사용자가 먼저 시작할 경우
    #     finalAudio = mergeAudio(userAudioList, oppositeAudioList)
    # else: #상대역이 먼저 시작할 경우
    #     finalAudio = mergeAudio(oppositeAudioList, userAudioList)
    
    





    

    data = {'video title': videoInfo.title, 'script content': scripts[0].content}

    return data
    


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)