import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

/**
 * Middleware for handling errors in the application
 * @param {any} err - The error object
 * @param {Request} req - The Express request object
 * @param {Response} res - The Express response object
 * @param {NextFunction} next - The Express next function
 * @returns {void} Sends a JSON response with error details
 *
 * @throws {ErrorHandler} Custom error with status code 400 for specific error cases
 */
export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT expired error
  if (err.name === "TokenExpiredError") {
    const message = `Json web token is expired, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
