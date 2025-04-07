import { useEffect, useState } from "react";
import { fetchMarkdownFile } from "../services/bitbucketApi";

type MenuSection = {
  title: string;
  items: {
    label: string;
    file: string;
  }[];
};

type SidebarProps = {
  onSelect: (file: string) => void;
};

export default function Sidebar({ onSelect }: SidebarProps) {
  const [menu, setMenu] = useState<MenuSection[]>([]);

  useEffect(() => {
    fetchMarkdownFile("_sidebar.md")
      .then(parseSidebar)
      .then(setMenu);
  }, []);

  function parseSidebar(markdown: string): MenuSection[] {
    const lines = markdown.split("\n");
    const sections: MenuSection[] = [];
    let currentSection: MenuSection | null = null;

    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/;

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("- ") && !linkRegex.test(trimmed)) {
        // Seção
        const title = trimmed.replace("- ", "").trim();
        currentSection = { title, items: [] };
        sections.push(currentSection);
      } else if (linkRegex.test(trimmed) && currentSection) {
        const match = trimmed.match(linkRegex);
        if (match) {
            const label = fixEncoding(match[1]);
          const file = match[2];
          currentSection.items.push({ label, file });
        }
      }
    });

    function fixEncoding(str: string): string {
        try {
          const bytes = new Uint8Array([...str].map(c => c.charCodeAt(0)));
          const decoder = new TextDecoder("iso-8859-1");
          return decoder.decode(bytes);
        } catch (e) {
          return str;
        }
    }
      

    return sections;
  }

  return (
    <aside className="w-64 bg-gray-50 p-4 border-r border-gray-200 overflow-y-auto">
      {menu.map((section) => (
        <div key={section.title} className="mb-4">
          <h3 className="text-gray-700 font-semibold mb-2">{section.title}</h3>
          <ul className="space-y-1 pl-2">
            {section.items.map((item) => (
              <li
                key={item.file}
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={() => onSelect(item.file)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
