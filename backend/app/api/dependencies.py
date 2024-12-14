from typing import Generator, Annotated

from fastapi import Depends
from sqlmodel import Session

from app.core.db import engine
from app.core.users import fastapi_users
from app.models import User


def get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionDepends = Annotated[Session, Depends(get_db)]

current_active_user = fastapi_users.current_user(active=True)

ActiveUserDepends = Annotated[User, Depends(current_active_user)]
