from typing import Any

from fastapi import APIRouter
from sqlmodel import select, func

from app.api.dependencies import SessionDepends
from app.models import User, UsersPublic

router = APIRouter()

@router.get("/users/", response_model=UsersPublic)
def get_users(session: SessionDepends, skip: int = 0, limit: int = 10) -> Any:
    count_query = (
        select(func.count())
        .select_from(User)
    )
    count = session.exec(count_query).one()

    get_query = (
        select(User)
        .offset(skip)
        .limit(limit)
    )
    users = session.exec(get_query).all()

    return UsersPublic(data=users, count=count)
