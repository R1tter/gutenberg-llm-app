import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookById } from "@/services/books";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book } from "@/types/book";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBookById(id)
        .then(setBook)
        .catch((err) => setError(err.message));
    }
  }, [id]);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!book) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="max-w-md w-full p-6 shadow-md">
        <img
          src={book.coverImageUrl || "/src/assets/bookPlaceholder.png"}
          alt="Book Cover"
          className="w-full h-64 object-cover mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
        <h2 className="text-lg text-gray-600 mb-4">by {book.author}</h2>
        <p className="text-sm text-gray-500 mb-4">{book.summary || "No summary available."}</p>
        <p className="text-sm text-gray-500 mb-4">
          <strong>Year:</strong> {book.year || "Unknown"}
        </p>
        <div className="flex justify-between">
          <Button onClick={() => navigate("/")} variant="outline">
            Back to Home
          </Button>
          <Button onClick={() => alert("Feature Coming Soon!")}>Analyze</Button>
        </div>
      </Card>
    </div>
  );
}
