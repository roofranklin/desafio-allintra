import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

import "../styles/MarkdownViewer.scss";

type Props = {
  filename: string;
};

export function EditableMarkdownViewer({ filename }: Props) {
  const [remoteContent, setRemoteContent] = useState("");
  const [localContent, setLocalContent] = useState("");
  const [isSynced, setIsSynced] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const storageKey = `md_${filename}`;

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

        const local = localStorage.getItem(storageKey);
        if (local) {
          setLocalContent(local);
          setIsSynced(local === text);
        } else {
          setLocalContent(text);
          setIsSynced(true);
        }
      } catch (err) {
        setError("⚠️ Página não encontrada ou arquivo inexistente.");
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [filename]);

  const handleSave = () => {
    localStorage.setItem(
      storageKey,
      localContent
    );
    localStorage.setItem(
      `meta_${storageKey}`,
      JSON.stringify({ updatedAt: new Date().toISOString() })
    );
    setIsSynced(localContent === remoteContent);
    alert("Alterações salvas! (somente local)");
  };
  

  return (
    <main className="p-0 sm:p-6 max-w-4xl mx-auto">
      {loading && <p className="text-gray-500">Carregando...</p>}

      {error && <div className="text-red-600 text-lg font-semibold">{error}</div>}

      {!loading && !error && (
        <>
          <div className="block sm:flex items-center justify-between mb-4">
            <span
              className={`p-2 rounded text-sm font-small sm:font-medium ${
                isSynced ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {isSynced
                ? "✅ Sincronizado com o repositório"
                : "⚠️ Modificado localmente"}
            </span>

            <button
              className="px-3 py-1 text-base bg-blue-500 text-white rounded hover:bg-blue-600 mt-4 sm:mt-0 ml-2 sm:ml-0"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              {isEditing ? "Visualizar" : "Editar"}
            </button>
          </div>

          {isEditing ? (
            <>
              <textarea
                className="w-full h-[70vh] p-4 border rounded font-mono text-sm"
                value={localContent}
                onChange={(e) => setLocalContent(e.target.value)}
              />
              <button
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={handleSave}
              >
                Salvar (somente local)
              </button>
            </>
          ) : (
            <div className="prose max-w-none markdown-container">
              <ReactMarkdown>{localContent}</ReactMarkdown>
            </div>
          )}
        </>
      )}
    </main>
  );
}