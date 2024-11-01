from datetime import datetime
from email.policy import default
from typing import Optional

from markdown_it.rules_block import table
from pydantic import field_validator
from sqlalchemy import Text, Date
from sqlmodel import Field, SQLModel, Relationship


class DefaultAnswer(SQLModel):
    message: str


class UserBase(SQLModel):
    username: str = Field(unique=True)
    is_admin: bool = Field(default=False)


class User(UserBase, table=True):
    id: int = Field(primary_key=True)
    password: str


class UsersPublic(SQLModel):
    items: list[UserBase]
    count: int


class MoviesFileUploadAnswer(DefaultAnswer):
    content_amount: int


class DirectorMovieLink(SQLModel, table=True):
    movie_id: Optional[int] = Field(default=None, foreign_key="movie.id", primary_key=True)
    director_id: Optional[int] = Field(default=None, foreign_key="director.id", primary_key=True)


class GenreMovieLink(SQLModel, table=True):
    movie_id: Optional[int] = Field(default=None, foreign_key="movie.id", primary_key=True)
    genre_id: Optional[int] = Field(default=None, foreign_key="genre.id", primary_key=True)


class CountryMovieLink(SQLModel, table=True):
    movie_id: Optional[int] = Field(default=None, foreign_key="movie.id", primary_key=True)
    country_id: Optional[int] = Field(default=None, foreign_key="country.id", primary_key=True)


class Movie(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    imdb_id: int = Field(unique=True)
    tmdb_id: int = Field(unique=True)
    ru_title: str = Field(max_length=255)
    en_title: str = Field(max_length=255)
    original_title: str = Field(max_length=255)
    description: str = Field(sa_type=Text, nullable=False)
    image_path: str = Field(max_length=255)
    release_date: datetime = Field(sa_type=Date)
    duration: int

    ratings: list["Rating"] = Relationship(back_populates="movie", cascade_delete=True)
    directors: list["Movie"] = Relationship(back_populates="movies", link_model=DirectorMovieLink)
    genres: list["Genre"] = Relationship(back_populates="movies", link_model=GenreMovieLink)
    countries: list["Country"] = Relationship(back_populates="movies", link_model=CountryMovieLink)


class MovieCreate(Movie):
    @field_validator('image_path')
    def val_image_url(cls, value: str) -> Optional[str]:
        if not value:
            return None
        assert value.startswith("https://")
        assert any(value.endswith(file_extension) for file_extension in [".png", ".jpg"])
        return value


class MoviesPublic(SQLModel):
    items: list[Movie]
    count: int


class Rating(SQLModel, table=True):
    movie_id: Optional[int] = Field(default=None, foreign_key="movie.id", ondelete="CASCADE", primary_key=True)
    movie: Optional[Movie] = Relationship(back_populates='ratings')

    source: str = Field(max_length=255)
    vote_average: float
    vote_count: int


class Director(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    full_name: str = Field(max_length=255)

    movies: list[Movie] = Relationship(back_populates="directors", link_model=DirectorMovieLink)


class Genre(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=255)

    movies: list[Movie] = Relationship(back_populates="genres", link_model=GenreMovieLink)


class Country(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=255)

    movies: list[Movie] = Relationship(back_populates="countries", link_model=CountryMovieLink)
