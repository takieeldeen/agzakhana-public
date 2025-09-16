import { Router } from "express";
import {
  getAllManufacturer,
  getAllProducts,
  getPopularProducts,
  getProductDetails,
  getSimilarProducts,
} from "../controllers/productsController";
import commentRouter from "./commentRouter";

const productsRouter = Router();

productsRouter.get("/popular-products", getPopularProducts);

productsRouter.route("/").get(getAllProducts);
productsRouter.route("/:productId").get(getProductDetails);
productsRouter.use("/:productId/reviews", commentRouter);
productsRouter.use("/:productId/similar", getSimilarProducts);
productsRouter.route("/filters/manufacturer").get(getAllManufacturer);

export default productsRouter;
