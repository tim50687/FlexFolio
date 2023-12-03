import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-blue-400">Flex</span>
            <span className="text-blue-700">Folio</span>
          </h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="text-slate-700 hover:underline">Home</li>
          </Link>
          <Link to="/sign-in">
            <li className="text-slate-700 hover:underline">Sign In</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
