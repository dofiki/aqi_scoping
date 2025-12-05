import { Router } from "express";
import { aqiSearch, aqiTrack, trackedAqi } from "../controller/aqi.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router()

// aqi/search?location=kathmandu
router.get("/search", aqiSearch);
// aqi/track?location=kathmandu
router.get("/track", authMiddleware, aqiTrack)
// aqi/tracked -> list the records
router.get("/tracked", authMiddleware, trackedAqi)

export default router;

// Service to automatically track AQI data for locations at specific times (morning, day, night).
// When a user starts tracking a location (e.g., Kathmandu), the initial AQI data is saved.
// A scheduled job then runs at designated times each day, fetching AQI data and appending it
// to the location's record in the database.
// Each location maintains a history organized by day, with multiple readings per day:
// [
//   [initial, morning, day, night],  // day 1
//   [...],                           // day 2
//   ...
// ]

