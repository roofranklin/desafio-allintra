import { useState } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { EditableMarkdownViewer } from "../components/MarkdownViewer";

function Home() {
  const [currentFile, setCurrentFile] = useState("homepage.md");

  return (
    <div className="bg-[#172236] min-h-screen text-white">
      <Header />
      <div className="pt-16 flex">
        <Sidebar onSelect={setCurrentFile} />
        <main className="flex-1 p-6 overflow-auto">
          <EditableMarkdownViewer filename={currentFile} />
        </main>
      </div>
    </div>
  );
}

export default Home;
