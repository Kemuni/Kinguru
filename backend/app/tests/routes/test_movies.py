from pathlib import Path

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.models import Movie


def create_movie(db: Session, title: str, genre: str, description: str, year: int, rating: float) -> Movie:
    db_movie = Movie(title=title, genre=genre, description=description, year=year, rating=rating)
    db.add(db_movie)
    db.commit()
    db.refresh(db_movie)
    return db_movie


def test_delete_no_movie(client: TestClient, db: Session):
    response = client.delete(f"/api/movies/1")
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Фильм не найден"


def test_get_movies_no_params(client: TestClient, db: Session):
    create_movie(
        db, title="Робокоп", genre="фантастика, боевик", description="Описание", year=2010, rating=7.6
    )
    response = client.get("/api/movies/")
    assert response.status_code == 200
    content = response.json()
    assert content["count"] >= 1
    assert all(field in content["items"][0] for field in ["title", "genre", "description", "year", "rating"])


def test_get_filtered_movies(client: TestClient, db: Session):
    create_movie(
        db, title="Хатико", genre="драма, биография", description="Описание", year=2008, rating=8.4
    )
    create_movie(
        db, title="Хатико 2", genre="драма, биография", description="Описание", year=2010, rating=5.4
    )
    create_movie(
        db, title="Хатико: Новый герой", genre="фантастика, боевик", description="Описание", year=2002, rating=8.8
    )

    params = {
        "genre": "драма",
        "page_size": 1,
        "title": "Хатико",
        "page": 1
    }
    for page in range(1, 3):
        params[page] = page
        response = client.get("/api/movies/", params=params)
        assert response.status_code == 200
        content = response.json()
        assert content["count"] == 1
        assert len(content["items"]) == 1


def test_get_movies_only_title(client: TestClient, db: Session):
    response = client.get("/api/movies/", params={"title": "Робокоп"})
    assert response.status_code == 200
    content = response.json()
    assert content["count"] >= 1
    assert "робокоп" in content["items"][0]["title"].lower()


def test_get_movies_only_genre(client: TestClient, db: Session):
    response = client.get("/api/movies/", params={"genre": "драма"})
    assert response.status_code == 200
    content = response.json()
    assert content["count"] >= 2
    for movie in content["items"]:
        assert "драма" in movie["genre"].lower()


def test_delete_movie(client: TestClient, db: Session):
    movie = create_movie(
        db, title="Удалить", genre="удалить", description="удалить", year=2001, rating=0.5
    )
    response = client.delete(f"/api/movies/{movie.id}")
    assert response.status_code == 200
    content = response.json()
    assert content["message"] == "Фильм удален"


def test_recommend_movies(client: TestClient, db: Session):
    db_movie = create_movie(
        db, title="Рекомендация", genre="мюзикл", description="рекомендация", year=2005, rating=8.5
    )
    params_for_movie = {
        "genre": "мюзикл",
        "year": 2008,
        "limit": 1
    }
    response = client.get("/api/movies/recommendations/", params=params_for_movie)
    assert response.status_code == 200
    content = response.json()
    assert content["count"] == params_for_movie["limit"]
    assert len(content["items"]) >= 1
    for item in content["items"]:
        assert params_for_movie["genre"].lower() in item["genre"].lower()
        assert db_movie.year + 10 >= item["year"] >= db_movie.year - 10


def test_get_random_movie(client: TestClient, db: Session):
    create_movie(
        db, title="Рандом", genre="рандом", description="рандом", year=2003, rating=4.5
    )
    response = client.get("/api/movies/random/")
    assert response.status_code == 200
    content = response.json()
    assert 1 <= content["count"] <= 10


def test_post_by_csv(client:TestClient, db:Session):
    with open(Path("app/tests/routes/files_for_tests/movies_list.csv"), "rb") as file:
        response = client.post("/api/movies/upload_by_csv/", files={"file": ("test_movies.csv", file, "text/csv")})
    assert response.status_code == 200
    content = response.json()
    assert content["message"] == "Фильмы успешно загружены"
    assert content["content_amount"] == 1


def test_post_by_invalid_csv(client: TestClient, db: Session):
    with open(Path("app/tests/routes/files_for_tests/movies_list.csv"), "rb") as file:
        response = client.post("/api/movies/upload_by_csv/", files={"file": ("test_movies.jpg", file, "image/jpg")})
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Invalid file type"


def test_post_with_wrong_headers_csv(client: TestClient, db: Session):
    with open(Path("app/tests/routes/files_for_tests/invalid_headers_movie_list.csv"), "rb") as file:
        response = client.post("/api/movies/upload_by_csv/", files={"file": ("test_movies.csv", file, "text/csv")})
    assert response.status_code == 400
    connect = response.json()
    assert connect["detail"].startswith("Invalid file headers.")

def test_post_with_wrong_content_csv(client: TestClient, db: Session):
    with open(Path("app/tests/routes/files_for_tests/wrong_movies_list.csv"), "rb") as file:
        response = client.post("/api/movies/upload_by_csv/", files={"file": ("test_movies.csv", file, "text/csv")})
    assert response.status_code == 400
    connect = response.json()
    assert connect["detail"].startswith("Validation error in #1 row.")


def test_upload_movie_by_form(client: TestClient, db: Session):
    data = {
        "title": "Test Movie",
        "genre": "Action",
        "description": "Test description",
        "year": 2024,
        "rating": 5,
        "image_url": "https://exmaple.com/image.png"
    }

    response = client.post("/api/movies/upload_by_form/", data=data)
    assert response.status_code == 200
    json_data = response.json()
    for key, value in data.items():
        assert json_data[key] == value


def test_upload_movie_by_form_with_wrong_image_url(client: TestClient, db: Session):
    data = {
        "title": "Test Movie",
        "genre": "Action",
        "description": "Test description",
        "year": 2024,
        "rating": 5,
        "image_url": "https://exmaple.com/image.csv"
    }

    response = client.post("/api/movies/upload_by_form/", data=data)
    assert response.status_code == 422


def test_upload_movie_by_form_with_wrong_content(client: TestClient, db: Session):
    data = {
        "title": "Test Movie",
        "genre": "Action",
        "description": "Test description",
        "year": "wrong",
        "rating": "wrong",
        "image_url": "https://exmaple.com/image.png"
    }

    response = client.post("/api/movies/upload_by_form/", data=data)
    assert response.status_code == 422
