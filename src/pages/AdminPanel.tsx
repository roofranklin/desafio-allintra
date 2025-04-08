import { useNavigate } from "react-router-dom";
import { getAllEdits } from "../utils/storage";

function AdminPanel() {
  const edits = Object.values(getAllEdits());
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🛠️ Administração</h2>
      {edits.length === 0 ? (
        <p>Nenhum arquivo editado.</p>
      ) : (
        <ul className="space-y-2">
          {edits.map((edit) => (
            <li
              key={edit.filename}
              className="p-3 border rounded hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate(`/diff/${encodeURIComponent(edit.filename)}`)}
            >
              <div className="flex justify-between">
                <span>{edit.filename}</span>
                <span className="text-sm text-gray-500">
                  {new Date(edit.updatedAt).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminPanel;
