"use client";
import { Dispatch, SetStateAction, KeyboardEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchbarProps {
  setQuery: Dispatch<SetStateAction<string>>;
}

const Searchbar = ({ setQuery }: SearchbarProps) => {
  // local state
  const [input, setInput] = useState("");

  // if enter is pressed we set the query
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setQuery(input.trim());
    }
  }

  return (
    <div className="flex justify-center w-full mt-10 z-1">
      <div className="relative w-full md:w-200 pl-2 pr-2 flex gap-2">
        <FaSearch className="absolute left-4 top-3 text-gray" />
        <input
          placeholder="Search your city..."
          className="bg-black border border-gray outline-none h-10 w-full pl-8 pr-4 rounded-lg
          transition-all duration-300 ease-in-out text-gray-500
          focus:ring-1 focus:ring-white 
          shadow-[0_0_10px_rgba(255,255,255,0.1)] focus:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className=" bg-gray-200 text-black pl-3 pr-3 rounded-lg
          hover:bg-gray-300 cursor-pointer transition-colors delay-100 ease-in-out
          flex  items-center gap-2"
          onClick={() => setQuery(input.trim())}
        >
          <FaSearch className="text-black" />
          <span className="hidden md:block"> Search</span>
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
