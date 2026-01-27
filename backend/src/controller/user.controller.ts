import { Request, Response } from "express";
import {
  loginSchema,
  otpSchema,
  signupSchema,
} from "../validations/auth.validation";
import {
  loginService,
  signupService,
  verifyemailService,
  refreshService,
  dashboardService,
} from "../services/user.service";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    // validating inputs
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        message: "invalid inupt",
        errors: parsed.error,
      });
      return;
    }

    const { username, email, password } = parsed.data;

    // calling signup service
    const user = await signupService(username, email, password);

    res.status(201).json({
      message: "Signup successful. Please verify your email.",
      userId: user.userId,
    });
  } catch (error: any) {
    console.log("signup error: ", error);
    res.status(400).json({ message: error.message });
  }
};

export const verifyemail = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const parsed = otpSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        message: "invalid input",
        errors: parsed.error,
      });
      return;
    }

    const { userId, otp } = parsed.data;

    const { user, accessToken, refreshToken } = await verifyemailService(
      userId,
      otp,
    );

    // send refresh token via cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // USER IS NOW LOGGED IN
    res.status(200).json({
      message: "Email verified successfully",
      accessToken,
      user: { 
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // validation
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        message: "invalid input",
        error: parsed.error,
      });
      return;
    }

    const { email, password } = parsed.data;

    // call service
    const { user, accessToken, refreshToken } = await loginService(
      email,
      password,
    );

    // sending refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // sending a responses with access token
    res.status(200).json({
      message: "logged in",
      accessToken,
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "logged out" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const dashboard = async (req: Request, res: Response): Promise<void> => {
  try {
    // req.user is set by auth middleware
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // fetch user from DB
    const user = await dashboardService(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: `Hello ${user.username}, welcome to dashboard`,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const refreshtoken = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // refresh token from cookie
    const token = req.cookies.refreshToken;

    if (!token) {
      res.status(401).json({ messgae: "No refresh token" });
      return;
    }

    // calling service
    const { newRefreshToken, newAccessToken } = await refreshService(token);

    // send refresh token through httpOnly cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};
