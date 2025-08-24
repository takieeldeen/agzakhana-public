import { NextFunction, request, Request, Response } from "express";
import { UserType } from "../types/users";

export interface ProtectedRequest extends Request {
  user: UserType;
}

type ControllerFn = (
  req: Request | ProtectedRequest,
  res: Response,
  next: NextFunction
) => Promise<void>;

export default function catchAsync(controllerFn: ControllerFn) {
  return async (
    req: Request | ProtectedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await controllerFn(req, res, next);
    } catch (err: any) {
      return next(err);
    }
  };
}
