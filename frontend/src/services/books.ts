import { Book } from "@/types/book";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

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
  } catch (error) {
    throw new Error("Failed to fetch books");
  }
}

// Fetch book by ID (returns a single book)
export async function fetchBookById(id: number | string): Promise<Book> {
  const response = await axios.get(`${API_BASE_URL}/books/${id}`);
  return response.data;
}

// Fetch books by author (returns an array of books)
export async function fetchBooksByAuthor(author: string): Promise<Book[]> {
  const response = await axios.get(`${API_BASE_URL}/books`, {
    params: { author },
  });
  return response.data;
}

// Analyze book
export async function analyzeBook(book_id: number): Promise<any> {
  const response = await axios.post(`${API_BASE_URL}/analyze/${book_id}`);
  return response.data;
}
