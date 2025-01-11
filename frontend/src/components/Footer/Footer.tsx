export default function Footer() {
  return (
    <footer className="w-full text-gray-600 py-4 px-6 flex justify-between items-center fixed bottom-0">
      <p className="text-sm">
      © 2025 Gutenberg Explorer. All rights reserved.
      </p>
      <a
        href="https://github.com/R1tter/gutenberg-llm-app"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm underline hover:text-gray-300 transition"
      >
        View on GitHub
      </a>
    </footer>
  );
}
