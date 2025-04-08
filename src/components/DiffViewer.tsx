import { useEffect, useState } from "react";
import ReactDiffViewer from "react-diff-viewer-continued";

type Props = {
  filename: string;
  localContent: string;
};

export function DiffViewer({ filename, localContent }: Props) {
  const [remote, setRemote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRemote = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://bitbucket.org/allintra/teste-front-end/raw/main/docs/${filename}`
        );

        if (!res.ok) {
          throw new Error("Erro ao buscar arquivo remoto");
        }

        const text = await res.text();
        setRemote(text);
      } catch (err) {
        setError("Erro ao carregar versão remota.");
      } finally {
        setLoading(false);
      }
    };

    fetchRemote();
  }, [filename]);

  if (loading) return <p>Carregando comparativo...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <ReactDiffViewer
      oldValue={remote}
      newValue={localContent}
      splitView={true}
      hideLineNumbers={false}
      showDiffOnly={false}
      leftTitle="Original (repositório)"
      rightTitle="Editado (local)"
    />
  );
}
