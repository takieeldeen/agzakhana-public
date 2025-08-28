import { Router } from "express";
import { getAllCategories } from "../controllers/categoryController";

const categoryRouter = Router();

categoryRouter.route("/").get(getAllCategories);

export default categoryRouter;
