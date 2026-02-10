import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  let errorDetails = err;

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage =
      "Validation Error: You provided incorrect field type or missing fields";
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 404;
      errorMessage = "Record not found.";
    } else if (err.code === "P2002") {
      statusCode = 409;
      errorMessage = "Duplicate key error: This record already exists.";
    } else if (err.code === "P2003") {
      statusCode = 400;
      errorMessage = "Foreign key constraint failed: Related record not found.";
    }
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    statusCode = 500;
    errorMessage = "Database connection failed.";
  } else if (err instanceof Error) {
    statusCode = 400;
    errorMessage = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message: errorMessage,
    error: process.env.NODE_ENV === "development" ? errorDetails : undefined,
  });
}

export default errorHandler;
