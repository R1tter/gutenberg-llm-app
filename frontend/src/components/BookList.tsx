import { useEffect, useState } from "react";

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
            <strong>{book.title}</strong> by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}