"use client";
import { Dispatch, SetStateAction, KeyboardEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchbarProps {
  setQuery: Dispatch<SetStateAction<string>>;
}

const Searchbar = ({ setQuery }: SearchbarProps) => {
  const [input, setInput] = useState("");

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setQuery(input.trim());
    }
  }

  const handleSearch = () => {
    setQuery(input.trim());
  };

  return (
    <div className="flex gap-8">
      <div className="relative flex-1">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 z-10" />
        <input
          placeholder="Search your city..."
          className="w-full h-12 pl-12 pr-4  border border-gray-700/50 rounded-xl
          text-white placeholder-white/60 outline-none  bg-black/55 
          focus:border-hover focus:ring-0.5 focus:ring-hover
          transition-all duration-200"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <button
        className="px-6 h-12 bg-white 
        text-black font-medium rounded-xl
        flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
        onClick={handleSearch}
      >
        <FaSearch />
        <span className="hidden sm:inline">Search</span>
      </button>
    </div>
  );
};

export default Searchbar;
