import { Router } from "express";
import { getAllCities } from "../../controllers/cityController";
import { getAllNationalities } from "../../controllers/nationalitiesController";
import { getAllActiveRoles } from "../../controllers/dashboard/roleController";
import { getAllActiveUsers } from "../../controllers/dashboard/userController";
import { getAllActiveBranches } from "../../controllers/dashboard/branchesController";

const valueHelpRouter = Router();

valueHelpRouter.route("/city").get(getAllCities);
valueHelpRouter.route("/nationality").get(getAllNationalities);

// Branches
valueHelpRouter.route("/branches/active").get(getAllActiveBranches);

// Roles
valueHelpRouter.route("/roles/active").get(getAllActiveRoles);

// Users
valueHelpRouter.route("/users/active").get(getAllActiveUsers);

export default valueHelpRouter;
