FROM python:3.10

ENV PYTHONUNBUFFERED=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN python -m pip install --upgrade pip && pip install -r requirements.txt

ENV PYTHONPATH=/app

WORKDIR /app/
COPY . /app

CMD ["fastapi", "run", "--workers", "4", "app/main.py"]
