import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  filename: string;
};

export function MarkdownViewer({ filename }: Props) {
  const [markdown, setMarkdown] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSynced, setIsSynced] = useState(true);
  const [remoteContent, setRemoteContent] = useState("");


  useEffect(() => {
    if (!filename) return;

    const fetchMarkdown = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://bitbucket.org/allintra/teste-front-end/raw/main/docs/${filename}`
        );

        if (!res.ok) {
          throw new Error("Arquivo não encontrado");
        }

        const text = await res.text();
        setRemoteContent(text);
        setMarkdown(text);

        const local = localStorage.getItem(`md_${filename}`);
        if (local && local !== text) {
        setIsSynced(false);
        } else {
        setIsSynced(true);
        }
      } catch (err) {
        setError("⚠️ Página não encontrada ou arquivo inexistente.");
        setMarkdown("");
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [filename]);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      {loading && <p className="text-gray-500">Carregando...</p>}

      {error && (
        <div className="text-red-600 text-lg font-semibold">
          {error}
        </div>
      )}

      {!error && !loading && (
        <div className="prose max-w-none">
            {!loading && !error && (
            <div
                className={`mb-4 p-2 rounded text-sm font-medium ${
                isSynced ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}
            >
                {isSynced ? "✅ Documento sincronizado com o repositório" : "⚠️ Documento modificado localmente (não sincronizado)"}
            </div>
            )}
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      )}
    </main>
  );
}
