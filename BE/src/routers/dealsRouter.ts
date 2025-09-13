import { Router } from "express";
import {
  getAllDeals,
  getAllDealsCategory,
  getAllDealsManufacturer,
  getDealDetails,
} from "../controllers/dealsController";
import commentRouter from "./commentRouter";

const dealsRouter = Router();

dealsRouter.route("/").get(getAllDeals);

dealsRouter.route("/:dealId").get(getDealDetails);
dealsRouter.use("/:dealId/reviews", commentRouter);

dealsRouter.route("/filters/manufacturer").get(getAllDealsManufacturer);
dealsRouter.route("/filters/category").get(getAllDealsCategory);
export default dealsRouter;
