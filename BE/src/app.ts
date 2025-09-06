import express from "express";
import authRouter from "./routers/authRouter";
import errorController from "./controllers/errorController";
import middleware from "i18next-http-middleware";
import i18next from "i18next";
import cors from "cors";
import cookieParser from "cookie-parser";
import dataRouter from "./routers/dataRouter";
import productsRouter from "./routers/productRouter";
import morgan from "morgan";
import categoryRouter from "./routers/categoriesRouter";
import cartRouter from "./routers/cartRouter";
import dealsRouter from "./routers/dealsRouter";
import commentRouter from "./routers/commentRouter";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // your frontend origin
    credentials: true, // allow cookies/authorization headers
  })
);

i18next
  .use(middleware.LanguageDetector) // 👈 enable language detection
  //   .use(Backend) // optional, if loading translation files from disk
  .init({
    fallbackLng: "en",
    preload: ["en", "ar"],
    resources: {
      en: { translation: require("../translation/en.json") },
      ar: { translation: require("../translation/ar.json") },
    },
    detection: {
      // 👇 configure detection order
      order: ["header"], // detect from Accept-Language header
      caches: false, // don’t cache
    },
  });
app.use(middleware.handle(i18next));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/data", dataRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/deals", dealsRouter);

app.use(errorController);
export default app;
