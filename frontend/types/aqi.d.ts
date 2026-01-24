export interface AQITime {
  stime: string;
  vtime: number;
  tz: string;
}

export interface AQIStation {
  name: string;
  geo: [number, number];
  url: string;
  country?: string | null;
}

export interface AQISearchResult {
  uid: number;
  aqi: string;
  time: AQITime;
  station: AQIStation;
}

export interface AQISearchResponse {
  message: string;
  result: AQISearchResult;
}

// AQI Tracked History

export interface AQIHistoryItem {
  uid: number;
  aqi: string;
  stime: string;
}

// Tracked Location

export interface TrackedLocation {
  _id: string;
  name: string;
  aqiHistory: AQIHistoryItem[];
}

// Tracked User (Expanded)

export interface TrackedUser {
  _id: string;
  username: string;
  email: string;
  trackedLocation: TrackedLocation[];
}

// /aqi/tracked Response

export interface AQITrackedResponse {
  message: string;
  tracked: TrackedUser;
}

export interface CardProps {
  locationName: string;
  latestAQI: AQIHistoryItem | null;
  aqiValue: number;
  aqiHistoryLength: number;
  location: TrackedLocation;
  setSelectedLocation: (location: TrackedLocation) => void;
}
