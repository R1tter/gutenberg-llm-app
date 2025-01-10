import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

// Fetch all books or search by query (ID or author)
export async function fetchBooks(query?: string) {
  try {
    if (query) {
      // Verifica se o query é um número para buscar por ID
      if (!isNaN(Number(query))) {
        return await fetchBookById(query); // Busca por ID
      } else {
        return await fetchBooksByAuthor(query); // Busca por autor
      }
    } else {
      // Busca todos os livros
      const response = await axios.get(`${API_BASE_URL}/books`);
      return response.data;
    }
  } catch (error) {
    throw new Error("Failed to fetch books");
  }
}

// Fetch book by ID
export async function fetchBookById(id: number | string) {
  const response = await axios.get(`${API_BASE_URL}/books/${id}`); // Certifique-se de que este endpoint existe no backend
  return response.data;
}

// Fetch books by author
export async function fetchBooksByAuthor(author: string) {
  const response = await axios.get(`${API_BASE_URL}/books`, {
    params: { author }, // Verifique se o backend suporta query params para autor
  });
  return response.data;
}

// Analyze book
export async function analyzeBook(book_id: number) {
  const response = await axios.post(`${API_BASE_URL}/analyze/${book_id}`);
  return response.data;
}
