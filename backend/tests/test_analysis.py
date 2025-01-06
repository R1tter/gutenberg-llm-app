from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_analyze_book_text():
  response = client.post("/api/analyze", json={"book_id": 1})
  assert response.status_code == 200
  assert "summary" in response.json()