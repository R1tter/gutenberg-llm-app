import { useState } from "react";
import { Book } from "../../types/book";
import { fetchBookById, fetchBooksByAuthor } from "@/services/books";

export function useSearch() {
  const [results, setResults] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const searchBooks = async (query: string) => {
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      if (/^\d+$/.test(query)) {
        // Seach by ID
        const book = await fetchBookById(query);
        setResults([book]);
      } else {
        // Search by author
        const books = await fetchBooksByAuthor(query);
        setResults(books);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { results, error, loading, searchBooks };
}
