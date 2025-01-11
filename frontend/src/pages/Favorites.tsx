import { useState, useEffect } from "react";
import { Book } from "@/types/book";
import Footer from "@/components/Footer/Footer";
import BookCard from "@/components/BookCard/BookCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState<Book[]>([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavorites);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Your Favorites</h1>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                year={book.year}
                coverImageUrl={book.coverImageUrl}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No favorite books found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
