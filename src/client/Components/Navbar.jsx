import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import nxtgen from "../assets/nxtgen.png";

// Navbar.jsx
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const waytologin = () => {
    navigate("/adminlogin");
  };
  const isHome = location.pathname === "/";
  const isAdmin =
    location.pathname === "/adminlogin" ||
    location.pathname === "/adminregister";
  const islogin =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className={`relative z-10`}>
      <div
        className={
          islogin
            ? "bg-transparent text-black"
            : isAdmin
            ? "bg-transparent text-black"
            : isHome
            ? ""
            : "bg-white text-grey"
        }
      >
        <div className="w-full">
          <div className="hidden md:flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-center  md:flex-row md:px-6 lg:px-8">
            <div className="flex flex-row items-center justify-center p-4">
              <a
                href="#"
                className="text-2xl font-semibold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline"
              >
                <img src={nxtgen} alt="NxtGen Logo" className="h-9 pt-2" />
              </a>
              <button
                className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-6 h-6"
                >
                  <path
                    className={!isOpen ? "block" : "hidden"}
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    className={isOpen ? "block" : "hidden"}
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <nav
              className={`flex-col flex-grow hidden pb-4 md:pb-0 md:flex md:justify-center md:flex-row ${
                isOpen ? "flex" : "hidden"
              }`}
            >
              <a
                className={`flex px-4 py-2 mt-2 text-lg font-medium rounded-lg ${
                  islogin
                    ? "text-black hover:text-brown"
                    : isAdmin
                    ? "text-black hover:text-rose-500"
                    : isHome
                    ? "text-black hover:text-rose-500"
                    : "text-black hover:text-rose-500"
                }`}
                href="/"
              >
                {" "}
                Home
              </a>
              <a
                className={`flex px-4 py-2 mt-2 text-lg font-medium rounded-lg ${
                  islogin
                    ? "text-black hover:text-brown"
                    : isAdmin
                    ? "text-black hover:text-rose-500"
                    : isHome
                    ? "text-black hover:text-rose-500"
                    : "text-black hover:text-rose-500"
                }`}
                href="/team"
              >
                Team
              </a>
              <a
                className={`flex px-4 py-2 mt-2 text-lg font-medium rounded-lg ${
                  islogin
                    ? "text-black hover:text-brown"
                    : isAdmin
                    ? "text-black hover:text-rose-500"
                    : isHome
                    ? "text-black hover:text-rose-500"
                    : "text-black hover:text-rose-500"
                }`}
                href="https://ramana2130.github.io/nxtgen/"
                target="blank"
              >
                Community
              </a>
              <a
                className={`flex px-4 py-2 mt-2 text-lg font-medium rounded-lg ${
                  islogin
                    ? "text-black hover:text-brown"
                    : isAdmin
                    ? "text-black hover:text-rose-500"
                    : isHome
                    ? "text-black hover:text-rose-500"
                    : "text-black hover:text-rose-500"
                }`}
                href="/about"
              >
                About
              </a>
            </nav>
            <button
              onClick={waytologin}
              className={`px-6 py-2 mt-2 text-md font-semibold rounded-xl ${
                islogin
                  ? "bg-grey text-white hover:text-black hover:bg-white"
                  : isAdmin
                  ? "bg-grey text-white hover:text-black hover:bg-white"
                  : isHome
                  ? "bg-grey text-white hover:text-white hover:bg-rose-500"
                  : "bg-grey text-white hover:text-white hover:bg-rose-500"
              }`}
            >
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Navbar;
