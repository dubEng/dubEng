FROM python:3.8-slim

RUN pip install -r requirements.txt

CM ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
