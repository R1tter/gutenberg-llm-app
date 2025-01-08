import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 5 seconds
});

// Search for books, optionally by author
export async function fetchBooks(author?: string) {
  try {
    const response = await apiClient.get("/books", {
      params: author ? { author } : {}, // filter by author
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.detail || "Failed to fetch books"
    );
  }
}

// Fetch books by ID
export async function fetchBookById(id: number | string) {
  try {
    const response = await apiClient.post(`/books/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.detail || "Failed to fetch book by ID"
    );
  }
}

// Analyze book by ID
export async function analyzeBook(book_id: number) {
  try {
    const response = await apiClient.post(`/analyze/${book_id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.detail || "Failed to analyze book"
    );
  }
}
