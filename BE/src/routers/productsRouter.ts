import { Router } from "express";
const productsRouter = Router();

productsRouter.route("/").get((req, res) => {
  res.status(200).json({
    message: "test",
    status: "succes",
  });
});

export default productsRouter;
