import { Router } from "express";
import {
  getAllManufacturer,
  getAllProducts,
  getProductDetails,
} from "../controllers/productsController";
import commentRouter from "./commentRouter";

const productsRouter = Router();

productsRouter.route("/").get(getAllProducts);
productsRouter.route("/:productId").get(getProductDetails);
productsRouter.use("/:productId/comments", commentRouter);

productsRouter.route("/filters/manufacturer").get(getAllManufacturer);
export default productsRouter;
