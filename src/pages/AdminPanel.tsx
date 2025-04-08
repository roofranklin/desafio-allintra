import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

type EditedFile = {
  filename: string;
  updatedAt: string;
};

export default function AdminPanel() {
  const [editedFiles, setEditedFiles] = useState<EditedFile[]>([]);

  useEffect(() => {
    const getEditedFiles = async (): Promise<EditedFile[]> => {
      const files: EditedFile[] = [];
  
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key?.startsWith("md_")) continue;
  
        const filename = key.replace("md_", "");
        const localContent = localStorage.getItem(key);
  
        try {
          const res = await fetch(
            `https://bitbucket.org/allintra/teste-front-end/raw/main/docs/${filename}`
          );
  
          if (!res.ok) throw new Error("Erro ao buscar arquivo remoto");
  
          const remoteContent = await res.text();
  
          if (localContent && localContent !== remoteContent) {
            const metaRaw = localStorage.getItem(`meta_md_${filename}`);
            const meta = metaRaw ? JSON.parse(metaRaw) : null;
  
            files.push({
              filename,
              updatedAt: meta?.updatedAt || "Data desconhecida",
            });
          } else {
            // Se estiverem iguais, apaga os dados locais
            localStorage.removeItem(`md_${filename}`);
            localStorage.removeItem(`meta_md_${filename}`);
          }
        } catch (err) {
          console.warn(`Erro ao verificar ${filename}:`, err);
        }
      }
  
      return files.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    };
  
    const load = async () => {
      const edited = await getEditedFiles();
      setEditedFiles(edited);
    };
  
    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#0F1625] text-white p-8">
      <Header buttonText="Voltar para Homepage" buttonLink="/" srcLogo="./logo.png" />

      <h1 className="text-2xl font-bold mb-6">📁 Arquivos Editados Localmente</h1>

      {editedFiles.length === 0 ? (
        <p className="text-gray-400">Nenhum arquivo foi editado ainda.</p>
      ) : (
        <ul className="space-y-4">
          {editedFiles.map((file) => (
            <li
              key={file.filename}
              className="flex flex-col md:flex-row md:items-center justify-between bg-[#1B2739] p-4 rounded-xl shadow-sm"
            >
              <div className="flex-1">
                <p className="font-semibold">{file.filename}</p>
                <p className="text-sm text-gray-400">
                  Editado em:{" "}
                  {new Date(file.updatedAt).toLocaleString("pt-BR")}
                </p>
              </div>
              <Link
                to={`/admin/diff/${encodeURIComponent(file.filename)}`}
                className="mt-3 md:mt-0 inline-block px-4 py-2 bg-[#E7454A] text-white rounded-lg hover:bg-[#d13c3e] transition"
              >
                Ver Diferenças
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
