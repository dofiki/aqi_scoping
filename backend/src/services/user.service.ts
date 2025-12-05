import { User } from "../model/user.model";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.util";

export const signupService = async (
  username: string,
  email: string,
  password: string
) => {
  // checkign if user already exists or not
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("Invalid credentials");

  // hash password
  const saltRounds = 10; // default
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // create new user
  const newUser = await User.create({
    username,
    email,
    passwordHash: hashedPassword,
  });

  return {
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
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
