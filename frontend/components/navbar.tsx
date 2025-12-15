"use client";
import { useState } from "react";
import Link from "next/link";
import { FaWind } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";

export function Navbar() {
  const [isOpen, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!isOpen);
  }

  return (
    <div
      className="flex justify-around items-center h-15 text-gray
    rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 
    border border-t-0 border-l-0 border-r-0"
    >
      <h4 className="text-xl text-white hover:text-hover">
        <Link href="/" className="flex items-center gap-1">
          <FaWind className="-rotate-180" />
          AQI Scoping
        </Link>
      </h4>

      {/* Desktop Navbar */}
      <ul className="hidden sm:flex gap-5 text-[1rem] items-center text-white">
        <li className="hover:text-hover">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:text-hover">
          <Link href="/tracks">Tracks</Link>
        </li>
        <li className="hover:text-hover">
          <Link href="/about">About</Link>
        </li>
        <li className="bg-hover text-black px-3 py-1 rounded-lg">
          <Link
            href="/login"
            className="group relative flex items-center gap-2 overflow-hidden h-6"
          >
            <FaRegUserCircle />

            <span className="relative overflow-hidden h-6">
              <span className="flex flex-col transition-transform duration-300 ease-in-out group-hover:-translate-y-6">
                {/* Visible text */}
                <span className="h-6 flex items-center">login</span>

                {/* Incoming text */}
                <span className="h-6 flex items-center">login</span>
              </span>
            </span>
          </Link>
        </li>
      </ul>

      {/* Mobile Navbar */}
      <div className="flex sm:hidden" onClick={() => handleOpen()}>
        <div className="relative flex sm:hidden" onClick={handleOpen}>
          {/* X */}
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
      absolute transition-all duration-300 ease-in-out
      ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-75"}
    `}
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>

          {/* Hamburger */}
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

      <div
        className={`absolute sm:hidden h-55 w-full bg-green-900
    transition-all delay-75 ease-in
    ${
      isOpen
        ? "opacity-100 top-15 pointer-events-auto"
        : "opacity-0 top-10 pointer-events-none"
    }
  `}
      >
        <ul>
          <li>
            <Link href="/" onClick={() => setOpen(!isOpen)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/dashboard" onClick={() => setOpen(!isOpen)}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={() => setOpen(!isOpen)}>
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
