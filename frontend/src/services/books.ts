import { Book } from "@/types/book";
import axios from "axios";

// Use environment variable for the API base URL
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_BACKEND_URL is not defined in the environment variables");
}

interface AnalysisResponse {
  analysis: string;
}

// Fetch all books or search by query (ID or author)
export async function fetchBooks(query?: string): Promise<Book[]> {
  try {
    if (query) {
      if (!isNaN(Number(query))) {
        const book = await fetchBookById(query);
        return [book];
      } else {
        return await fetchBooksByAuthor(query);
      }
    } else {
      const response = await axios.get(`${API_BASE_URL}/books`);
      return response.data;
    }
  } catch (error: any) {
    console.error("Failed to fetch books:", error.response?.status, error.message);
    throw new Error("Failed to fetch books");
  }
}

// Fetch book by ID
export async function fetchBookById(id: number | string): Promise<Book> {
  try {
    const response = await axios.get(`${API_BASE_URL}/books/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Failed to fetch book by ID ${id}:`, error.response?.status, error.message);
    throw new Error("Failed to fetch book by ID");
  }
}

// Fetch books by author
export async function fetchBooksByAuthor(author: string): Promise<Book[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/books`, {
      params: { author },
    });
    return response.data;
  } catch (error: any) {
    console.error(`Failed to fetch books by author "${author}":`, error.response?.status, error.message);
    throw new Error("Failed to fetch books by author");
  }
}

// Analyze book
export async function analyzeBook(book_id: number): Promise<AnalysisResponse> {
  try {
    const response = await axios.post<AnalysisResponse>(
      `${API_BASE_URL}/analyze/${book_id}`,
      null,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(`Failed to analyze book with ID ${book_id}`, error);
    throw new Error(error.response?.data?.detail || "Failed to analyze book");
  }
}

// Toggle favorite
export async function toggleFavorite(bookId: number): Promise<{ id: number; is_favorite: boolean }> {
  try {
    const response = await axios.post(`${API_BASE_URL}/${bookId}/favorite`);
    return response.data;
  } catch (error: any) {
    console.error(`Failed to toggle favorite for book ID ${bookId}:`, error.response?.status, error.message);
    throw new Error("Failed to toggle favorite");
  }
}

// Fetch favorite books
export async function fetchFavorites(): Promise<Book[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/favorites`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch favorite books:", error.response?.status, error.message);
    throw new Error("Failed to fetch favorite books");
  }
}
