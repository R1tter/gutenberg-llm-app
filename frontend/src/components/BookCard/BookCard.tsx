import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  year?: number;
  coverImageUrl?: string;
}

export default function BookCard({ id, title, author, year, coverImageUrl }: BookCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/books/${id}`);
  };
  return (
    <Card className="p-4" onClick={handleCardClick}>
      {coverImageUrl && (
        <img src={coverImageUrl} alt={title} className="w-full h-32 object-cover mb-4" />
      )}
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-gray-600">by {author}</p>
      {year && <p className="text-gray-500 text-sm">Published: {year}</p>}
    </Card>
  );
}
