import { Router } from "express";
import {
  getAllDeals,
  getAllDealsCategory,
  getAllDealsManufacturer,
  getDealDetails,
} from "../controllers/dealsController";

const dealsRouter = Router();

dealsRouter.route("/").get(getAllDeals);

dealsRouter.route("/:dealId").get(getDealDetails);

dealsRouter.route("/filters/manufacturer").get(getAllDealsManufacturer);
dealsRouter.route("/filters/category").get(getAllDealsCategory);
export default dealsRouter;
