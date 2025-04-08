import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

type LineDiff = {
  type: "added" | "removed" | "unchanged";
  content: string;
};

export default function DiffViewer() {
  const location = useLocation();
  const filename = decodeURIComponent(location.pathname.replace("/admin/diff/", ""));
  const [diffLines, setDiffLines] = useState<LineDiff[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!filename) return;

    const fetchDiff = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://bitbucket.org/allintra/teste-front-end/raw/main/docs/${filename}`
        );

        if (!res.ok) {
          throw new Error("Arquivo original não encontrado");
        }

        const remoteText = await res.text();
        const localText = localStorage.getItem(`md_${filename}`) || "";

        const diff = calculateLineDiff(remoteText, localText);
        setDiffLines(diff);
      } catch (err) {
        setError("Erro ao carregar conteúdo para comparação.");
      } finally {
        setLoading(false);
      }
    };

    fetchDiff();
  }, [filename]);

  const calculateLineDiff = (
    original: string,
    edited: string
  ): LineDiff[] => {
    const originalLines = original.split("\n");
    const editedLines = edited.split("\n");

    const maxLength = Math.max(originalLines.length, editedLines.length);
    const diff: LineDiff[] = [];

    for (let i = 0; i < maxLength; i++) {
      const orig = originalLines[i];
      const edit = editedLines[i];

      if (orig === edit) {
        diff.push({ type: "unchanged", content: edit ?? "" });
      } else {
        if (orig !== undefined) {
          diff.push({ type: "removed", content: orig });
        }
        if (edit !== undefined) {
          diff.push({ type: "added", content: edit });
        }
      }
    }

    return diff;
  };

  if (loading) return <p className="text-white p-4">Carregando diff...</p>;
  if (error) return <p className="text-red-400 p-4">{error}</p>;

  return (
    <div className="min-h-screen bg-[#0F1625] text-white p-8">
      <Header buttonText="Voltar para Área Administrativa" buttonLink="/admin" srcLogo="../../logo.png" />
      <h1 className="text-2xl font-bold mb-6">📝 Comparação: {filename}</h1>
      <div className="bg-[#1B2739] p-4 rounded-xl overflow-x-auto text-sm">
        {diffLines.map((line, index) => (
          <pre
            key={index}
            className={`whitespace-pre-wrap px-2 py-1 rounded-md ${
              line.type === "added"
                ? "bg-green-700/30 text-green-300"
                : line.type === "removed"
                ? "bg-red-700/30 text-red-300"
                : "text-gray-300"
            }`}
          >
            {line.type === "added"
              ? "+ " + line.content
              : line.type === "removed"
              ? "- " + line.content
              : "  " + line.content}
          </pre>
        ))}
      </div>
    </div>
  );
}
