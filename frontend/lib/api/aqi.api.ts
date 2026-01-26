import { api } from "../axios/axios";
import {
  AQISearchResponse,
  AQITrackedResponse,
  TrackResponse,
  isTrackingResponse,
} from "@/types/aqi";

export const searchApi = async (
  location: string,
): Promise<AQISearchResponse> => {
  const response = await api.get<AQISearchResponse>("/aqi/search", {
    params: { location },
  });

  return response.data;
};

export const trackedApi = async (): Promise<AQITrackedResponse> => {
  const response = await api.get<AQITrackedResponse>("/aqi/tracked");
  return response.data;
};

export const trackApi = async (location: string): Promise<TrackResponse> => {
  const response = await api.get<TrackResponse>("/aqi/track", {
    params: { location },
  });
  return response.data;
};

export const isTrackingApi = async (
  location: string,
): Promise<isTrackingResponse> => {
  const response = await api.get<isTrackingResponse>("/aqi/istracking", {
    params: { location },
    withCredentials: true,
  });
  return response.data;
};
