from sqlalchemy.sql.functions import count
from sqlmodel import select, desc, not_

from app.api.dependencies import SessionDepends
from app.models import Movie, Genre, Rating


def get_most_wanted_genres(session: SessionDepends, movies_id: list[int], limit: int = 3) -> list[int]:
    query = (
        select(Genre.id)
        .join(Movie.genres)
        .where(Movie.id.in_(movies_id))
        .group_by(Genre.id)
        .order_by(desc(count(Movie.id)))
        .limit(limit)
    )

    return session.exec(query).all()


def get_recommended_movies(session: SessionDepends, liked_movies: list[int], disliked_movies: list[int]) -> list[Movie]:
    liked_genres = get_most_wanted_genres(session=session, movies_id=liked_movies, limit=3)
    disliked_genres = get_most_wanted_genres(session=session, movies_id=disliked_movies, limit=3)

    query = (
        select(Movie)
        .join(Movie.genres)
        .where(
            Movie.genres.any(Genre.id.in_(liked_genres)),
            not_(Movie.genres.any(Genre.id.in_(disliked_genres))),
            Movie.id.not_in(liked_movies + disliked_movies),
        )
        .group_by(Movie.id)
        .limit(10)
    )
    movies = session.exec(query).all()
    if len(movies) != 0:
        return movies

    query = (
        select(Movie)
        .join(Movie.ratings)
        .order_by(desc(Rating.vote_average))
        .limit(10)
    )
    return session.exec(query).all()
