import { Location } from "../model/location.model";
import { IUser, User } from "../model/user.model";

const API_TOKEN = process.env.API_TOKEN;

export interface APIResultStructure {
  uid: number;
  aqi: string;
  time: {
    stime: string;
    vtime: number;
    tz: string;
  };
  station: {
    name: string;
    geo: number[];
    country: string | null | undefined;
    url: string;
  };
}

export const aqiSearchService = async (
  location: string
): Promise<APIResultStructure> => {
  // fetch
  const response = await fetch(
    `https://api.waqi.info/search/?token=${API_TOKEN}&keyword=${location}`
  );
  const result = await response.json();
  console.log(result);
  /* 
  result: 
    {
  "status": "ok",
  "data": [
    {
      "uid": 12345,
      "aqi": "99",
      "time": { "stime": "2025-12-05 14:43:00", "vtime": 1764925080, "tz": "+05:45" },
      "station": { "name": "Station Name", "geo": [27.7, 85.3], "country": "NP", "url": "..." }
    }
  ],
}
  */

  // first one selected out of all stations
  const data: APIResultStructure = result.data[0];

  return data;
};

export const aqiTrackService = async (
  userId: string,
  cityName: string,
  searchResult: APIResultStructure
): Promise<IUser> => {
  const aqiDataObj = {
    uid: searchResult.uid,
    aqi: searchResult.aqi,
    stime: searchResult.time.stime,
    vtime: searchResult.time.vtime,
    stationName: searchResult.station.name,
    geo: searchResult.station.geo as [number, number],
    country: searchResult.station.country || "Unknown",
  };

  console.log(aqiDataObj);

  // creating location if location doesnot exist already
  let location = await Location.findOne({ cityName });
  if (!location) {
    location = new Location({ name: cityName, aqiHistory: [] });
  }

  // push aqiDataObj to the location
  location.aqiHistory.push(aqiDataObj);
  await location.save();

  // attacking location with user
  const user = (await User.findById(userId)) as IUser;
  if (user && !user.trackedLocation.includes(location._id)) {
    user.trackedLocation.push(location._id);
    await user.save();
  }

  return user;
};

export const trackedAqiService = async (userId: string): Promise<IUser> => {
  // Populate tracked locations with full details including history
  const populatedUser = await User.findById(userId)
    .select("username email trackedLocation")
    .populate({
      path: "trackedLocation",
      select: "username aqiHistory.uid aqiHistory.stime aqiHistory.aqi",
    })
    .lean();

  return populatedUser as IUser;
};
