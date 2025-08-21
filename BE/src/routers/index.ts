import { Router } from "express";

import productsRouter from "./productsRouter.js";

const mainRouter = Router();

mainRouter.use("/api/v1/products", productsRouter);

export default mainRouter;
