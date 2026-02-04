import { Request, Response } from "express";
import {
  aqiSearchService,
  aqiTrackService,
  aqiUntrackService,
  trackedAqiService,
  isTrackingService,
} from "../services/aqi.service";

export const isTracking = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const locationName = req.query.location as string;
    const userId = req.user?.id; // from auth middleware

    const isTrackingStatus = await isTrackingService(userId, locationName);

    res.status(200).json({
      message: "isTrackingStatus successfully received",
      isTrackingStatus,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const aqiSearch = async (req: Request, res: Response): Promise<void> => {
  try {
    // aqi/search?location=kathmandu
    const location = req.query.location as string;
    console.log(location);
    // calling fetch service
    const result = await aqiSearchService(location);
    // return result
    res.status(200).json({ message: "fetched successully", result });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const aqiTrack = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id as string;
    // aqi/track?location=kathmandu
    const location = req.query.location as string;
    // calling fetch service
    const searchResult = await aqiSearchService(location);
    // calling track service
    console.log(searchResult);
    const tracked = await aqiTrackService(userId, location, searchResult);

    res.status(200).json({ message: "successfully tracked", tracked });
    // scheduled trackingService() > where to implement this?
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// aqi untrack. id is sent. search locaton with id if it exits then remove (do not delete) the record
// from the user aqi history....

export const untrackAqi = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id as string; // Get from auth middleware
    const { locationId } = req.params; // Get location ID from URL params

    if (!locationId) {
      res.status(400).json({ message: "Location ID is required" });
      return;
    }

    // Call untrack service
    const result = await aqiUntrackService(userId, locationId);

    if (!result) {
      res
        .status(404)
        .json({ message: "Location not found in tracked locations" });
      return;
    }

    res.status(200).json({
      message: "Successfully untracked location",
      locationId,
    });
  } catch (error) {
    console.error("Error untracking AQI:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const trackedAqi = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id as string;

    // calling tracked service -> locations
    const tracked = await trackedAqiService(userId);
    res.status(200).json({ message: "fetched successfully", tracked });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
