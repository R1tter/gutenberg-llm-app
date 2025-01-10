import { useEffect, useState } from "react";
import { fetchBooks } from "@/services/books";
import { Book } from "../types/book";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const data: Book[] = await fetchBooks();
        setBooks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  return { books, loading, error };
}
