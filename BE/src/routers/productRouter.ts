import { Router } from "express";
import {
  getAllManufacturer,
  getAllProducts,
} from "../controllers/productsController";

const productsRouter = Router();

productsRouter.route("/").get(getAllProducts);
productsRouter.route("/filters/manufacturer").get(getAllManufacturer);
export default productsRouter;
