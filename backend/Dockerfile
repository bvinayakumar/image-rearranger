FROM python:3.11.10-slim

WORKDIR /app
COPY . /app

RUN ls -l
RUN pip install -r /app/requirements.txt

CMD ["python", "app/main.py"]