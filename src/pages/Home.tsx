import { useState } from "react";

import Sidebar from "../components/Sidebar";
import { EditableMarkdownViewer } from "../components/MarkdownViewer";

function App() {
  const [currentFile, setCurrentFile] = useState("homepage.md");

  return (
    <div className="flex h-screen">
      <Sidebar onSelect={setCurrentFile} />
      <main className="flex-1 p-4 overflow-y-auto">
        <EditableMarkdownViewer filename={currentFile} />
      </main>
    </div>
  );
}

export default App;
