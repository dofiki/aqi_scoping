import { api } from "../axios/axios";
import { AQISearchResponse, AQITrackedResponse } from "@/types/aqi";

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
