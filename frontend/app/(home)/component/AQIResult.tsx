"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

import Gaugechart from "./ui/GaugeChart";
import map301To100 from "@/lib/utils/map301To100";
import { getAqiColor, getAqiMessage } from "@/lib/utils/aqiRelated";
import {
  isTrackingService,
  searchService,
  trackService,
} from "@/services/aqi.services";
import { AQISearchResult } from "@/types/aqi";
import { useAuth } from "@/hooks/useAuth";

function Aqiresult({ query }: { query: string }) {
  const { user } = useAuth();
  const router = useRouter();

  const [data, setData] = useState<AQISearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gaugeValue, setGaugeValue] = useState<number>(0);
  const [track, setTrack] = useState<boolean>(false);

  // Fetch AQI data + tracking status
  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        // 1. Fetch AQI
        const result = await searchService(query);
        setData(result);

        const mappedValue = map301To100(Number(result.aqi));
        setGaugeValue(mappedValue);

        // 2. Fetch tracking status (only if logged in)
        if (user) {
          const trackingStatus = await isTrackingService(result.station.name);
          setTrack(trackingStatus);
        } else {
          setTrack(false);
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response
              ? `API ERROR: ${err.response.status}`
              : "Network error",
          );
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, user]);

  // Persist data
  useEffect(() => {
    if (data) {
      localStorage.setItem("aqiData", JSON.stringify(data));
      localStorage.setItem("gaugeValue", JSON.stringify(gaugeValue));
    }
  }, [data, gaugeValue]);

  // Load persisted data
  useEffect(() => {
    const savedData = localStorage.getItem("aqiData");
    const savedGaugeValue = localStorage.getItem("gaugeValue");

    if (savedData && savedGaugeValue) {
      setData(JSON.parse(savedData));
      setGaugeValue(JSON.parse(savedGaugeValue));
    }
  }, []);

  // Track handler (redirect if not logged in)
  const handleTrack = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!data || track) return;

    try {
      const result = await trackService(data.station.name);

      if (result === "successfully tracked") {
        setTrack(true);
      }
    } catch (error) {
      console.error("Tracking failed:", error);
    }
  };

  return (
    <div className="w-full md:w-120 h-150 bg-black rounded-lg border-gray border p-5">
      {loading && (
        <div className="flex items-center justify-center pt-15">
          <div className="h-16 w-16 border-10 border-gray-300 border-t-hover rounded-full animate-spin" />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {data && (
        <div className="grid grid-rows-[repeat(2,1fr)] h-full">
          <div className="flex flex-col lg:flex-row justify-between p-2 lg:p-6">
            <div>
              <h6 className="text-2xl flex items-center gap-2">
                {data.station.name}
              </h6>

              <p className="text-white flex items-center gap-2 mt-1">
                <MdDateRange size={22} />
                {data.time.stime}
              </p>

              <div className="flex">
                <div
                  className="w-15 h-15 rounded-full text-xl flex justify-center items-center mt-5"
                  style={{
                    backgroundColor: getAqiColor(Number(data.aqi)),
                  }}
                >
                  <span className="w-10 h-10 bg-black flex justify-center items-center rounded-full">
                    {data.aqi}
                  </span>
                </div>

                <Gaugechart
                  aqi={gaugeValue}
                  aqiColor={getAqiColor(Number(data.aqi))}
                />
              </div>

              <p className="mt-1 text-[1rem] text-gray-500 flex gap-2">
                <FaInfoCircle size={28} />
                {getAqiMessage(Number(data.aqi))}
              </p>
            </div>

            <div>
              <button
                className={`mt-3 lg:mt-0 lg:ml-3 rounded-lg px-3 py-2 flex items-center gap-2 transition
                  ${
                    track
                      ? "bg-green-800 text-white cursor-not-allowed"
                      : "bg-white text-black hover:bg-gray-300"
                  } ${!user ? "opacity-70" : ""}`}
                onClick={handleTrack}
              >
                <IoMdAddCircle size={22} />
                {track ? "Tracked" : "Track"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Aqiresult;
