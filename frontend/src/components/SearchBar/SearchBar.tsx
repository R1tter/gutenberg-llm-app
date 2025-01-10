import { useState } from "react";
import { useSearch } from "@/hooks/useSearch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Book } from "@/types/book";


interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const { results, error, loading, searchBooks } = useSearch();

  const handleSearch = () => {
    if (!query.trim()) return;
    searchBooks(query.trim());
    if (onSearch) onSearch(query.trim());
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Search by ID or Author"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-72"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="mt-4 grid gap-4">
        {results.length > 0 ? (
          results.map((book: Book) => (
            <Card key={book.id} className="p-4">
              <h2 className="text-lg font-bold">{book.title}</h2>
              <p className="text-gray-600">by {book.author}</p>
            </Card>
          ))
        ) : (
          !loading && <p className="text-gray-500 text-center">No results found</p>
        )}
      </div>
    </div>
  );
}
