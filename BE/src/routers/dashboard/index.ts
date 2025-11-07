import { Router } from "express";
import permissionsRouter from "./permissionsRouter";
import roleRouter from "./roleRouter";
import valueHelpRouter from "./valueHelpRouter";
import userRouter from "./usersRouter";
import filesRouter from "./filesRouter";

const dashboardRouter = Router();
dashboardRouter.use("/permissions", permissionsRouter);
dashboardRouter.use("/roles", roleRouter);
dashboardRouter.use("/valueHelp", valueHelpRouter);
dashboardRouter.use("/users", userRouter);
dashboardRouter.use("/files", filesRouter);
export default dashboardRouter;
