import { NextFunction, Request, Response } from "express";
import { UserType } from "../types/users";

export interface ProtectedRequest extends Request {
  user?: UserType;
}

type ControllerFn<T extends Request = Request> = (
  req: T,
  res: Response,
  next: NextFunction
) => Promise<void>;

export default function catchAsync<T extends Request = Request>(
  controllerFn: ControllerFn<T>
) {
  return async (req: T, res: Response, next: NextFunction) => {
    try {
      await controllerFn(req, res, next);
    } catch (err: any) {
      return next(err);
    }
  };
}
