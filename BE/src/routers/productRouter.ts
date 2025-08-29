import { Router } from "express";
import {
  getAllManufacturer,
  getAllProducts,
  getProductDetails,
} from "../controllers/productsController";

const productsRouter = Router();

productsRouter.route("/").get(getAllProducts);
productsRouter.route("/:productId").get(getProductDetails);

productsRouter.route("/filters/manufacturer").get(getAllManufacturer);
export default productsRouter;
