import { Router } from "express";
import {
  prefillCategories,
  prefillDeals,
  prefillProducts,
  prefillReviews,
} from "../controllers/dataController";

const dataRouter = Router();

dataRouter.route("/products").post(prefillProducts);
dataRouter.route("/categories").post(prefillCategories);
dataRouter.route("/deals").post(prefillDeals);
dataRouter.route("/reviews").post(prefillReviews);

export default dataRouter;
