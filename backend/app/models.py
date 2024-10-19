from sqlmodel import Field, Relationship, SQLModel
from typing import Optional

class UserBase(SQLModel):
    username: str = Field(unique=True)
    is_admin: bool = Field(default=False)


class User(UserBase, table=True):
    id: int = Field(primary_key=True)
    password: str


class UsersPublic(SQLModel):
    data: list[UserBase]
    count: int


class Movie(SQLModel, table=True):
    id: int = Field(primary_key=True)
    title: str
    genre: str
    description: Optional[str] = None
    year: Optional[int] = None
    rating: Optional[float] = None
    image_url: Optional[str] = None

class MovieCreate(SQLModel):
    title: str
    genre: str
    description: Optional[str] = None
    year: Optional[int] = None
    rating: Optional[float] = None
