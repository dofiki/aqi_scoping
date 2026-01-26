import { Router } from "express";
import {
  aqiSearch,
  aqiTrack,
  trackedAqi,
  isTracking,
} from "../controller/aqi.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// aqi/search?location=kathmandu
router.get("/search", aqiSearch);
// aqi/track?location=kathmandu
router.get("/track", authMiddleware, aqiTrack);
// aqi/tracked -> list the records
router.get("/tracked", authMiddleware, trackedAqi);
// aqi/istracking?location=kathmandu
router.get("/istracking", authMiddleware, isTracking);

export default router;
