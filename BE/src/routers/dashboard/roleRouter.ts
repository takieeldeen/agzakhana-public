import { Router } from "express";
import {
  activateRole,
  createRole,
  deactivateRole,
  deleteRole,
  editRole,
  getAllRoles,
  getRoleDetails,
} from "../../controllers/dashboard/roleController";

const roleRouter = Router();

roleRouter.route("/").get(getAllRoles).post(createRole);
roleRouter
  .route("/:roleId")
  .get(getRoleDetails)
  .patch(editRole)
  .delete(deleteRole);

roleRouter.route("/:roleId/activate").post(activateRole);
roleRouter.route("/:roleId/deactivate").post(deactivateRole);

export default roleRouter;
