import { useEffect, useState } from "react";
import { BookDetails } from "../types/book";
import { fetchBookById } from "@/services/books";

export function useBookDetails(id: number | string) {
  const [book, setBook] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);
      try {
        const data = await fetchBookById(id);


        if (!data.content) {
          throw new Error("Book content is missing.");
        }


        setBook(data as BookDetails);
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
