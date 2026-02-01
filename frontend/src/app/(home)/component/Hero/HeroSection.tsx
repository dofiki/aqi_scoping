"use client";
import { Dispatch, SetStateAction } from "react";
import SearchBar from "../Search/SearchBar";
import AQIResult from "../Result/AQIResult";
import Silk from "@/src/component/Silk";

interface HeroSectionProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

const HeroSection = ({ query, setQuery }: HeroSectionProps) => {
  return (
    <section className="relative flex min-h-[95vh] items-center justify-center w-full px-4 py-4 md:py-8 pt-20 md:px-8">
      {/* background animation */}
      <div className="absolute inset-0 z-0">
        <Silk
          speed={5}
          scale={0.6}
          color="#242424"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-center">
          {/* hero text  */}
          <div className="space-y-8 flex-1 text-center lg:text-left">
            <div className="inline-block px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 backdrop-blur-sm">
              <span className="text-emerald-400 text-[12px] md:text-sm font-medium">
                Real-time Air Quality Monitoring
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-white">Breathe</span>{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-hover to-green-300">
                Aware
              </span>
              <span className="text-white">,</span>
              <br />
              <span className="text-white">Live</span>{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-hover to-green-300">
                Better
              </span>
            </h1>

            <p className="text-sm md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Monitor air quality in real-time, receive intelligent
              notifications, and make informed decisions about your health and
              daily activities.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-1 h-1 md:w-2 md:h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-[12px] md:text-sm">Live Updates</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-1 h-1 md:w-2 md:h-2 bg-teal-400 rounded-full animate-pulse" />
                <span className="text-[12px] md:text-sm">Email Alerts</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-1 h-1 md:w-2 md:h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-[12px] md:text-sm">
                  Historical Trends
                </span>
              </div>
            </div>
          </div>
          {/* hero search */}
          <div className="w-full lg:w-[500px] xl:w-[600px]">
            <div>
              <h3
                className={`
                    ${query ? "hidden" : "hidden md:flex"}
                    text-2xl font-semibold text-white mb-6 text-center lg:text-left
                  `}
              >
                Check Your Air Quality
              </h3>

              <SearchBar setQuery={setQuery} />

              {query && (
                <div className="mt-8">
                  <AQIResult query={query} />
                </div>
              )}

              {!query && (
                <div className="mt-8 p-6 rounded-lg border border-gray-700/30 bg-black/55">
                  <p className="text-white/60  text-center text-sm">
                    Enter your city name to see real-time air quality data
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
