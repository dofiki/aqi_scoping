import { searchApi, trackedApi } from "@/lib/api/aqi.api";
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
