import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../model/user.model";
import { loginSchema, signupSchema } from "../validations/auth.validation";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.util";

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

    // checkign if user already exists or not
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "user already exists" });
      return;
    }

    // hash password
    const saltRounds = 10; // default
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create new user
    const newUser = await User.create({
      username,
      email,
      passwordHash: hashedPassword,
    });

    // success response
    res.status(201).json({
      message: "Signup Sucessful",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("signup error");
    res.status(500).json({ message: "Internal server error" });
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

    // checking if user exists or not
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "user does not exist" });
      return;
    }

    // using instance method
    const validated = await user.validatePassword(password); // validatePassword is async
    if (!validated) {
      res.status(401).json({ message: "not authorized" });
      return;
    }

    // generate tokens:
    // mongoose _id is an ObjectId, converting to string
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

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
    const user = await User.findById(userId).select("username email");

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

export const refreshtoken = async (req: Request, res: Response): Promise<void> => {
  try {
    // refresh token from cookie
    const token = req.cookies.refreshToken;

    if (!token) {
      res.status(401).json({ messgae: "No refresh token" });
      return;
    }

    // checks the signature and returns decoded payload
    const decoded = verifyRefreshToken(token) as any;

    const newAccessToken = generateAccessToken(decoded.id);
    const newRefreshToken = generateRefreshToken(decoded.id);

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