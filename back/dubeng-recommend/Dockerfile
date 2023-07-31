FROM python:3.9-slim

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

RUN pip install gunicorn

COPY . /app

WORKDIR /app

CMD uvicorn --host=0.0.0.0 --port 5000 main:app
