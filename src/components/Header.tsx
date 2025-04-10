import { Link } from "react-router-dom";

interface HeaderProps {
  buttonText: string;
  buttonLink: string;
  srcLogo: string;
}

export default function Header({ buttonText, buttonLink, srcLogo }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#0F1625] text-white flex justify-between items-center px-6 shadow z-10">
      <div className="text-sm grid grid-cols-2">
        <img src={srcLogo} alt="Logo" className="h-6 mt-2 sm:h-10" />  <span className="ml-1 mt-2">docs</span>
      </div>
      <Link to={buttonLink} className="bg-[#E7454A] text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2 mt-2 rounded hover:bg-red-600 transition">
      {buttonText}
      </Link>
    </header>
  );
}
