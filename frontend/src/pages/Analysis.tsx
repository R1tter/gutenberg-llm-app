import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { analyzeBook } from "@/services/books";
import Footer from "@/components/Footer/Footer";

export default function Analysis() {
  const { id } = useParams<{ id: string }>();
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      analyzeBook(Number(id))
        .then((data) => {
          setAnalysis(data.analysis);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-4">
        {loading ? (
          <p className="text-center mt-4">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center mt-4">{error}</p>
        ) : analysis ? (
          <div className="max-w-2xl mx-auto bg-white shadow-md rounded p-6">
            <h1 className="text-2xl font-bold mb-4">Analysis</h1>
            <p className="text-gray-700 whitespace-pre-wrap">{analysis}</p>
          </div>
        ) : (
          <p className="text-center">No analysis found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
