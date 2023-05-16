# 베이스가 되는 Docker Image로 python 이미지를 사용
FROM python:3.8-slim

# 처음 실행 시 사용 되는 경로 정보 입니다.
WORKDIR /app

# 현재 경로의 main.py 및 모든 파일을 /app 경로로 복사합니다.
COPY . /app

# 현재 경로의 requirements.txt를 /app 경로로 복사합니다.
COPY requirements.txt /app

# 복사 된 requirements.txt를 사용하여 pip로 패키지를 추가합니다.
RUN pip install -r requirements.txt

# ffmpeg 설치
RUN apt-get --allow-releaseinfo-change update

RUN apt-get install -y ffmpeg

#  uvicorn을 사용하여 main.py의 app을 실행시킵니다.
CMD uvicorn --host=0.0.0.0 --port 5000 main:app



