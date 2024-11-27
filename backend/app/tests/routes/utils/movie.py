import random
import string
from datetime import datetime
from typing import Optional

from sqlmodel import Session

from app.models import Movie, Genre, Director, Rating, Country


def get_random_lower_string(size: int = 32) -> str:
    return "".join(random.choices(string.ascii_lowercase, k=size))

def get_random_tmdb_id() -> int:
    return random.randint(1, 999_999_999)


def create_random_movie(
        db: Session, genre: Optional[Genre] = None, director: Optional[Director] = None,
        country: Optional[Country] = None
) -> Movie:
    """
        Создаёт один случайный объект `Movie` с единственными связанными объектами вида
        `Genre`, `Director`, `Country` и `Rating`, в случае если они не заданы в аргументах функции.
        P.S. Все `*_title` объекта `Movie`, а также аттрибут `description` одинаковы по значению.
    """
    tmdb_id = get_random_tmdb_id()
    title = get_random_lower_string()

    if genre is None:
        genre = Genre(name=get_random_lower_string())
    if director is None:
        director = Director(full_name=get_random_lower_string())
    if country is None:
        country = Country(name=get_random_lower_string())
    movie = Movie(
        imdb_id=str(tmdb_id), tmdb_id=tmdb_id, ru_title=title, en_title=title,
        original_title=title, description=title, image_path=f'/{title}.jpg',
        release_date=datetime.now().date(), duration=random.randint(1, 90),
        genres=[genre], directors=[director], countries=[country]
    )
    db.add(movie)
    db.commit()
    db.refresh(movie)

    rating = Rating(
        source="IMDB", vote_average=random.randint(1, 10), vote_count=random.randint(1, 1_000),
        movie_id=movie.id
    )
    db.add(rating)
    db.commit()

    return movie
