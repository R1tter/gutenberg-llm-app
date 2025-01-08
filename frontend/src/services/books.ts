const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function fetchBooks() {
  const response = await fetch(`${API_BASE_URL}/books`);
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  return response.json();
}

export async function fetchBookById(id: number | string) {
  const response = await fetch(`${API_BASE_URL}/books/${id}`);
  if (!response.ok) {
    throw new Error("Book not found");
  }
  return response.json();
}

export async function analyzeBook(book_id: number) {
  const response = await fetch(`${API_BASE_URL}/analyze/${book_id}`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to analyze book");
  }
  return response.json();
}
