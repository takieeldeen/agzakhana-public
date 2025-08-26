import { Router } from "express";
import {
  prefillCategories,
  prefillProducts,
} from "../controllers/dataController";

const dataRouter = Router();

dataRouter.route("/products").post(prefillProducts);
dataRouter.route("/categories").post(prefillCategories);

export default dataRouter;
