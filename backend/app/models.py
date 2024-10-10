from sqlmodel import Field, Relationship, SQLModel

class UserBase(SQLModel):
    username: str = Field(unique=True)
    is_admin: bool = Field(default=False)


class User(UserBase, table=True):
    id: int = Field(primary_key=True)
    password: str


class UsersPublic(SQLModel):
    data: list[UserBase]
    count: int
