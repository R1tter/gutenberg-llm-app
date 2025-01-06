from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_fetch_and_save_book():
  response = client.post("/api/books/1")
  assert response.status_code == 200
  assert "title" in response.json()

def test_list_books():
  response = client.get("/api/books")
  assert response.status_code == 200
  assert isinstance(response.json(), list)