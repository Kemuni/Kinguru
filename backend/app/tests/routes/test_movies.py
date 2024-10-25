from typing import Optional
import os
from tempfile import NamedTemporaryFile

import pytest
from fastapi.testclient import TestClient
from markdown_it.rules_inline import image
from sqlmodel import Session
from websockets.asyncio.client import connect

from app.api.routes.movies import MAX_FILE_SIZE
from app.models import Movie

def create_movie(db: Session, id_int: Optional[int] = None):

    db_movie = Movie(title="Робокоп", genre="fight", description="erwer",
                     year=2009, rating=5.5, id=id_int)
    db.add(db_movie)
    db.commit()
    db.refresh(db_movie)
    return db_movie



def test_get_movies(client: TestClient, db: Session):
    db_movie = create_movie(db)
    response = client.get("/api/movies/", params={"genre": "fight", "page_size": 5, "title": "Робокоп", "page": 1})
    assert response.status_code == 200
    content = response.json()
    assert content["count"] == 1
    for movie in content["items"]:
        assert movie["title"] == db_movie.title
        assert movie["genre"] == db_movie.genre
        assert movie["description"] == db_movie.description
        assert movie["year"] == db_movie.year
        assert movie["rating"] == db_movie.rating

def test_get_movies_no_params(client: TestClient, db: Session):
    db_movie = create_movie(db)
    response = client.get("/api/movies/")
    assert response.status_code == 200
    content = response.json()
    assert content["count"] == 1
    for movie in content["items"]:
        assert movie["title"] == db_movie.title
        assert movie["genre"] == db_movie.genre
        assert movie["description"] == db_movie.description
        assert movie["year"] == db_movie.year
        assert movie["rating"] == db_movie.rating

def test_get_movies_only_title(client: TestClient, db: Session):
    db_movie = create_movie(db)
    response = client.get("/api/movies/", params={"title": "Робокоп"})
    assert response.status_code == 200
    content = response.json()
    assert content["count"] == 1
    for movie in content["items"]:
        assert movie["title"] == db_movie.title
        assert movie["genre"] == db_movie.genre
        assert movie["description"] == db_movie.description
        assert movie["year"] == db_movie.year
        assert movie["rating"] == db_movie.rating

def test_get_movies_only_genre(client: TestClient, db: Session):
    db_movie = create_movie(db)
    response = client.get("/api/movies/", params={"genre": "fight"})
    assert response.status_code == 200
    content = response.json()
    assert content["count"] == 1
    for movie in content["items"]:
        assert movie["title"] == db_movie.title
        assert movie["genre"] == db_movie.genre
        assert movie["description"] == db_movie.description
        assert movie["year"] == db_movie.year
        assert movie["rating"] == db_movie.rating

def test_delete_movie(client: TestClient, db: Session):
    db_movie = create_movie(db, 123)
    id= 123
    response = client.delete(f"/api/movies/{id}")
    assert response.status_code == 200
    content = response.json()
    assert content["message"] == "Фильм удален"


def test_delete_no_movie(client: TestClient, db: Session):
    # db_movie = create_movie(db, 4)
    id=  1
    response = client.delete(f"/api/movies/{id}")
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Фильм не найден"

def test_recommend_movies(client: TestClient, db: Session):
    db_movie = create_movie(db)
    params_for_movie = {
        "genre": "fight",
        "year": 2009,
        "limit": 1
    }
    response = client.get("/api/movies/recommendations/", params=params_for_movie)
    assert response.status_code == 200
    content = response.json()
    assert content["count"] == params_for_movie["limit"]
    for item in content["items"]:
        assert item["title"] == db_movie.title
        assert item["genre"] == db_movie.genre
        assert item["year"] <= db_movie.year + 10 and item["year"] >= db_movie.year - 10

def test_get_random_movie(client: TestClient, db: Session):
    db_movie = create_movie(db)
    response = client.get("/api/movies/random/")
    assert response.status_code == 200
    content = response.json()
    assert content["count"] == 1
    for item in content["items"]:
        assert item["title"] == db_movie.title
        assert item["genre"] == db_movie.genre
        assert item["description"] == db_movie.description
        assert item["year"] == db_movie.year
        assert item["rating"] == db_movie.rating

def test_post_by_csv(client:TestClient, db:Session):
    csv_file_path = os.path.join(os.path.dirname(__file__), "movies_list.csv")
    with open(csv_file_path, "rb") as file:
        response = client.post("/api/movies/upload_by_csv/", files={"file": ("test_movies.csv", file, "text/csv")})
    assert response.status_code == 200
    content = response.json()
    assert content["message"] == "Фильмы успешно загружены"
    assert content["content_amount"] == 1

def test_post_by_invalid_csv(client: TestClient, db: Session):
    csv_file_path = os.path.join(os.path.dirname(__file__), "RoboCop.jpg")
    with open(csv_file_path, "rb") as file:
        response = client.post("/api/movies/upload_by_csv/", files={"file": ("test_movies.csv", file, "image/jpg")})
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Invalid file type"

def test_post_by_wrong_csv(client: TestClient, db: Session):
    csv_file_path = os.path.join(os.path.dirname(__file__), "invalid_movie_list.csv")
    with open(csv_file_path, "rb") as file:
        response = client.post("/api/movies/upload_by_csv/", files={"file": ("test_movies.csv", file, "text/csv")})
    assert response.status_code == 400
    connect = response.json()
    assert connect["detail"].startswith("Validation error:")


def test_upload_movie_with_file(client: TestClient, db: Session):
    file_path = r"app\tests\routes\RoboCop.jpg"
    files = {"file": open(file_path, "rb")}
    data = {
        "title": "Test Movie",
        "genre": "Action",
        "description": "Test description",
        "year": 2024,
        "rating": 5
    }

    response = client.post("/api/movies/upload_by_form/", files=files, data=data)
    assert response.status_code == 200
    print(response.json())
    json_data = response.json()
    assert json_data["title"] == "Test Movie"
    assert json_data["image_url"].endswith("test_image.jpg")

#create_movie,
# create_invalid_img_movie, create_invalid_file_movie, create_size_limit_movie

#И ТОГО РОВНО 15 ТЕСТОВ

