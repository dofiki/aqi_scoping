import { api } from "../axios/axios";
import {
  AQISearchResponse,
  AQISearchResult,
  AQITrackedResponse,
  TrackedUser,
  TrackResponse,
  isTrackingResponse,
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
  const response = await api.get<TrackResponse>("/aqi/track", {
    params: { location },
  });
  return response.data.message;
};

export const isTrackingApi = async (location: string): Promise<boolean> => {
  const response = await api.get<isTrackingResponse>("/aqi/istracking", {
    params: { location },
    withCredentials: true,
  });
  return response.data.isTrackingStatus;
};
