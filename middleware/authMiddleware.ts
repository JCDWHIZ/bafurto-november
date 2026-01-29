import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import User from "../models/User";

export interface decoded {
  id: string;
  email: string;
}

export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization; // this gets authorization header e.g Authorization: "Bearer asjkdhashdajshdkajshdkahs"

    const token = authHeader?.split(" ")[1]; // this gets you a token e.g asjkdhashdajshdkajshdkahs

    if (!token) {
      return res.status(401).json({
        message: "Unaauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as decoded;

    const user = await User.findOne({
      _id: decoded.id,
    });

    if (!user) {
      return res.status(401).json({
        message: "User not found in token",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        error: "Token has expired",
      });
    }

    return res.status(500).json({
      error: "Internal server error during header validation",
    });
  }
};
