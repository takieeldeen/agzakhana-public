import { Router } from "express";
import {
  activateBranch,
  createBranch,
  deactivateBranch,
  deleteBranch,
  getAllBranches,
} from "../../controllers/dashboard/branchesController";

const branchRouter = Router();

branchRouter.route("/").post(createBranch).get(getAllBranches);
branchRouter.route("/:branchId").delete(deleteBranch);

branchRouter.route("/:branchId/activate").post(activateBranch);
branchRouter.route("/:branchId/deactivate").post(deactivateBranch);
export default branchRouter;
