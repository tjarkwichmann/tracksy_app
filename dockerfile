# Base image
FROM python:3.11-slim

RUN apt-get update && \
    apt-get install -y netcat-openbsd gcc libpq-dev && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY ./app /app


EXPOSE 8000

CMD ["bash", "-c", "echo 'Starting FastAPI application...' && gunicorn -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:8000"]
