// Represents a basic book
export interface Book {
  id: number;
  title: string;
  author: string;
  year?: number;
  coverImageUrl?: string;
  language?: string;
  summary?: string;
  content?: string;
}

// Represents a book with additional details
export interface BookDetails extends Book {
  content: string;
}
