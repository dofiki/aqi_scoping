"use client";
import { useState } from "react";
import Searchbar from "@/components/searchbar";
import Aqiresult from "../components/aqiresult";
import Aqiinfo from "@/components/aqiinfo";
import Aqirecom from "@/components/aqirecom";

export default function Page() {
  const [query, setQuery] = useState("");

  return (
    <div className="text-primary w-full h-full flex flex-col items-center px-4 md:px-8">
      <Searchbar setQuery={setQuery} />

      <div className="flex flex-col md:flex-row justify-center items-start mt-10 gap-3 w-full max-w-7xl">
        <Aqiresult query={query} />

        <div className="flex flex-col w-full md:w-120 h-auto md:h-150 gap-3">
          <Aqiinfo />
          <Aqirecom />
        </div>
      </div>
    </div>
  );
}
