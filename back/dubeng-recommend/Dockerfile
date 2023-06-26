FROM python:3.9-slim

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

RUN pip install gunicorn

COPY . /app

WORKDIR /app

CMD ["gunicorn", "app:app", "-b", "0.0.0.0:5000", "--timeout", "300"]
