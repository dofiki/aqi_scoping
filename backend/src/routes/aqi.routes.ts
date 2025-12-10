import { Router } from "express";
import { aqiSearch, aqiTrack, trackedAqi } from "../controller/aqi.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// aqi/search?location=kathmandu
router.get("/search", aqiSearch);
// aqi/track?location=kathmandu
router.get("/track", authMiddleware, aqiTrack);
// aqi/tracked -> list the records
router.get("/tracked", authMiddleware, trackedAqi);

export default router;
