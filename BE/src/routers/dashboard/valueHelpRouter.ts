import { Router } from "express";
import { getAllCities } from "../../controllers/cityController";
import { getAllNationalities } from "../../controllers/nationalitiesController";
import { getAllActiveBranches } from "../../controllers/branchController";
import { getAllActiveRoles } from "../../controllers/dashboard/roleController";

const valueHelpRouter = Router();

valueHelpRouter.route("/city").get(getAllCities);
valueHelpRouter.route("/nationality").get(getAllNationalities);

// Branches
valueHelpRouter.route("/branches/active").get(getAllActiveBranches);

// Roles
valueHelpRouter.route("/roles/active").get(getAllActiveRoles);

export default valueHelpRouter;
