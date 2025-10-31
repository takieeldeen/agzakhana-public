import { Router } from "express";
import {
  activateRole,
  createRole,
  deactivateRole,
  editRole,
  getAllRoles,
  getRoleDetails,
} from "../controllers/roleController";

const roleRouter = Router();

roleRouter.route("/").get(getAllRoles).post(createRole);
roleRouter.route("/:roleId").get(getRoleDetails).patch(editRole);

roleRouter.route("/:roleId/activate").post(activateRole);
roleRouter.route("/:roleId/deactivate").post(deactivateRole);

export default roleRouter;
