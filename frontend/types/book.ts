// Represents a basic book
export interface Book {
  id: number;
  title: string;
  author: string;
}

// Represents a book with additional details
export interface BookDetails extends Book {
  content: string;
}
