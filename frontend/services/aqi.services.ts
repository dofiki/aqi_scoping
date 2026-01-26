import {
  isTrackingApi,
  searchApi,
  trackApi,
  trackedApi,
} from "@/lib/api/aqi.api";
import { AQISearchResult, TrackedUser } from "@/types/aqi";

export const searchService = async (
  location: string,
): Promise<AQISearchResult> => {
  const response = await searchApi(location);
  return response.result;
};

export const trackedService = async (): Promise<TrackedUser> => {
  const response = await trackedApi();
  return response.tracked;
};

export const trackService = async (location: string): Promise<string> => {
  const response = await trackApi(location);
  return response.message;
};

export const isTrackingService = async (location: string): Promise<boolean> => {
  const response = await isTrackingApi(location);
  return response.isTrackingStatus;
};
