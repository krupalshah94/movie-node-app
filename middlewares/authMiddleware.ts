/* eslint-disable */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

/**
 * Middleware to authenticate the user.
 * @param {AuthRequest} req - Request object to extract the token from the Authorization header.
 * @param {Response} res - Response object to send an error response if the token is invalid.
 * @param {NextFunction} next - Next middleware function to call if the token is valid.
 *
 * @description
 * This middleware checks if the token is present in the Authorization header and if it is valid.
 * If the token is valid, it attaches the decoded user info to the request.
 * If the token is invalid, it sends an unauthorized response.
 */
export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
