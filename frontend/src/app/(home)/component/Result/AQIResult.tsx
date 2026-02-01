"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

import Gaugechart from "../ui/GaugeChart";
import map301To100 from "@/src/lib/utils/map301To100";
import { getAqiColor, getAqiMessage } from "@/src/lib/utils/aqiRelated";
import { isTrackingApi, searchApi, trackApi } from "@/src/lib/api/aqi.api";
import { AQISearchResult } from "@/src/types/aqi";
import { useAuth } from "@/src/hooks/useAuth";
import AQIRecommendation from "../Recommendation/AQIRecommendation";

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
        const result = await searchApi(query);
        setData(result);

        const mappedValue = map301To100(Number(result.aqi));
        setGaugeValue(mappedValue);

        if (user) {
          const trackingStatus = await isTrackingApi(result.station.name);
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

  // Track handler
  const handleTrack = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!data || track) return;

    try {
      const result = await trackApi(data.station.name);
      if (result === "successfully tracked") {
        setTrack(true);
      }
    } catch (error) {
      console.error("Tracking failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center pt-15">
        <div className="h-16 w-16 border-10 border-gray-300 border-t-hover rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
        <p className="text-red-400 text-center">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-100">
      <div
        className="flex-1 
       rounded-xl border border-gray-700/50 p-6 backdrop-blur-sm "
      >
        <div className="flex flex-col ">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-1">
                {data.station.name}
              </h3>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MdDateRange size={18} />
                <span>{data.time.stime}</span>
              </div>
            </div>

            <button
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all
                ${
                  track
                    ? "bg-emerald-600 text-white cursor-not-allowed"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              onClick={handleTrack}
              disabled={track}
            >
              <IoMdAddCircle size={20} />
              <span className="font-medium">{track ? "Tracked" : "Track"}</span>
            </button>
          </div>

          <div className="flex items-start gap-5  text-white">
            <div
              className="w-20 h-20 rounded-full flex justify-center items-center shadow-lg shrink-0"
              style={{
                backgroundColor: getAqiColor(Number(data.aqi)),
              }}
            >
              <span className="w-14 h-14 bg-gray-900 flex justify-center items-center rounded-full font-bold text-xl">
                {data.aqi}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <Gaugechart
                aqi={gaugeValue}
                aqiColor={getAqiColor(Number(data.aqi))}
              />
            </div>
          </div>

          <div className="mt-auto p-4 rounded-lg border border-gray-700/30">
            <div className="flex items-start gap-3">
              <FaInfoCircle size={22} className="text-gray-400 shrink-0 mt-1" />
              <p className="text-gray-300 text-sm leading-relaxed">
                {getAqiMessage(Number(data.aqi))}
              </p>
            </div>
          </div>
        </div>
      </div>
      <AQIRecommendation aqi={Number(data.aqi)} />
    </div>
  );
}

export default Aqiresult;
