import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`transition-all duration-300 h-full ${
        isCollapsed ? "w-16" : "w-64"
      } bg-gradient-to-b from-slate-500 to-white/30 bg-opacity-30 shadow-lg`}
    >
      <div className="p-4 flex flex-col h-full">
        {/* Collapse Button */}
        <div className="flex justify-between items-center mb-8">
          {!isCollapsed && <h1 className="text-xl font-bold text-white">Gutenberg</h1>}
          <button
            onClick={toggleCollapse}
            className="text-white hover:text-gray-400 transition"
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-4">
          <Button
            onClick={() => handleNavigation("/")}
            variant="ghost"
            className={`justify-start text-white hover:bg-slate-700 ${
              isCollapsed ? "p-2" : "p-4"
            }`}
          >
            {!isCollapsed && "Home"}
          </Button>
          <Button
            onClick={() => handleNavigation("/favorites")}
            variant="ghost"
            className={`justify-start text-white hover:bg-slate-700 ${
              isCollapsed ? "p-2" : "p-4"
            }`}
          >
            {!isCollapsed && "Favorites"}
          </Button>
        </nav>

        {/* Placeholder for additional content */}
        <div className="mt-auto">
          {!isCollapsed && (
            <p className="text-xs text-gray-600">Made with ❤️ by Marcelo Ritter, Gutenberg Explorer</p>
          )}
        </div>
      </div>
    </aside>
  );
}
