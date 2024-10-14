import csv
import random
from typing import List

from fastapi import APIRouter, HTTPException, UploadFile, File
from sqlmodel import select

from app.api.dependencies import SessionDepends
from app.models import Movie

router = APIRouter()

@router.post("/api/movies/upload_by_form/",response_model=Movie)
def create_movie(session: SessionDepends, movie: Movie):
    session.add(movie)
    session.commit()
    session.refresh(movie)
    return movie


@router.post("/api/movies/upload_by_csv/")
async def upload_movies(session: SessionDepends, file: UploadFile = File(...)):
    if file.content_type != "text/csv":
        raise HTTPException(status_code=400, detail="Недопустимый тип файла")

    reader = csv.DictReader(file.file.read().decode("utf-8").splitlines())
    for row in reader:
        movie = Movie(**row)
        session.add(movie)
    session.commit()
    return {"message": "Фильмы успешно загружены"}


@router.get("/api/movies/filter/", response_model=List[Movie])
def get_movies(session: SessionDepends, genre: str = None, title: str = None, limit: int = 10, offset: int = 0):
    query = select(Movie)
    if genre:
        query = query.where(Movie.genre == genre)
    if title:
        query = query.where(Movie.title.contains(title))
    return session.exec(query.offset(offset).limit(limit)).all()


@router.delete("/api/movies/delete/")
def delete_movie(session: SessionDepends, movie_id: int):
    movie = session.get(Movie, movie_id)
    if not movie:
        raise HTTPException(status_code=404, detail="Фильм не найден")
    session.delete(movie)
    session.commit()
    return {"message": "Фильм удален"}


@router.get("/api/movies/random/", response_model=List[Movie])
def get_random_movies(session: SessionDepends):
    movies = session.exec(select(Movie)).all()
    random_movies = random.sample(movies, min(10, len(movies)))
    return random_movies


@router.post("/api/movies/recommendations/", response_model=List[Movie])
def recommend_movies(session: SessionDepends, genres: List[str]):
    query = select(Movie).where(Movie.genre.in_(genres))
    return session.exec(query.limit(10)).all()
