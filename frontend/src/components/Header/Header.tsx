import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="text-center my-6">
      <h1 className="text-4xl font-bold">Gutenberg Explorer</h1>
      <p className="text-gray-600 text-lg mt-2">
        Discover, analyze, and explore books from Project Gutenberg with AI-powered insights.
      </p>
      <Button variant="link" onClick={() => alert("https://gutenberg.org/")}>
        Learn More
      </Button>
    </header>
  );
}
