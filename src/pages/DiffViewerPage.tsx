import { useParams } from "react-router-dom";
import { getEdit } from "../utils/storage";
import { DiffViewer } from "../components/DiffViewer";

function DiffViewerPage() {
  const { filename } = useParams();
  const edit = filename ? getEdit(decodeURIComponent(filename)) : null;

  if (!edit) {
    return <p className="text-center text-red-500 mt-10">Arquivo não encontrado no localStorage.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Comparando: {edit.filename}</h2>
      <DiffViewer filename={edit.filename} localContent={edit.content} />
    </div>
  );
}

export default DiffViewerPage;