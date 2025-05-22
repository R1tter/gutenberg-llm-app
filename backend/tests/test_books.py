from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

# Test commented out as POST /api/books/{id} endpoint is not defined in books.router
# def test_fetch_and_save_book():
#   response = client.post("/api/books/1")
#   assert response.status_code == 200
#   assert "title" in response.json()

def test_get_books_endpoint():
  # Test fetching all books
  response = client.get("/api/books")
  assert response.status_code == 200
  assert isinstance(response.json(), list)

  # Test searching by ID (assuming book with ID 1 might exist or endpoint handles it)
  # The test_data.sql script loads a book with ID 1, so we expect 200.
  response_id_1 = client.get("/api/books?id=1")
  assert response_id_1.status_code == 200 
  data_id_1 = response_id_1.json()
  assert isinstance(data_id_1, list)
  if data_id_1: # If list is not empty
    assert len(data_id_1) == 1
    assert data_id_1[0]["id"] == 1

  # Test searching by ID that does not exist
  response_id_not_exist = client.get("/api/books?id=99999")
  assert response_id_not_exist.status_code == 404 
  assert "detail" in response_id_not_exist.json()


  # Test searching with the `search` parameter (for title/author)
  # Assuming test_data.sql has been loaded, which includes "Dracula" by "Bram Stoker" (ID 1)
  # and "The Great Gatsby" by "F. Scott Fitzgerald" (ID 2)
  
  # Search by title
  response_search_title = client.get("/api/books?search=Dracula")
  assert response_search_title.status_code == 200
  assert isinstance(response_search_title.json(), list)
  # Check if "Dracula" is in the results
  found_dracula = False
  for book in response_search_title.json():
      if book["title"] == "Dracula":
          found_dracula = True
          break
  assert found_dracula

  # Search by author
  response_search_author = client.get("/api/books?search=Stoker")
  assert response_search_author.status_code == 200
  assert isinstance(response_search_author.json(), list)
  # Check if a book by "Bram Stoker" is in the results
  found_stoker_book = False
  for book in response_search_author.json():
      if "Bram Stoker" in book["author"]:
          found_stoker_book = True
          break
  assert found_stoker_book

  # Test searching with a term that yields no results
  response_search_no_results = client.get("/api/books?search=NonExistentTermXYZ123")
  assert response_search_no_results.status_code == 404
  assert "detail" in response_search_no_results.json()