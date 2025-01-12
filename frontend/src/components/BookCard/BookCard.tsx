import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toggleFavorite } from "@/services/books";
import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  year?: number;
  coverImageUrl?: string;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

export default function BookCard({
  id,
  title,
  author,
  year,
  coverImageUrl,
  isFavorite = false,
  onFavoriteToggle,
}: BookCardProps) {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(isFavorite);

  const handleCardClick = () => {
    navigate(`/books/${id}`);
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = await toggleFavorite(id);
    setFavorite(updated.is_favorite);
    if (onFavoriteToggle) {
      onFavoriteToggle();
    }
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition relative"
      onClick={handleCardClick}
    >
      {coverImageUrl ? (
        <img
          src={coverImageUrl}
          alt={title}
          className="w-full h-32 object-cover rounded-t-md"
          onError={(e) =>
            (e.currentTarget.src = "/src/assets/bookPlaceholder2.png")
          }
        />
      ) : (
        <img
          src="/src/assets/bookPlaceholder2.png"
          alt="Book Placeholder"
          className="w-full h-32 object-cover rounded-t-md"
        />
      )}

      <CardHeader>
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">by {author}</p>
      </CardHeader>
      <CardContent>
        {year && (
          <p className="text-sm text-muted-foreground">Published: {year}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="ghost"
          className="absolute top-2 right-2 p-1"
          onClick={handleFavoriteClick}
        >
          <Star
            className={`w-5 h-5 ${
              favorite ? "text-yellow-500" : "text-gray-400"
            }`}
          />
        </Button>
      </CardFooter>
    </Card>
  );
}
