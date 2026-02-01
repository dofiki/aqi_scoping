import React from "react";
import { FaClock, FaChartLine } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import { CardProps } from "@/src/types/aqi";
import {
  getAQIColor,
  getAQIStatus,
  getAQITextColor,
} from "@/src/lib/utils/cardRelated";

const Card: React.FC<CardProps> = ({
  locationName,
  latestAQI,
  aqiValue,
  aqiHistoryLength,
  location,
  setSelectedLocation,
}) => {
  return (
    <div
      className="bg-black p-6 hover:border-gray-300 transition-all delay-75
       ease-in text-white w-full rounded-lg border-gray border"
    >
      <div className="flex items-center gap-2 mb-4">
        <FaLocationDot className="w-5 h-5 text-white" />
        <h3 className="text-xl font-semibold">{locationName.toUpperCase()}</h3>
      </div>

      {latestAQI ? (
        <>
          <div className="mb-4">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold">{aqiValue}</span>
              <span className="text-gray-400">AQI</span>
            </div>

            <div className={`font-medium ${getAQITextColor(aqiValue)}`}>
              {getAQIStatus(aqiValue)}
            </div>

            <div className={`h-2 mt-3 rounded-full ${getAQIColor(aqiValue)}`} />
          </div>

          <div className="bg-gray-900 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <FaClock className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-400">Last Updated</span>
            </div>
            <div className="text-sm">
              {new Date(latestAQI.stime).toLocaleString()}
            </div>
          </div>

          <button
            onClick={() => setSelectedLocation(location)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white 
            py-2 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaChartLine className="w-4 h-4" />
            View History ({aqiHistoryLength} readings)
          </button>
        </>
      ) : (
        <p className="text-center text-gray-500 py-6">No AQI data available</p>
      )}
    </div>
  );
};

export default Card;
