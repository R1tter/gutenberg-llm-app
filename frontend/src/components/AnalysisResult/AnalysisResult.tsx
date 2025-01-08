import { useState } from "react";

interface AnalysisResultProps {
  book_id: number;
  content: string;
}

interface AnalysisResponse {
  summary: string;
  word_count: string;
  themes: string;
}

export default function AnalysisResult({ book_id, content }: AnalysisResultProps) {
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeText = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {  "Content-Type": "application/json" },
        body: JSON.stringify({ book_id, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze text");
      }

      const data: AnalysisResponse = await response.json();
      setResult(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <button 
        onClick={analyzeText}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Analyze
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Analysis Result</h2>
          <p><strong>Summary:</strong> {result.summary}</p>
          <p><strong>Word Count:</strong> {result.word_count}</p>
          <p><strong>Themes:</strong> {result.themes}</p>
        </div>
      )}
    </div>
  )
}