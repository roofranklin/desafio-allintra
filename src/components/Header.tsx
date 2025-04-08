import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#0F1625] text-white flex justify-between items-center px-6 shadow z-10">
      <div className="text-lg font-bold">📘 Minha Documentação</div>
      <Link
        to="/admin"
        className="bg-[#E7454A] text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Área Administrativa
      </Link>
    </header>
  );
}
