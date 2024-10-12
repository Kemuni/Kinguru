from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlmodel import Session, select
from model import Movie
from core.db import get_session
import csv
import random
from typing import List

router = APIRouter()


# POST создание фильма/сериала через форму
@router.post("/api/movies/upload_by_form/", response_model=Movie)
def create_movie(movie: Movie, session: Session = Depends(get_session)):
    session.add(movie)
    session.commit()
    session.refresh(movie)
    return movie


# POST создание фильма/сериала через .csv файл
@router.post("/api/movies/upload_by_csv/")
async def upload_movies(file: UploadFile = File(...), session: Session = Depends(get_session)):
    if file.content_type != "text/csv":
        raise HTTPException(status_code=400, detail="Недопустимый тип файла")

    reader = csv.DictReader(file.file.read().decode("utf-8").splitlines())
    for row in reader:
        movie = Movie(**row)
        session.add(movie)
    session.commit()
    return {"message": "Фильмы успешно загружены"}


# GET получение списка фильмов с фильтрацией
@router.get("/api/movies/filter/", response_model=List[Movie])
def get_movies(genre: str = None, title: str = None, limit: int = 10, offset: int = 0,
               session: Session = Depends(get_session)):
    query = select(Movie)
    if genre:
        query = query.where(Movie.genre == genre)
    if title:
        query = query.where(Movie.title.contains(title))
    return session.exec(query.offset(offset).limit(limit)).all()


# DELETE удаление фильма
@router.delete("/api/movies/delete/")
def delete_movie(movie_id: int, session: Session = Depends(get_session)):
    movie = session.get(Movie, movie_id)
    if not movie:
        raise HTTPException(status_code=404, detail="Фильм не найден")
    session.delete(movie)
    session.commit()
    return {"message": "Фильм удален"}


# GET получение 10 случайных фильмов с разными жанрами
@router.get("/api/movies/random/", response_model=List[Movie])
def get_random_movies(session: Session = Depends(get_session)):
    movies = session.exec(select(Movie)).all()
    random_movies = random.sample(movies, min(10, len(movies)))
    return random_movies


# POST получение рекомендованных фильмов по жанрам
@router.post("/api/movies/recommendations/", response_model=List[Movie])
def recommend_movies(genres: List[str], session: Session = Depends(get_session)):
    query = select(Movie).where(Movie.genre.in_(genres))
    return session.exec(query.limit(10)).all()
