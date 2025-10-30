import { Router } from "express";
import {
  activateRole,
  createRole,
  deactivateRole,
  getAllRoles,
  getRoleDetails,
} from "../controllers/roleController";

const roleRouter = Router();

roleRouter.route("/").get(getAllRoles).post(createRole);
roleRouter.route("/:roleId").get(getRoleDetails);

roleRouter.route("/:roleId/activate").post(activateRole);
roleRouter.route("/:roleId/deactivate").post(deactivateRole);

export default roleRouter;
