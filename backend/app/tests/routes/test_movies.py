from datetime import datetime, date
from unittest.mock import patch

import httpx
from fastapi.testclient import TestClient
from sqlmodel import Session, select

from app.models import Movie
from app.tests.utils.movie import create_random_movie, get_random_tmdb_id, get_random_lower_string


def test_delete_no_movie(client: TestClient, db: Session):
    response = client.delete(f"/api/movies/{get_random_tmdb_id()}")
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Фильм не найден"


def test_get_movies_no_params(client: TestClient, db: Session):
    create_random_movie(db)
    create_random_movie(db)
    response = client.get("/api/movies/")
    assert response.status_code == 200
    content = response.json()
    assert len(content["items"]) >= 2

    movies_fields = [
        "id", "imdb_id", "tmdb_id", "ru_title", "en_title", "original_title", "description",
        "image_path", "release_date", "duration", "ratings", "directors", "genres", "countries"
    ]
    item = content["items"][0]
    assert all(field in item for field in movies_fields)
    assert all(isinstance(item[field][0], str) for field in ["directors", "genres", "countries"])

    rating_fields = ["source", "vote_average", "vote_count"]
    assert isinstance(item["ratings"][0], dict)
    assert all(field in item["ratings"][0] for field in rating_fields)
    assert "movie_id" not in item["ratings"][0]


def test_get_filtered_movies(client: TestClient, db: Session):
    movie = create_random_movie(db)
    params = {
        "genre_id": movie.genres[0].id,
        "page_size": 1,
        "title": movie.en_title,
        "page": 1
    }
    response = client.get("/api/movies/", params=params)
    assert response.status_code == 200
    content = response.json()
    assert len(content["items"]) == 1
    assert content["items"][0]["id"] == movie.id


def test_get_movies_only_title(client: TestClient, db: Session):
    movie = create_random_movie(db)
    response = client.get("/api/movies/", params={"title": movie.en_title})
    assert response.status_code == 200
    content = response.json()
    assert len(content["items"]) >= 1
    assert movie.en_title.lower() in content["items"][0]["en_title"].lower()


def test_get_movies_only_genre(client: TestClient, db: Session):
    movie = create_random_movie(db)
    genre = movie.genres[0]

    response = client.get("/api/movies/", params={"genre_id": genre.id})
    assert response.status_code == 200
    content = response.json()
    assert len(content["items"]) == 1
    assert content["items"][0]["genres"][0] == genre.name


def test_delete_movie(client: TestClient, db: Session):
    movie = create_random_movie(db)
    response = client.delete(f"/api/movies/{movie.id}")
    assert response.status_code == 200
    content = response.json()
    query = select(Movie).where(Movie.id == movie.id)
    assert db.exec(query).first() is None
    assert content["message"] == "Фильм удален"


def test_recommend_movies(client: TestClient, db: Session):
    liked_movie = create_random_movie(db)
    movie_to_recommend = create_random_movie(db, genre=liked_movie.genres[0])
    disliked_movie = create_random_movie(db)
    create_random_movie(db, genre=disliked_movie.genres[0])  # Кино которое не должно быть в рекомендации

    data = {
        "liked_movies": [liked_movie.id],
        "disliked_movies": [disliked_movie.id],
    }
    response = client.post("/api/movies/recommendations/", json=data)
    assert response.status_code == 200
    content = response.json()
    assert len(content["items"]) == 1
    assert content["items"][0]["id"] == movie_to_recommend.id


def test_recommend_movies_check_dislike_not_in_response(client: TestClient, db: Session):
    liked_movie = create_random_movie(db)
    disliked_movie = create_random_movie(db)

    data = {
        "liked_movies": [liked_movie.id],
        "disliked_movies": [disliked_movie.id],
    }
    response = client.post("/api/movies/recommendations/", json=data)
    assert response.status_code == 200
    content = response.json()
    assert all(movie["id"] != disliked_movie.tmdb_id for movie in content["items"])


def test_recommend_movies_check_no_data(client: TestClient, db: Session):
    data = {
        "liked_movies": [],
        "disliked_movies": [],
    }
    response = client.post("/api/movies/recommendations/", json=data)
    assert response.status_code == 200
    content = response.json()
    assert len(content["items"]) == 10


def test_recommend_movies_check_too_big_liked(client: TestClient, db: Session):
    data = {
        "liked_movies": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        "disliked_movies": [],
    }
    response = client.post("/api/movies/recommendations/", json=data)
    assert response.status_code == 422


def test_recommend_movies_check_too_big_disliked(client: TestClient, db: Session):
    data = {
        "liked_movies": [],
        "disliked_movies": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    }
    response = client.post("/api/movies/recommendations/", json=data)
    assert response.status_code == 422


def test_get_random_movie(client: TestClient, db: Session):
    create_random_movie(db)
    response = client.get("/api/movies/random/")
    assert response.status_code == 200
    content = response.json()
    assert 1 <= len(content["items"]) <= 10


def test_upload_movie_by_form(client: TestClient, db: Session):
    tmdb_id = get_random_tmdb_id()
    imdb_id = str(tmdb_id)
    title = get_random_lower_string()
    data = {
        "imdb_id": imdb_id,
        "tmdb_id": tmdb_id,
        "ru_title": title,
        "en_title": title,
        "original_title": title,
        "description": title,
        "image_path": "/example.com/image.png",
        "release_date": date(year=2024, month=1, day=1).isoformat(),
        "duration": 60,
    }

    response = client.post("/api/movies/by_form/", data=data)
    assert response.status_code == 200
    json_data = response.json()
    assert "id" in json_data
    for key, value in data.items():
        assert json_data[key] == value


def test_upload_movie_by_form_with_wrong_image_url(client: TestClient, db: Session):
    tmdb_id = get_random_tmdb_id()
    imdb_id = str(tmdb_id)
    title = get_random_lower_string()
    data = {
        "imdb_id": imdb_id,
        "tmdb_id": tmdb_id,
        "ru_title": title,
        "en_title": title,
        "original_title": title,
        "description": title,
        "image_url": "https://exmaple.com/image",
        "release_date": datetime(year=2024, month=1, day=1).date(),
        "duration": 60,
    }

    response = client.post("/api/movies/by_form/", data=data)
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

    response = client.post("/api/movies/by_form/", data=data)
    assert response.status_code == 422


def test_get_genres(client: TestClient, db: Session):
    create_random_movie(db)
    response = client.get("/api/genres/")
    assert response.status_code == 200
    content = response.json()
    assert len(content["items"]) >= 1


def test_get_movies_image(client: TestClient, db: Session):
    patched_content = b'10101'
    with (
        patch(
            "httpx.get",
            lambda path: httpx.Response(
                200, content=patched_content, request=httpx.Request("GET", path)
            )
        )
    ):
        response = client.get("/api/movies/poster/example.jpg")
        assert response.status_code == 200
        assert response.content == patched_content

def test_get_movies_incorrect_image(client: TestClient, db: Session):
    response = client.get("/api/movies/poster/example.incorrect")
    assert response.status_code == 404


def test_cannot_get_movies_image(client: TestClient, db: Session):
    with (
        patch(
            "httpx.get",
            lambda path: httpx.Response(
                404, request=httpx.Request("GET", path)
            )
        )
    ):
        response = client.get("/api/movies/poster/example.jpg")
        assert response.status_code == 500
        result = response.json()
        assert result["detail"] == "В данный момент сервис недоступен. Невозможно получить постер."
