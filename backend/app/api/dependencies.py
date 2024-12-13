from typing import Generator, Annotated, AsyncGenerator

from fastapi import Depends
from fastapi_users.db import SQLAlchemyUserDatabase
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import Session

from app.core.db import engine, async_session_maker
from app.core.users import fastapi_users
from app.models import User


def get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionDepends = Annotated[Session, Depends(get_db)]

async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session

async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)

current_active_user = fastapi_users.current_user(active=True)

ActiveUserDepends = Annotated[User, Depends(current_active_user)]
