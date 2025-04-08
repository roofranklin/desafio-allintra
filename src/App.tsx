import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import DiffViewerPage from "./pages/DiffViewerPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/diff/:filename" element={<DiffViewerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
