import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookById } from "@/services/books";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 relative p-4">
      <div className="max-w-3xl w-full shadow-lg rounded-md bg-white overflow-hidden">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">{book.title}</CardTitle>
            <CardDescription className="text-gray-600 text-center">
              by {book.author} {book.year && `(${book.year})`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <img
              src={book.coverImageUrl || "/src/assets/bookPlaceholder.png"}
              alt={book.title}
              className="w-full h-64 object-contain rounded-md shadow-sm"
            />
            <p className="text-gray-700">{book.summary || "No summary available."}</p>
          </CardContent>
          <div className="flex justify-between items-center p-6 border-t">
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
            <Button onClick={() => alert("Feature Coming Soon!")}>Analyze</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
