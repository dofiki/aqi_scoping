"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import Gaugechart from "./ui/GaugeChart";
import map301To100 from "@/lib/utils/map301To100";
import { getAqiColor, getAqiMessage } from "@/lib/utils/aqiRelated";
import { FaInfoCircle } from "react-icons/fa";

export interface APIStructure {
  uid: number;
  aqi: string;
  time: {
    stime: string;
    vtime: number;
    tz: string;
  };
  station: {
    name: string;
    geo: number[];
    country: string | null | undefined;
    url: string;
  };
}

function Aqiresult({ query }: { query: string }) {
  const [data, setData] = useState<APIStructure | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gaugeValue, setGaugeValue] = useState<number>(0);

  // fetching data
  useEffect(() => {
    if (!query) return;

    async function fetchData() {
      setLoading(true);
      setData(null);
      setError(null);
      try {
        const url = `http://localhost:5000/aqi/search?location=${encodeURIComponent(
          query
        )}`;
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const result = response.data.result;
        setData(result);
        // for gauge chart
        const mappedValue = map301To100(Number(result.aqi));
        setGaugeValue(mappedValue);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            setError(`API ERROR: ${err.response.status}`);
          } else {
            setError("Network error");
          }
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query]);
  // store data, everytime data changes
  useEffect(() => {
    if (data) {
      localStorage.setItem("aqiData", JSON.stringify(data));
      localStorage.setItem("gaugeValue", JSON.stringify(gaugeValue));
    }
  }, [data, gaugeValue]);
  // loading data, everytime page reloads
  useEffect(() => {
    const savedData = localStorage.getItem("aqiData");
    const savedGaugeValue = localStorage.getItem("gaugeValue") as string;

    if (savedData) {
      setData(JSON.parse(savedData));
      setGaugeValue(JSON.parse(savedGaugeValue));
    }
  }, []);

  return (
    <div className="w-full md:w-120 h-150 bg-black rounded-lg border-gray border p-5">
      {loading && (
        <div className="flex items-center justify-center pt-15">
          <div className="h-16 w-16 border-10 border-gray-300 border-t-hover rounded-full animate-spin"></div>
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
                  style={{ backgroundColor: getAqiColor(Number(data.aqi)) }}
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
              <p className="mt-1 text-[1rem] text-gray-500 flex gap-2 justidy-center">
                <FaInfoCircle size={28} />
                {getAqiMessage(Number(data.aqi))}
              </p>
            </div>

            <div>
              <button
                className="mt-3 lg:mt-0 lg:ml-3 bg-white rounded-lg text-black pl-3 pr-3 pt-2 pb-2 flex items-center gap-2
              hover:bg-gray-300 cursor-pointer transition-colors delay-100 ease-in-out "
              >
                <IoMdAddCircle size={22} /> Track
              </button>
            </div>
          </div>

          <div className="flex justify-center"></div>
        </div>
      )}
      {!data && <p></p>}
    </div>
  );
}

export default Aqiresult;
