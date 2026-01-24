"use client";

import React, { useState, useEffect } from "react";
import { ProtectedRoute } from "@/component/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { trackedService } from "@/services/aqi.services";
import { TrackedUser, TrackedLocation } from "@/types/aqi";
import { FaMapMarkerAlt, FaSyncAlt, FaExclamationCircle } from "react-icons/fa";
import { HistoryModal } from "./components/History";
import Card from "./components/Card";

const Page = () => {
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [trackedData, setTrackedData] = useState<TrackedUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] =
    useState<TrackedLocation | null>(null);

  const loadTrackedLocations = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      }
      setError(null);
      const data = await trackedService();
      setTrackedData(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load tracked locations";
      setError(errorMessage);
      console.error("Error loading tracked locations:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadTrackedLocations();
  }, []);

  const handleRefresh = () => {
    loadTrackedLocations(true);
  };

  return (
    <ProtectedRoute>
      <div className="px-4 md:px-55 text-white pt-10 ">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tracks : AQI Dashboard</h1>
            <p className="text-gray-400 text-xl">
              Welcome, {user?.username || "User"}
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800 
              disabled:cursor-not-allowed px-4 py-2 rounded-lg font-medium transition-colors 
              flex items-center gap-2 cursor-pointer"
          >
            <FaSyncAlt
              className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span className="hidden md:flex">
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </span>
          </button>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6 flex items-start gap-3">
            <FaExclamationCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-red-400 font-medium">Error</p>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          </div>
        )}

        {trackedData?.trackedLocation?.length ? (
          <div className="flex flex-col md:flex-row gap-5 ">
            {trackedData.trackedLocation.map((location) => {
              const latestAQI =
                location.aqiHistory?.[location.aqiHistory.length - 1] ?? null;

              const aqiValue = latestAQI ? Number(latestAQI.aqi) : 0;

              return (
                <Card
                  key={location._id}
                  locationName={location.name || "Unknown Location"}
                  latestAQI={latestAQI}
                  aqiValue={aqiValue}
                  aqiHistoryLength={location.aqiHistory.length}
                  location={location}
                  setSelectedLocation={setSelectedLocation}
                />
              );
            })}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <FaMapMarkerAlt className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Tracked Locations</h3>
            <p className="text-gray-400">
              You haven&apos;t added any locations to track yet.
            </p>
          </div>
        )}

        {selectedLocation && (
          <HistoryModal
            location={selectedLocation}
            onClose={() => setSelectedLocation(null)}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Page;
