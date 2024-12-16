import csv
import random
from math import ceil
from typing import List, Optional, Annotated

import httpx
from fastapi import APIRouter, HTTPException, UploadFile, File, Form, Response, Depends
from fastapi.params import Body
from pydantic import ValidationError
from sqlalchemy.sql.functions import count
from sqlmodel import select, or_

from app.api.dependencies import SessionDepends, current_active_user
from app.crud import get_recommended_movies
from app.models import (
    Movie, MovieCreate, MoviesFileUploadAnswer, DefaultAnswer, Genre, Pager, ModelsPaginatedPublic, ModelsPublic,
    MoviePublic
)

router = APIRouter()


@router.post(
    "/api/movies/by_form/",
    description="Создаёт фильм/сериал с помощью формы",
    response_model=Movie,
    dependencies=[Depends(current_active_user)],
)
async def create_movie(session: SessionDepends, movie_data: Annotated[MovieCreate, Form()]):
    movie = Movie.model_validate(movie_data)
    session.add(movie)
    session.commit()
    session.refresh(movie)
    return movie


@router.post(
    "/api/movies/by_csv/",
    # TODO изменить описание, добавив необходимые поля (Вынести в отдельную константу список)
    description='В файле необходимо указать такие поля как "title", "genre", "description", "year", "rating" и'
                ' "image_url". Разделитель ";".',
    response_model=MoviesFileUploadAnswer,
    deprecated=True,
    dependencies=[Depends(current_active_user)],
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


@router.get("/api/genres/")
def get_genres(session: SessionDepends) -> ModelsPublic[Genre]:
    genres = session.exec(select(Genre).order_by(Genre.id)).all()
    return ModelsPublic(items=genres)


@router.get("/api/movies/")
def get_movies(
        session: SessionDepends,
        genre_id: Optional[int] = None,
        title: Optional[str] = None,
        page: int = 1,
        page_size: int = 10
) -> ModelsPaginatedPublic[MoviePublic]:
    offset = (page - 1) * page_size

    query = select(Movie)

    if genre_id:
        query = query.where(Movie.genres.any(Genre.id == genre_id))
    if title:
        query = query.where(
            or_(
                Movie.ru_title.icontains(title),
                Movie.en_title.icontains(title),
            )
        )

    movies = session.exec(query.offset(offset).limit(page_size)).all()
    movies_amount = session.exec(query.with_only_columns(count())).first()
    return ModelsPaginatedPublic(
        items=movies,
        pager=Pager(
            total_elements=movies_amount,
            page_size=page_size,
            current_page=page,
            pages_count=ceil(movies_amount/page_size)),
    )


@router.get("/api/movies/{movie_id}")
def get_movie(
        session: SessionDepends,
        movie_id: int,
) -> MoviePublic:
    movie = session.get(Movie, movie_id)
    if not movie:
        raise HTTPException(status_code=404, detail="Фильм не найден")
    return movie


@router.delete(
    "/api/movies/{content_id}/",
    response_model=DefaultAnswer,
    dependencies=[Depends(current_active_user)],
)
def delete_movie(session: SessionDepends, content_id: int):
    movie = session.get(Movie, content_id)
    if not movie:
        raise HTTPException(status_code=404, detail="Фильм не найден")
    session.delete(movie)
    session.commit()
    return DefaultAnswer(message="Фильм удален")


@router.get("/api/movies/random/")
def get_random_movies(session: SessionDepends) -> ModelsPublic[MoviePublic]:
    movies = session.exec(select(Movie)).all()
    random_movies = random.sample(movies, min(10, len(movies)))
    return ModelsPublic(items=random_movies)


@router.post("/api/movies/recommendations/")
def get_movies_recommendations(
        session: SessionDepends,
        liked_movies: Annotated[list[int], Body(max_length=10)],
        disliked_movies: Annotated[list[int], Body(max_length=10)],
) -> ModelsPublic[MoviePublic]:
    return ModelsPublic(items=get_recommended_movies(session, liked_movies, disliked_movies))


@router.get(
    "/api/movies/poster/{poster_path}",
    responses = {
        200: {
            "content": {"image/jpg": {}}
        }
    },
    response_class=Response
)
def get_movies_image(poster_path: str) -> Response:
    if not any(poster_path.endswith(i) for i in [".jpg", ".jpeg", ".png"]):
        raise HTTPException(status_code=404, detail="Неверный формат пути постера. Постер не найден.")

    try:
        response = httpx.get(f"https://image.tmdb.org/t/p/original/{poster_path}")
        response.raise_for_status()
    except httpx.HTTPError:
        raise HTTPException(status_code=500, detail="В данный момент сервис недоступен. Невозможно получить постер.")
    return Response(content=response.content, media_type="image/jpg")
