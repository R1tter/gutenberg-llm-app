import { useParams } from "react-router-dom";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useBookDetails } from "@/hooks/useBooksDetails";
import Spinner from "../ui/spinner";
import AnalysisResult from "../AnalysisResult/AnalysisResult";


export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const { book, loading, error } = useBookDetails(id || "");

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!book) {
    return <p>No book found</p>;
  }

  return (
    <Card className="p-4">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <h2 className="text-lg text-gray-600">by {book.author}</h2>
      <p className="mt-4">{book.content}</p>
      <AnalysisResult book_id={book.id} content={book.content || ""} />
      <Button className="mt-4" onClick={() => window.history.back()}>
        Back to List
      </Button>
    </Card>
  );
}
