import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyAccessToken } from "../utils/jwt.util";

// adding id field to the Jwt payload
export interface TokenPayload extends JwtPayload {
  id: string;
}

// for ts
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // auth header in req body
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "missing token" });
    return;
  }

  // Bearer <your_unique_token>
  const token = authHeader.split(" ")[1];

  try {
    // returns decoded payload
    const decoded = verifyAccessToken(token) as TokenPayload;

    // Make sure it's an object and has the id
    if (typeof decoded === "string" || !("id" in decoded)) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = decoded;

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
