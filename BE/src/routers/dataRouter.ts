import { Router } from "express";
import {
  prefillCategories,
  prefillDeals,
  prefillProducts,
} from "../controllers/dataController";

const dataRouter = Router();

dataRouter.route("/products").post(prefillProducts);
dataRouter.route("/categories").post(prefillCategories);
dataRouter.route("/deals").post(prefillDeals);

export default dataRouter;
