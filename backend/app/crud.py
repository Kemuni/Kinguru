from sqlalchemy.sql.functions import count
from sqlmodel import select, desc, not_
from sqlalchemy import case
from datetime import datetime

from app.api.dependencies import SessionDepends
from app.models import Movie, Genre, Rating, Director, Country


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


def get_most_wanted_directors(session: SessionDepends, movies_id: list[int], min_occurrences: int = 3) -> list[int]:
    query = (
        select(Director.id)
        .join(Movie.directors)
        .where(Movie.id.in_(movies_id))
        .group_by(Director.id)
        .having(count(Movie.id) >= min_occurrences)
    )
    return session.exec(query).all()


def get_most_wanted_countries(session: SessionDepends, movies_id: list[int], min_occurrences: int = 2) -> list[int]:
    query = (
        select(Country.id)
        .join(Movie.countries)
        .where(Movie.id.in_(movies_id))
        .group_by(Country.id)
        .having(count(Movie.id) >= min_occurrences)
    )
    return session.exec(query).all()


def get_recommended_movies(session: SessionDepends, liked_movies: list[int], disliked_movies: list[int]) -> list[Movie]:
    favorite_directors = get_most_wanted_directors(session=session, movies_id=liked_movies)
    favorite_countries = get_most_wanted_countries(session=session, movies_id=liked_movies)
    
    liked_genres_weights = dict(get_weighted_genres(session=session, movies_id=liked_movies))
    disliked_genres_weights = dict(get_weighted_genres(session=session, movies_id=disliked_movies))
    
    liked_genres = []
    total_weight = 0
    for genre_id, weight in liked_genres_weights.items():
        if genre_id not in disliked_genres_weights:
            liked_genres.append(genre_id)
            total_weight += weight
    
    if not liked_genres:
        query = (
            select(Movie)
            .join(Movie.ratings)
            .where(Movie.id.not_in(liked_movies + disliked_movies))
            .order_by(desc(Rating.vote_average))
            .limit(10)
        )
        return session.exec(query).all()

    genre_score = (
        select(
            Movie.id,
            sum(
                case(
                    {genre_id: weight/total_weight for genre_id, weight in liked_genres_weights.items()},
                    value=Genre.id
                )
            ).label('genre_score')
        )
        .join(Movie.genres)
        .group_by(Movie.id)
        .subquery()
    )

    base_query = (
        select(Movie)
        .join(genre_score, Movie.id == genre_score.c.id)
        .join(Movie.ratings)
        .where(
            Movie.genres.any(Genre.id.in_(liked_genres)),
            not_(Movie.genres.any(Genre.id.in_(disliked_genres_weights.keys()))),
            Movie.id.not_in(liked_movies + disliked_movies)
        )
        .group_by(Movie.id)
        .order_by(
            desc(genre_score.c.genre_score),
            desc(
                case(
                    (Movie.release_date.between(
                        select(func.date_trunc('decade', Movie.release_date))
                        .where(Movie.id.in_(liked_movies))
                        .scalar_subquery(),
                        select(func.date_trunc('decade', Movie.release_date) + interval('10 years'))
                        .where(Movie.id.in_(liked_movies))
                        .scalar_subquery()
                    ), 1.1),
                    else_=1.0
                ) * Rating.vote_average
            )
        )
    )

    movies = []
    
    if favorite_directors:
        directors_query = base_query.where(Movie.directors.any(Director.id.in_(favorite_directors))).limit(2)
        movies.extend(session.exec(directors_query).all())

    if favorite_countries:
        countries_query = base_query.where(Movie.countries.any(Country.id.in_(favorite_countries))).limit(2)
        movies.extend(session.exec(countries_query).all())

    remaining_limit = 10 - len(movies)
    if remaining_limit > 0:
        remaining_query = base_query
        if movies:
            remaining_query = remaining_query.where(Movie.id.not_in([m.id for m in movies]))
        remaining_query = remaining_query.limit(remaining_limit)
        movies.extend(session.exec(remaining_query).all())

    return movies


def get_weighted_genres(session: SessionDepends, movies_id: list[int], limit: int = 3) -> list[tuple[int, float]]:
    query = (
        select(Genre.id, count(Movie.id).label('weight'))
        .join(Movie.genres)
        .where(Movie.id.in_(movies_id))
        .group_by(Genre.id)
        .order_by(desc('weight'))
        .limit(limit)
    )
    return session.exec(query).all()

