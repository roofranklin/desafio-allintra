import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#0F1625] text-white flex justify-between items-center px-6 shadow z-10">
      <div className="text-sm grid grid-cols-2">
        <img src="./logo.png" alt="Logo" className="h-10 mt-2" />  <span className="ml-1 mt-2">docs</span>
      </div>
      <Link to="/admin" className="bg-[#E7454A] text-white px-4 py-2 mt-2 rounded hover:bg-red-600 transition">
        Área Administrativa
      </Link>
    </header>
  );
}
