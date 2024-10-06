FROM python:3.11.10-slim

WORKDIR /app
COPY . /app

RUN pip install -r /app/requirements.txt

CMD ["python", "-m", "app"]