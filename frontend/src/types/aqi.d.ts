// AQI Time
export interface AQITime {
  stime: string;
  vtime: number;
  tz: string;
}

// AQI Station
export interface AQIStation {
  name: string;
  geo: [number, number];
  url: string;
  country?: string | null;
}

// AQI Search Result
export interface AQISearchResult {
  uid: number;
  aqi: string;
  time: AQITime;
  station: AQIStation;
}

// AQI Search Response
export interface AQISearchResponse {
  message: string;
  result: AQISearchResult;
}

// AQI History Item (used in location's aqiHistory array)
export interface AQIHistoryItem {
  uid: number;
  aqi: string;
  stime: string;
  vtime: number;
  stationName: string;
  geo: [number, number];
  country: string;
}

// Alias for consistency with your Card component
export type AQIData = AQIHistoryItem;

// Tracked Location
export interface TrackedLocation {
  _id: string;
  name: string;
  aqiHistory: AQIHistoryItem[];
}

// Alias for consistency with your Card component
export type Location = TrackedLocation;

// Tracked User (for /aqi/tracked response)
export interface TrackedUser {
  _id: string;
  username: string;
  email: string;
  trackedLocation: TrackedLocation[]; // Populated locations
}

// Track Response (for /aqi/track response)
export interface TrackResponse {
  message: string;
  tracked: {
    _id: string;
    username: string;
    email: string;
    passwordHash: string;
    trackedLocation: string[]; // Just ObjectId strings, not populated
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

// Is Tracking Response
export interface IsTrackingResponse {
  message: string;
  isTrackingStatus: boolean;
}

// Untrack Response
export interface UntrackResponse {
  message: string;
  locationId: string;
}

// AQI Tracked Response
export interface AQITrackedResponse {
  message: string;
  tracked: TrackedUser;
}

// Card Props
export interface CardProps {
  index: number;
  locationName: string;
  latestAQI: AQIHistoryItem | null;
  aqiValue: number;
  aqiHistoryLength: number;
  location: TrackedLocation;
  setSelectedLocation: (location: TrackedLocation) => void;
  onUntrack?: (locationId: string) => void;
}
