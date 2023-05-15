FROM python:3.8-slim

COPY requirements.txt requirements.txt


RUN pip install -r requirements.txt

RUN pip install gunicorn

RUN apt-get --allow-releaseinfo-change update

RUN apt-get install -y ffmpeg

COPY . /app

WORKDIR /app

CMD ["gunicorn", "app:app", "-b", "0.0.0.0:5000", "--timeout", "300"]

