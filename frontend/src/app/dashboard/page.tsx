"use client";

import { useState, useEffect } from "react";
import { ProtectedRoute } from "@/src/component/ProtectedRoute";
import { useAuth } from "@/src/hooks/useAuth";
import { trackedApi } from "@/src/lib/api/aqi.api";
import { TrackedUser, TrackedLocation } from "@/src/types/aqi";
import { FaMapMarkerAlt, FaExclamationCircle } from "react-icons/fa";
import { HistoryModal } from "./component/History";
import Card from "./component/Card";

const Page = () => {
  const { user } = useAuth();
  const [trackedData, setTrackedData] = useState<TrackedUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] =
    useState<TrackedLocation | null>(null);

  useEffect(() => {
    const loadTrackedLocations = async () => {
      try {
        setError(null);
        const data = await trackedApi();
        setTrackedData(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to load tracked locations";
        setError(errorMessage);
        console.error("Error loading tracked locations:", err);
      }
    };

    loadTrackedLocations();
  }, []);

  // Add handleUntrack function
  const handleUntrack = (locationId: string) => {
    // Remove the location from the state immediately (optimistic update)
    setTrackedData((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        trackedLocation: prev.trackedLocation.filter(
          (loc) => loc._id !== locationId,
        ),
      };
    });

    // Optional: Close the history modal if the untracked location is currently selected
    if (selectedLocation?._id === locationId) {
      setSelectedLocation(null);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-8xl px-4 mx-auto space-y-12">
        <div className="px-4 md:px-55 text-white md:pt-20 pt-5">
          <div className="h-10 w-full"></div>
          <div className="mb-8 pt-5">
            <h1 className="text-3xl font-bold mb-2">Tracks : AQI Dashboard</h1>
            <p className="text-gray-400 text-xl">
              Welcome, {user?.username || "User"}
            </p>
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

          {/* Desktop Header */}
          {trackedData?.trackedLocation?.length ? (
            <>
              <div
                className="hidden lg:grid grid-cols-12 gap-4 px-6 py-6 bg-gray-800 border-b
               border-gray-700 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1"
              >
                <div className="col-span-1">#</div>
                <div className="col-span-3">Location</div>
                <div className="col-span-1">AQI</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Last Updated</div>
                <div className="col-span-1">Records</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              {/* Mobile Header */}
              <div className="lg:hidden px-4 py-3 bg-gray-800 border-b border-gray-700 mb-1">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Tracked Locations ({trackedData.trackedLocation.length})
                </h3>
              </div>

              <div className="flex flex-col">
                {trackedData.trackedLocation.map((location, index) => {
                  return (
                    <Card
                      key={location._id}
                      index={index}
                      locationName={location.name}
                      latestAQI={
                        location.aqiHistory[location.aqiHistory.length - 1]
                      }
                      aqiValue={parseInt(
                        location.aqiHistory[location.aqiHistory.length - 1]
                          ?.aqi || "0",
                      )}
                      aqiHistoryLength={location.aqiHistory.length}
                      location={location}
                      setSelectedLocation={setSelectedLocation}
                      onUntrack={handleUntrack}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <div className="bg-gray-800 rounded-lg p-12 text-center">
              <FaMapMarkerAlt className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                No Tracked Locations
              </h3>
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
        <div className="h-10 w-full"></div>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
