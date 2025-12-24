"use client";
import { useState } from "react";
import SearchBar from "@/app/(home)/component/SearchBar";
import AQIResult from "@/app/(home)/component/AQIResult";
import AQIInformation from "@/app/(home)/component/AQIInformation";
import AQIRecommendation from "@/app/(home)/component/AQIRecommendation";

export default function Page() {
  const [query, setQuery] = useState("");

  return (
    <div className="text-primary w-full h-full flex flex-col items-center px-4 md:px-8">
      <SearchBar setQuery={setQuery} />

      <div className="flex flex-col md:flex-row justify-center items-start mt-10 gap-3 w-full max-w-7xl">
        <AQIResult query={query} />

        <div className="flex flex-col w-full md:w-120 h-auto md:h-150 gap-3">
          <AQIInformation />
          <AQIRecommendation />
        </div>
      </div>
    </div>
  );
}
