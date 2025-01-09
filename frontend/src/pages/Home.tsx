import { useState, useEffect } from "react";
import { fetchBooks } from "@/services/books";
import Header from "@/components/Header/Header";
import SearchBar from "@/components/SearchBar/SearchBar";
import BookCard from "@/components/BookCard/BookCard";

interface Book {
  id: number;
  title: string;
  author: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks()
      .then(setBooks)
      .catch((err) => setError(err.message));
  }, []);

  const handleSearch = async (query: string) => {
    try {
      const results = await fetchBooks(query);
      setBooks(results);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto">
      <Header />
      <SearchBar onSearch={handleSearch} />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {books.map((book) => (
          <BookCard key={book.id} id={book.id} title={book.title} author={book.author} />
        ))}
      </div>
    </div>
  );
}
