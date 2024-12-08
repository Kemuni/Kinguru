from datetime import date
from typing import Optional, Annotated, Generic, TypeVar

from pydantic import field_validator, PlainSerializer, BaseModel
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


class MovieBase(SQLModel):
    imdb_id: str = Field(max_length=16)
    tmdb_id: int
    ru_title: str = Field(max_length=255)
    en_title: str = Field(max_length=255)
    original_title: str = Field(max_length=255)
    description: str
    image_path: str = Field(max_length=255)
    release_date: date
    duration: int


class Movie(MovieBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    imdb_id: str = Field(unique=True, max_length=16)
    tmdb_id: int = Field(unique=True)
    description: str = Field(sa_type=Text, nullable=False)
    release_date: date = Field(sa_type=Date)

    ratings: list["Rating"] = Relationship(back_populates="movie", cascade_delete=True)
    directors: list["Director"] = Relationship(back_populates="movies", link_model=DirectorMovieLink)
    genres: list["Genre"] = Relationship(back_populates="movies", link_model=GenreMovieLink)
    countries: list["Country"] = Relationship(back_populates="movies", link_model=CountryMovieLink)


class MovieCreate(MovieBase):
    @field_validator('image_path')
    def val_image_url(cls, value: str) -> Optional[str]:
        assert value.startswith("/")
        assert any(value.endswith(file_extension) for file_extension in [".png", ".jpg"])
        return value


class RatingBase(SQLModel):
    source: str = Field(max_length=255)
    vote_average: float
    vote_count: int


class Rating(RatingBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    movie_id: int = Field(foreign_key="movie.id", ondelete="CASCADE")
    movie: Optional[Movie] = Relationship(back_populates='ratings')


class Director(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    full_name: str = Field(max_length=255, unique=True)

    movies: list[Movie] = Relationship(back_populates="directors", link_model=DirectorMovieLink)


class Genre(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=255, unique=True, index=True)

    movies: list[Movie] = Relationship(back_populates="genres", link_model=GenreMovieLink)


class Country(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=255, unique=True, index=True)

    movies: list[Movie] = Relationship(back_populates="countries", link_model=CountryMovieLink)


ModelListToStr = Annotated[
    list[SQLModel], PlainSerializer(lambda items: ', '.join(item.name for item in items), return_type=str)
]


class MoviePublic(MovieBase):
    id: int
    ratings: list[RatingBase]
    countries: Annotated[
        list[Country], PlainSerializer(lambda countries: [item.name for item in countries], return_type=list[str])
    ]
    directors: Annotated[
        list[Director], PlainSerializer(lambda directors: [item.full_name for item in directors], return_type=list[str])
    ]
    genres: Annotated[
        list[Genre], PlainSerializer(lambda genres: [item.name for item in genres], return_type=list[str])
    ]


class Pager(SQLModel):
    total_elements: int
    current_page: int
    page_size: int
    pages_count: int


Schema = TypeVar("Schema", bound=SQLModel)

class ModelsPublic(BaseModel, Generic[Schema]):
    items: list[Schema]


class ModelsPaginatedPublic(ModelsPublic[Schema], Generic[Schema]):
    pager: Pager
