import { useState, useEffect } from "react";
import { fetchBooks } from "@/services/books";
import Header from "@/components/Header/Header";
import SearchBar from "@/components/SearchBar/SearchBar";
import BookCard from "@/components/BookCard/BookCard";
import { Book } from "@/types/book";
import Footer from "@/components/Footer/Footer";
import Spinner from "@/components/ui/Spinner";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchBooks()
      .then((data) => {
        setBooks(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const results = await fetchBooks(query);
      setBooks(results);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Header />
      <SearchBar onSearch={handleSearch} />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {loading ? (
        <Spinner />
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center col-span-full mt-6">
          No books found.
        </p>
      )}
      <Footer />
    </div>
  );
}
