import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchMarkdownFile } from "../services/bitbucketApi";

interface MenuItem {
  title: string;
  path: string;
}

export function Sidebar({ onSelect }: { onSelect: (path: string) => void }) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const location = useLocation();

  useEffect(() => {
    const loadSidebar = async () => {
      const content = await fetchMarkdownFile("_sidebar.md");
      const lines = content.split("\n");
      const parsed = lines
        .filter((line) => line.includes("[") && line.includes("]"))
        .map((line) => {
          const match = /\[(.*?)\]\((.*?)\)/.exec(line);
          if (!match) return null;
          return { title: decodeURIComponent(match[1]), path: match[2] };
        })
        .filter(Boolean) as MenuItem[];

      setItems(parsed);
    };

    loadSidebar();
  }, []);

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] bg-[#0F1625] text-white p-4 border-r border-gray-800 overflow-auto">
      <nav className="space-y-2">
        {items.map((item) => (
          <button
            key={item.path}
            onClick={() => onSelect(item.path)}
            className={`block w-full text-left px-3 py-2 rounded hover:bg-[#E7454A]/20 ${
              location.pathname.includes(item.path) ? "bg-[#E7454A]/30" : ""
            }`}
          >
            {item.title}
          </button>
        ))}
      </nav>
    </aside>
  );
}
