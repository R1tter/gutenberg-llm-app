import BookDetails from "@/components/BookDetails/BookDetails";
import Footer from "@/components/Footer/Footer";

export default function Details() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-4">
        <BookDetails />
      </div>
      <Footer />
    </div>
  );
}
