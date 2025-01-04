import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnalysisResult from "./AnalysisResult";

interface BookDetails {
  id: number;
  title: string;
  author: string;
  content: string;
}

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookDetails | null>(null);
  const [ error, setError ] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/books/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Book not found");
        }
        return response.json();
      })
      .then((data) => setBook(data))
      .catch((error) => setError(error.message));
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <h2 className="text-lg text-gray-600">by {book.author}</h2>
      <p className="mt-4">{book.content}</p>
      <AnalysisResult book_id={book.id} content={book.content || "No content available"} />
      </div>
  );
}