from collections.abc import Generator
from fastapi.testclient import TestClient

import pytest
from sqlmodel import Session, delete

from app.core.db import engine
from app.main import app
from app.models import User, Movie


@pytest.fixture(scope="function", autouse=True)
def db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session
        session.execute(delete(User))
        session.execute(delete(Movie))
        session.commit()


@pytest.fixture(scope="module")
def client() -> Generator[TestClient, None, None]:
    with TestClient(app) as c:
        yield c
