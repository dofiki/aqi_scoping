import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

// generate access token, jwt.sign()
export function generateAccessToken(userId: string) {
  return jwt.sign({ id: userId }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}
// generate refresh token, jwt.sign()
export function generateRefreshToken(userId: string) {
  return jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}
// verify access token, jwt.verify()
export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}
// verify refresh token, jwt.verify()
export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
}
