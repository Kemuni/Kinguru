import csv
import random
from typing import List, Optional, Annotated

from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import ValidationError
from sqlmodel import select

from app.api.dependencies import SessionDepends
from app.models import Movie, MovieCreate, MoviesFileUploadAnswer, MoviesPublic, DefaultAnswer

router = APIRouter()


@router.post(
    "/api/movies/upload_by_form/",
    description="Создаёт фильм/сериал с помощью формы",
    response_model=Movie,
)
async def create_movie(session: SessionDepends, movie_data: Annotated[MovieCreate, Form()]):
    movie = Movie.model_validate(movie_data)
    session.add(movie)
    session.commit()
    session.refresh(movie)
    return movie


@router.post(
    "/api/movies/upload_by_csv/",
    description='В файле необходимо указать такие поля как "title", "genre", "description", "year", "rating" и'
                ' "image_url". Разделитель ";".',
    response_model=MoviesFileUploadAnswer,
)
async def upload_movies(session: SessionDepends, file: UploadFile = File(...)):
    if file.content_type != "text/csv":
        raise HTTPException(status_code=400, detail="Invalid file type")

    content = await file.read()
    reader = csv.DictReader(content.decode("utf-8").splitlines(), delimiter=';')

    file_fieldnames = set(reader.fieldnames)
    req_fields = ['title', 'genre', 'description', 'year', 'rating', 'image_url']
    if len(file_fieldnames) != 6 or not all(field in file_fieldnames for field in req_fields):
        raise HTTPException(status_code=400, detail=f"Invalid file headers. There must be: {', '.join(req_fields)}.")

    movies_data: List[MovieCreate] = []
    for row in reader:
        try:
            movies_data.append(
                MovieCreate(**row)
            )
        except ValidationError as exc:
            raise HTTPException(
                status_code=400, detail=f"Validation error in #{len(movies_data)+1} row. Details: {exc}"
            )

    session.bulk_insert_mappings(Movie, movies_data)
    session.commit()
    return MoviesFileUploadAnswer(message="Фильмы успешно загружены", content_amount = len(movies_data))


@router.get("/api/movies/", response_model=MoviesPublic)
def get_movies(
        session: SessionDepends,
        genre: Optional[str] = None,
        title: Optional[str] = None,
        page: int = 1,
        page_size: int = 10
):
    offset = (page - 1) * page_size

    query = select(Movie)

    if genre:
        query = query.where(Movie.genre.icontains(genre))
    if title:
        query = query.where(Movie.title.icontains(title))

    movies = session.exec(query.offset(offset).limit(page_size)).all()
    return MoviesPublic(items=movies, count=len(movies))


@router.delete("/api/movies/{content_id}/", response_model=DefaultAnswer)
def delete_movie(session: SessionDepends, content_id: int):
    movie = session.get(Movie, content_id)
    if not movie:
        raise HTTPException(status_code=404, detail="Фильм не найден")
    session.delete(movie)
    session.commit()
    return DefaultAnswer(message="Фильм удален")


@router.get("/api/movies/random/", response_model=MoviesPublic)
def get_random_movies(session: SessionDepends):
    movies = session.exec(select(Movie)).all()
    random_movies = random.sample(movies, min(10, len(movies)))
    return MoviesPublic(items=random_movies, count=len(random_movies))

@router.get("/api/movies/recommendations/", response_model=MoviesPublic)
def recommend_movies(
    genre: str,
    year: int,
    session: SessionDepends,
    limit: Optional[int] = 10
):
    min_year = year - 10
    max_year = year + 10

    query = select(Movie).where(
        Movie.genre.icontains(genre),
        min_year <= Movie.year,
        max_year >= Movie.year
    ).limit(limit)
    movies = session.exec(query).all()
    return MoviesPublic(items=movies, count=len(movies))
