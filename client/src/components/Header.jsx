import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  // get the current user from the redux store
  const { currentUser } = useSelector((state) => state.user);
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
          <Link to="/profile">
            {currentUser ? ( // if there is a user
              <img
                className="rounded-full h-7 w-7"
                src={currentUser.user_photo_url}
                alt="Profile"
              />
            ) : (
              <li className="text-slate-700 hover:underline">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
