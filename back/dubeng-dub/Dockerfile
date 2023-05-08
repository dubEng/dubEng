FROM python:3.8-slim

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . /app

WORKDIR /app

CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
