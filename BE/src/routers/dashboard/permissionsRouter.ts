import { Router } from "express";
import { getAllPermissions } from "../../controllers/dashboard/permissionsController";

const permissionsRouter = Router();

permissionsRouter.route("/").get(getAllPermissions);

export default permissionsRouter;
