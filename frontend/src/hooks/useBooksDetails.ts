import { useEffect, useState } from "react";
import { BookDetails } from "../../types/book";
import { fetchBookById } from "@/services/books";

export function useBookDetails(id: number | string) {
  const [book, setBook] = useState<BookDetails | null>(null); // Usa o tipo importado
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);
      try {
        const data: BookDetails = await fetchBookById(id); // Retorno é do tipo BookDetails
        setBook(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id]);

  return { book, loading, error };
}
