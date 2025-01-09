import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface BookCardProps {
  id: number;
  title: string;
  author: string;
}

export default function BookCard({ id, title, author }: BookCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Author: {author}</p>
        <Link
          to={`/books/${id}`}
          className="text-blue-500 hover:underline mt-2 inline-block"
        >
          View Details
        </Link>
      </CardContent>
    </Card>
  );
}
