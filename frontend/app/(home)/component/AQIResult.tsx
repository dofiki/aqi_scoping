"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";

import Gaugechart from "./ui/GaugeChart";
import map301To100 from "@/lib/utils/map301To100";
import { getAqiColor, getAqiMessage } from "@/lib/utils/aqiRelated";
import { searchService, trackService } from "@/services/aqi.services";
import { AQISearchResult } from "@/types/aqi";

function Aqiresult({ query }: { query: string }) {
  const [data, setData] = useState<AQISearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gaugeValue, setGaugeValue] = useState<number>(0);
  const [track, setTrack] = useState<boolean>(false);

  // Fetch AQI data and track status.
  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const result = await searchService(query);
        setData(result);

        const mappedValue = map301To100(Number(result.aqi));
        setGaugeValue(mappedValue);
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
  }, [query]);

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

  // handle track button
  const handleTrack = async () => {
    const trackStatus = await trackService(data?.station.name || " ");
    if (trackStatus === "successfully tracked") {
      setTrack(true);
    } else setTrack(false);
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
                className={`mt-3 lg:mt-0 lg:ml-3  rounded-lg 
               text-black px-3 py-2 flex items-center gap-2 hover:bg-gray-300 transition
               ${track ? "bg-green-800 text-white" : "bg-white text-black"}`}
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
