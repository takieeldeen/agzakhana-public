import { Router } from "express";
import { getAllPermissions } from "../controllers/permissionsController";

const permissionsRouter = Router();

permissionsRouter.route("/").get(getAllPermissions);

export default permissionsRouter;
