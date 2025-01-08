import { Link } from "react-router-dom";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useBooks } from "@/hooks/useBooks";
import Spinner from "../ui/spinner";



export default function BookList() {
  const { books, loading, error } = useBooks();

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Available Books</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <Card key={book.id}>
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="text-sm text-gray-600">by {book.author}</p>
            <Link to={`/books/${book.id}`}>
              <Button className="mt-2">View Details</Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
