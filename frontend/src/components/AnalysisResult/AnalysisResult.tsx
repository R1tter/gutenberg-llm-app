import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { useAnalyzeBook } from "@/hooks/useAnalyzeBook";
import Spinner from "../ui/Spinner";



interface AnalysisResultProps {
  book_id: number;
  content: string;
}

export default function AnalysisResult({ book_id }: AnalysisResultProps) {
  const { result, loading, error, analyze } = useAnalyzeBook(book_id);

  return (
    <div className="mt-4">
      <Button onClick={analyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </Button>
      {error && 
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
              {error}
          </AlertDescription>
      </Alert>
      }
      {loading && <Spinner />}
      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Analysis Result</h2>
          <p><strong>Summary:</strong> {result.summary}</p>
          <p><strong>Key Characters:</strong> {result.key_characters.join(", ")}</p>
          <p><strong>Language:</strong> {result.language}</p>
          <p><strong>Sentiment:</strong> {result.sentiment}</p>
        </div>
      )}
    </div>
  );
}
