import logging
from typing import Optional, Union, AsyncGenerator

from fastapi import Depends, Request
from fastapi_users import BaseUserManager, FastAPIUsers, IntegerIDMixin, models, InvalidPasswordException
from fastapi_users.authentication import (
    AuthenticationBackend,
    JWTStrategy, CookieTransport,
)
from fastapi_users.db import SQLAlchemyUserDatabase
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.responses import Response

from app.core.config import settings
from app.core.db import async_session_maker
from app.models import User, UserCreate

logger = logging.getLogger('uvicorn.error')


class UserManager(IntegerIDMixin, BaseUserManager[User, int]):
    """ Главный класс с основной логикой FastAPI Users. Настраиваем ключи и обработку событий с авторизацией. """
    reset_password_token_secret = settings.SECRET_KEY
    verification_token_secret = settings.SECRET_KEY

    async def on_after_login(
        self,
        user: models.UP,
        request: Optional[Request] = None,
        response: Optional[Response] = None,
    ) -> None:
        logger.info(f"User {user.id} has logged.")

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        logger.info(f"User {user.id} has registered.")

    async def on_after_forgot_password(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        logger.info(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_request_verify(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        logger.info(f"Verification requested for user {user.id}. Verification token: {token}")

    async def validate_password(
            self,
            password: str,
            user: Union[UserCreate, User],
    ) -> None:
        if len(password) < 8:
            raise InvalidPasswordException(
                reason="Password should be at least 8 characters"
            )
        if user.email in password:
            raise InvalidPasswordException(
                reason="Password should not contain e-mail"
            )


# ----- Функции взаимодействия с БД SQLAlchemy -------
async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)


# ---- Логика FastAPI Users ---------
async def get_user_manager(user_db: SQLAlchemyUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)


# Настраиваем транспорт и стратегию для взаимодействия с нашей логикой авторизации
cookie_transport = CookieTransport(cookie_name="userauth", cookie_max_age=3600)


def get_jwt_strategy() -> JWTStrategy[models.UP, models.ID]:
    return JWTStrategy(secret=settings.SECRET_KEY, lifetime_seconds=3600)


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=cookie_transport,
    get_strategy=get_jwt_strategy,
)

# Объект для связи UserManager с классом авторизации, что позволит создавать API routers, а также зависимости
fastapi_users = FastAPIUsers[User, int](get_user_manager, [auth_backend])
