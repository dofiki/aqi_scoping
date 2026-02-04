import axios from "axios";
import { api } from "../axios/axios";
import {
  AQISearchResponse,
  AQISearchResult,
  AQITrackedResponse,
  TrackedUser,
  TrackResponse,
  IsTrackingResponse,
  UntrackResponse,
} from "@/src/types/aqi";

export const searchApi = async (location: string): Promise<AQISearchResult> => {
  const response = await api.get<AQISearchResponse>("/aqi/search", {
    params: { location },
  });

  return response.data.result;
};

export const trackedApi = async (): Promise<TrackedUser> => {
  const response = await api.get<AQITrackedResponse>("/aqi/tracked");
  return response.data.tracked;
};

export const trackApi = async (location: string): Promise<string> => {
  try {
    const cleanLocation = location.replace(/;/g, ",").trim();
    const response = await api.get<TrackResponse>("/aqi/track", {
      params: { location: cleanLocation },
    });
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Track API Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw new Error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to track location",
      );
    }
    throw error;
  }
};

export const isTrackingApi = async (location: string): Promise<boolean> => {
  const response = await api.get<IsTrackingResponse>("/aqi/istracking", {
    params: { location },
    withCredentials: true,
  });
  return response.data.isTrackingStatus;
};

export const untrackApi = async (locationId: string): Promise<string> => {
  try {
    const response = await api.delete<UntrackResponse>(
      `/aqi/untrack/${locationId}`,
    );
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Untrack API Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw new Error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to untrack location",
      );
    }
    throw error;
  }
};
