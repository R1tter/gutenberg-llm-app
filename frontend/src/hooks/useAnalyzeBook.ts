import { useState } from "react";
import { AnalysisResult, AnalysisResponse } from "../types/analysis";
import { analyzeBook } from "@/services/books";

export function useAnalyzeBook(book_id: number) {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: AnalysisResponse = await analyzeBook(book_id);

      const validatedResult: AnalysisResult = {
        analysis: data.analysis,
        summary: data.summary || "No summary available.",
        keyCharacters: data.keyCharacters || [],
        language: data.language || "Unknown",
        sentiment: data.sentiment || "Neutral",
      };

      setResult(validatedResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, analyze };
}
