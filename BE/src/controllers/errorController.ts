import { NextFunction, Request, Response } from "express";
import {
  generateDevelopmentError,
  generateProductionError,
  handleCastErrors,
  handleValidationErrors,
} from "../utils/errors";

const errorController = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let finalError = Object.create(Object.getPrototypeOf(error));
  Object.assign(finalError, error);
  finalError.message = error.message;
  switch (error?.name) {
    case "ValidationError":
      finalError = handleValidationErrors(error);
      break;
    case "CastError":
      finalError = handleCastErrors(error);
      break;
  }
  if (process.env.NODE_ENV === "development")
    generateDevelopmentError(req, res, finalError);
  if (process.env.NODE_ENV === "production")
    generateProductionError(req, res, finalError);
  console.log(error);
  next();
};

export default errorController;
