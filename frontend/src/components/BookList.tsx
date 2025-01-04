import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Book {
  id: number;
  title: string;
  author: string;
}

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/books")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Available Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id} className="mb-2">
            <Link to={`/books/${book.id}`} className="text-blue-500 hover:underline">
               <strong>{book.title}</strong> by {book.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}