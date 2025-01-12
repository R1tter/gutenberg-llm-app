import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { analyzeBook } from "@/services/books";
import Footer from "@/components/Footer/Footer";
import Spinner from "@/components/ui/Spinner";
import { marked } from "marked";

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
          setError(err.message || "An error occurred while analyzing the book");
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 p-4 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            <p className="text-lg font-semibold">Error</p>
            <p>{error}</p>
          </div>
        ) : analysis ? (
          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6 overflow-hidden">
            <h1 className="text-3xl font-bold text-center">Book Analysis</h1>
            <div
              className="prose max-w-none text-gray-800 overflow-y-auto"
              style={{ maxHeight: "75vh" }}
              dangerouslySetInnerHTML={{ __html: marked.parse(analysis) }}
            />
          </div>
        ) : (
          <p className="text-center text-gray-500">No analysis found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
