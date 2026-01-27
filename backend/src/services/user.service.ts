import { User } from "../model/user.model";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.util";
import { generateOtp } from "../utils/otp.util";
import { sendOtpEmail } from "../utils/mail.util";

export const signupService = async (
  username: string,
  email: string,
  password: string,
) => {
  // Check if user already exists
  let user = await User.findOne({ email });

  if (user && user.isEmailVerified) {
    throw new Error("Email already registered");
  }

  // Hash password if new user
  if (!user) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user = await User.create({
      username,
      email,
      passwordHash: hashedPassword,
      isEmailVerified: false,
    });
  }

  // Generate OTP
  const otp = generateOtp();

  // Save OTP to user
  user.emailOtp = {
    code: otp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    attempts: 0,
  };

  await user.save();

  // Send OTP email
  await sendOtpEmail(user.email, otp);

  // Return userId for frontend OTP verification
  return {
    message: "OTP sent to email",
    userId: user._id.toString(),
    username: user.username,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
  };
};

export const verifyemailService = async (userId: string, otp: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if (!user.emailOtp) throw new Error("OTP not found");

  // OTP expired
  if (user.emailOtp.expiresAt < new Date()) {
    throw new Error("OTP expired");
  }

  // Too many attempts
  if (user.emailOtp.attempts >= 5) {
    throw new Error("Too many invalid attempts. Please signup again.");
  }

  // Wrong OTP
  if (String(user.emailOtp.code) !== String(otp)) {
    user.emailOtp.attempts += 1;
    await user.save();
    throw new Error("Invalid OTP");
  }

  // Correct OTP
  user.isEmailVerified = true;
  user.emailOtp = undefined;
  await user.save();

  // FOR AUTO LOGIN
  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const loginService = async (email: string, password: string) => {
  // checking if user exists or not
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials.");

  // using instance method
  const validated = await user.validatePassword(password);
  if (!validated) throw new Error("Incorrect password.");

  // generate tokens:
  // mongoose _id is an ObjectId, converting to string
  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const refreshService = async (token: string) => {
  // checks the signature and returns decoded payload
  const decoded = verifyRefreshToken(token) as any;

  const newAccessToken = generateAccessToken(decoded.id);
  const newRefreshToken = generateRefreshToken(decoded.id);

  return {
    newAccessToken,
    newRefreshToken,
  };
};

export const dashboardService = async (userId: string) => {
  const user = await User.findById(userId).select("username email");
  return user;
};
