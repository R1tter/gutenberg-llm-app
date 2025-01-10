import { useState } from "react";
import { AnalysisResult } from "../types/analysis";
import { analyzeBook } from "@/services/books";

export function useAnalyzeBook(book_id: number) {
  const [result, setResult] = useState<AnalysisResult | null>(null); // Usa o tipo importado
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: AnalysisResult = await analyzeBook(book_id); // Retorno é do tipo AnalysisResult
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, analyze };
}
