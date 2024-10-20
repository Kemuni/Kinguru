import csv
import random
from typing import List
import os
from fastapi import APIRouter, HTTPException, UploadFile, File
from sqlmodel import select

from app.api.dependencies import SessionDepends
from app.models import Movie, MovieCreate
from typing import List, Optional

router = APIRouter()
# Directory to save uploaded images
IMAGE_UPLOAD_DIR = "uploaded_images/"

@router.post("/api/movies/upload_by_form/", response_model=Movie)
def create_movie(session: SessionDepends, movie_data: MovieCreate):
    movie = Movie.from_orm(movie_data)
    session.add(movie)
    session.commit()
    session.refresh(movie)
    return movie


@router.post("/api/movies/upload_by_form/", response_model=Movie)
def create_movie(session: SessionDepends, movie_data: MovieCreate, image: UploadFile = File(None)):
    image_url = None
    if image:
        file_extension = image.filename.split(".")[-1]
        if file_extension not in ["jpg", "jpeg", "png", "img"]:
            raise HTTPException(status_code=400, detail="Invalid image format. Only jpg, jpeg, png are allowed.")

        image_filename = f"{movie_data.title}_{image.filename}"
        image_path = os.path.join(IMAGE_UPLOAD_DIR, image_filename)

        with open(image_path, "wb") as f:
            f.write(image.file.read())
        image_url = image_path

    movie = Movie.from_orm(movie_data)
    movie.image_url = image_url
    session.add(movie)
    session.commit()
    session.refresh(movie)

    return movie


@router.post("/api/movies/upload_by_csv/")
def upload_movies(session: SessionDepends, file: UploadFile = File(...)):
    if file.content_type != "text/csv":
        raise HTTPException(status_code=400, detail="Invalid file type")

    reader = csv.DictReader(file.file.read().decode("utf-8").splitlines())
    movies_data = []

    for row in reader:
        movie_data = {
            "title": row["title"],
            "genre": row["genre"],
            "description": row.get("description"),
            "year": int(row["year"]) if row.get("year") else None,
            "rating": float(row["rating"]) if row.get("rating") else None,
            "img_path": row.get["img_path"]
        }
        movies_data.append(movie_data)

    if not movies_data:
        raise HTTPException(status_code=400, detail="CSV файл не содержит корректных данных о фильме")
    session.bulk_insert_mappings(Movie, movies_data)
    session.commit()
    return {"message": "Фильмы успешно загружены"}



@router.get("/api/movies/`/", response_model=List[Movie])
def get_movies(
        session: SessionDepends,
        genre: Optional[str] = str | None,
        title: Optional[str] = str | None,
        page: int = 1,
        page_size: int = 10
):
    offset = (page - 1) * page_size

    query = select(Movie)

    if genre:
        query = query.where(Movie.genre == genre)
    if title:
        query = query.where(Movie.title.contains(title))

    movies = session.exec(query.offset(offset).limit(page_size)).all()
    return movies


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

@router.get("/api/movies/recommendations/", response_model=List[Movie])
def recommend_movies(
    genre: str,
    year: int,
    session: SessionDepends,
    limit: Optional[int] = 10
):
    min_year = year - 10
    max_year = year + 10

    query = select(Movie).where(
        Movie.genre == genre,
        min_year <= Movie.year,
        max_year >= Movie.year
    ).limit(limit)
    return session.exec(query).all()
