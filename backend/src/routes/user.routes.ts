import Router from "express";
import {
  login,
  signup,
  verifyemail,
  logout,
  dashboard,
  refreshtoken,
} from "../controller/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", signup);
router.post("/verify-email", verifyemail);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.get("/dashboard", authMiddleware, dashboard);
router.post("/refresh-token", refreshtoken);

export default router;
