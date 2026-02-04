import React, { useState } from "react";
import { FaClock, FaChartLine, FaTimesCircle, FaHistory } from "react-icons/fa";

import { CardProps } from "@/src/types/aqi";
import {
  getAQIColor,
  getAQIStatus,
  getAQITextColor,
} from "@/src/lib/utils/cardRelated";
import { untrackApi } from "@/src/lib/api/aqi.api";

const Card: React.FC<CardProps> = ({
  index,
  locationName,
  latestAQI,
  aqiValue,
  aqiHistoryLength,
  location,
  setSelectedLocation,
  onUntrack,
}) => {
  const [isUntracking, setIsUntracking] = useState(false);

  const handleUntrack = async () => {
    if (!location._id) {
      console.error("Location ID is missing");
      return;
    }

    try {
      setIsUntracking(true);
      await untrackApi(location._id);

      if (onUntrack) {
        onUntrack(location._id);
      }
    } catch (error) {
      console.error("Failed to untrack location:", error);
    } finally {
      setIsUntracking(false);
    }
  };

  return (
    <div className="w-full border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
      {latestAQI ? (
        <>
          {/* Desktop View */}
          <div className="hidden lg:grid grid-cols-12 items-center gap-4 px-6 py-4 text-sm">
            {/* Index */}
            <div className="col-span-1 text-gray-400 font-medium">
              #{index + 1}
            </div>

            {/* Location Name */}
            <div className="col-span-3 flex items-center gap-2 text-white font-medium">
              <span className="truncate">{locationName.toUpperCase()}</span>
            </div>

            {/* AQI Value */}
            <div className="col-span-1 flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${getAQIColor(aqiValue)}`}
              />
              <span
                className={`text-2xl font-bold ${getAQITextColor(aqiValue)}`}
              >
                {aqiValue}
              </span>
            </div>

            {/* Status */}
            <div className="col-span-2">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getAQITextColor(aqiValue)} bg-gray-700/50`}
              >
                {getAQIStatus(aqiValue)}
              </span>
            </div>

            {/* Last Updated */}
            <div className="col-span-2 flex items-center gap-2 text-gray-400 text-xs">
              <FaClock className="shrink-0" />
              <span className="truncate">
                {new Date(latestAQI.stime).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            {/* History Count */}
            <div className="col-span-1 flex items-center gap-1 text-gray-400 text-xs">
              <FaChartLine className="shrink-0" />
              <span>{aqiHistoryLength}</span>
            </div>

            {/* Actions */}
            <div className="col-span-2 flex items-center gap-3 justify-end">
              <button
                onClick={() => setSelectedLocation(location)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-800 hover:bg-blue-900 cursor-pointer text-white rounded-md transition-colors text-xs font-medium"
              >
                <FaHistory className="w-3 h-3" />
                <span>History</span>
              </button>
              <button
                onClick={handleUntrack}
                disabled={isUntracking}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#5C0A0A] hover:bg-[#7A0C0C] cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-md transition-colors text-xs font-medium"
              >
                <FaTimesCircle className="w-3 h-3" />
                <span>{isUntracking ? "Removing..." : "Untrack"}</span>
              </button>
            </div>
          </div>

          {/* Mobile & Tablet View */}
          <div className="lg:hidden px-4 py-4 space-y-3">
            {/* Header Row: Index, Location, AQI */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-gray-400 font-medium text-sm shrink-0">
                  #{index + 1}
                </span>
                <div className="flex items-center gap-2 text-white font-medium min-w-0 flex-1">
                  <span className="truncate">{locationName.toUpperCase()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-3">
                <div
                  className={`w-2 h-2 rounded-full ${getAQIColor(aqiValue)}`}
                />
                <span
                  className={`text-2xl font-bold ${getAQITextColor(aqiValue)}`}
                >
                  {aqiValue}
                </span>
              </div>
            </div>

            {/* Status & Info Row */}
            <div className="flex items-center justify-between gap-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getAQITextColor(aqiValue)} bg-gray-700/50`}
              >
                {getAQIStatus(aqiValue)}
              </span>

              <div className="flex items-center gap-4 text-gray-400 text-xs">
                <div className="flex items-center gap-1.5">
                  <FaClock className="shrink-0" />
                  <span>
                    {new Date(latestAQI.stime).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FaChartLine className="shrink-0" />
                  <span>{aqiHistoryLength}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setSelectedLocation(location)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-medium"
              >
                <FaHistory className="w-3.5 h-3.5" />
                <span>View History</span>
              </button>
              <button
                onClick={handleUntrack}
                disabled={isUntracking}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#5C0A0A] hover:bg-[#7A0C0C] disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-md transition-colors text-sm font-medium"
              >
                <FaTimesCircle className="w-3.5 h-3.5" />
                <span className="sm:inline hidden">
                  {isUntracking ? "Removing..." : "Untrack"}
                </span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="px-6 py-8 text-center">
          <p className="text-gray-500">No AQI data available</p>
        </div>
      )}
    </div>
  );
};

export default Card;
