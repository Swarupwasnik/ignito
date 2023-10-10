import React from "react";
import UserLink from "./UserLink";
import { Link } from "react-router-dom";

import Nav from "./Nav";
export const Navbar = () => {
  return (
    <div className="flex justify-between items-center border-b border-gray-100 w-full px-44 py-2">
      <Link to="/">

      
      <div className="text-3xl font-extrabold text-cyan-900 dark-text-white font-Open_Sans hover:bg-fuchsia-600">
        <span className="text-blue bg-clip-text bg-gradient-to-t text-red-500  font-blue-600">
          Ignito
        </span>
        Posts
      </div>
      </Link>

      <div className="flex justify-center item-center mx-auto">
        <Nav></Nav>
      </div>
      <div>
        <UserLink></UserLink>
      </div>
    </div>
  );
};
