import { Router } from "express";
import {
  aqiSearch,
  aqiTrack,
  untrackAqi,
  trackedAqi,
  isTracking,
} from "../controller/aqi.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// aqi/search?location=kathmandu
router.get("/search", aqiSearch);
// aqi/track?location=kathmandu
router.get("/track", authMiddleware, aqiTrack);
// aqi/untrack/6955asjfpoawe6awf5
router.delete("/untrack/:locationId", authMiddleware, untrackAqi);
// aqi/tracked -> list the records
router.get("/tracked", authMiddleware, trackedAqi);
// aqi/istracking?location=kathmandu
router.get("/istracking", authMiddleware, isTracking);

export default router;
