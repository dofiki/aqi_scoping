"use client";
import { useState } from "react";
import Link from "next/link";
import { FaWind } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { useAuth } from "@/src/hooks/useAuth";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!isOpen);
  }

  function handleLogout() {
    logout();
    setOpen(false);
  }

  return (
    <>
      <div
        className=" fixed w-full left-1/2 -translate-x-1/2 lg:mt-5 md:w-250 h-[60px] border border-gray-700/50
                    flex justify-around items-center bg-black/55 md:rounded-xl backdrop-blur-xl z-100
                    text-gray-300"
      >
        <h4 className="text-xl text-white hover:text-hover">
          <Link href="/" className="flex items-center gap-1">
            <FaWind className="-rotate-180" />
            AQI Scoping
          </Link>
        </h4>

        <ul className="hidden sm:flex gap-5 text-[1rem] items-center text-white">
          <li className="hover:text-hover">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-hover">
            <Link href="/dashboard">Tracks</Link>
          </li>
          <li className="hover:text-hover">
            <Link href="/about">About</Link>
          </li>
          {isAuthenticated ? (
            <li className="bg-red-800 text-white px-3 py-1 rounded-lg cursor-pointer">
              <button
                onClick={handleLogout}
                className="group relative flex items-center gap-2 overflow-hidden h-6 cursor-pointer"
              >
                <FaRegUserCircle />

                <span className="relative overflow-hidden h-6">
                  <span
                    className="flex flex-col transition-transform duration-300 
              ease-in-out group-hover:-translate-y-6"
                  >
                    <span className="h-6 flex items-center">logout</span>

                    <span className="h-6 flex items-center">logout</span>
                  </span>
                </span>
              </button>
            </li>
          ) : (
            <li className="bg-hover text-black px-3 py-1 rounded-lg">
              <Link
                href="/login"
                className="group relative flex items-center gap-2 overflow-hidden h-6"
              >
                <FaRegUserCircle />

                <span className="relative overflow-hidden h-6">
                  <span
                    className="flex flex-col transition-transform duration-300 
              ease-in-out group-hover:-translate-y-6"
                  >
                    <span className="h-6 flex items-center">login</span>

                    <span className="h-6 flex items-center">login</span>
                  </span>
                </span>
              </Link>
            </li>
          )}
        </ul>

        <div
          className="flex sm:hidden text-white hover:text-hover"
          onClick={() => handleOpen()}
        >
          <div className="relative flex sm:hidden" onClick={handleOpen}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill=""
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`
      absolute transition-all duration-300 ease-in-out
      ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-75"}
    `}
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`
      transition-all duration-300 ease-in-out
      ${isOpen ? "opacity-0 scale-75" : "opacity-100 scale-100"}
    `}
            >
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </div>
        </div>
      </div>
      <div
        className={`fixed sm:hidden h-55 w-full bg-black/60 backdrop-blur-2xl z-50
          transition-all delay-75 ease-in text-white flex justify-center 
          items-center text-xl
    ${
      isOpen
        ? "opacity-100 top-15 pointer-events-auto"
        : "opacity-0 top-10 pointer-events-none"
    }
  `}
      >
        <ul className="w-full text-center">
          <li>
            <Link
              href="/"
              onClick={() => setOpen(!isOpen)}
              className=" hover:text-hover"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              onClick={() => setOpen(!isOpen)}
              className=" hover:text-hover"
            >
              Tracks
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={() => setOpen(!isOpen)}
              className=" hover:text-hover"
            >
              About
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <button onClick={handleLogout} className=" hover:text-hover">
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                href="/login"
                onClick={() => setOpen(!isOpen)}
                className=" hover:text-hover"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
