import { Home, Search, PlusSquare, Video, User } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function BottomTab() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2 z-50">
      <NavLink to="/" className="text-gray-600 hover:text-black"><Home /></NavLink>
      <NavLink to="/search" className="text-gray-600 hover:text-black"><Search /></NavLink>
      <NavLink to="/create" className="text-gray-600 hover:text-black"><PlusSquare /></NavLink>
      <NavLink to="/shorts" className="text-gray-600 hover:text-black"><Video /></NavLink>
      <NavLink to="/profile" className="text-gray-600 hover:text-black"><User /></NavLink>
    </div>
  );
    }
