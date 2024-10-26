from typing import Optional

from pydantic import field_validator
from sqlalchemy import Text
from sqlmodel import Field, SQLModel


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


class MovieBase(SQLModel):
    title: str = Field(max_length=255)
    genre: str = Field(max_length=255)
    description: str = Field(sa_type=Text, nullable=False)
    year: int
    rating: float
    image_url: Optional[str] = Field(max_length=255, nullable=True, default=None)


class MovieCreate(MovieBase):
    @field_validator('image_url')
    def val_image_url(cls, value: str) -> Optional[str]:
        if not value:
            return None
        assert value.startswith("https://")
        assert any(value.endswith(file_extension) for file_extension in [".png", ".jpg"])
        return value


class Movie(MovieBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class MoviesPublic(SQLModel):
    items: list[Movie]
    count: int


class MoviesFileUploadAnswer(DefaultAnswer):
    content_amount: int
