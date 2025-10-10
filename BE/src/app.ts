import express from "express";
import authRouter from "./routers/authRouter";
import errorController from "./controllers/errorController";
import middleware from "i18next-http-middleware";
import i18next from "i18next";
import Backend from "i18next-fs-backend"; // Missing backend for file loading

import cors from "cors";
import cookieParser from "cookie-parser";
import dataRouter from "./routers/dataRouter";
import productsRouter from "./routers/productRouter";
import morgan from "morgan";
import categoryRouter from "./routers/categoriesRouter";
import cartRouter from "./routers/cartRouter";
import dealsRouter from "./routers/dealsRouter";
import messageRouter from "./routers/messageRouter";
import { paymentRouter } from "./routers/paymentRouter";
import { stripeWebhookHandler } from "./controllers/paymentController";
import ordersRouter from "./routers/orderRouter";
import axios from "axios";

export let clientLocale = "ar";
const app = express();
app.use(morgan("dev"));
app.use(cookieParser());
app.use((req: any, res, next) => {
  const locale = req?.cookies?.NEXT_LOCALE;
  if (locale) {
    req.headers["Accept-Language"] = locale;
    if (locale === "ar") {
      req.headers["accept-language"] = "ar-EG,ar;q=0.9";
      clientLocale = "ar";
    } else {
      req.headers["accept-language"] = "en-US,en;q=0.9";
      clientLocale = "en";
    }
  }
  next();
});

i18next
  .use(Backend) // optional, if loading translation files from disk
  .use(middleware.LanguageDetector) // 👈 enable language detection
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
  })
  .then(() => console.log("initiated i18n"));

// This endpoints required raw body for signature checking
app.post(
  "/api/v1/payments/webhook/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhookHandler
);

app.use(express.json());

app.use(
  cors({
    origin: process?.env?.CLIENT_URL, // your frontend origin
    credentials: true, // allow cookies/authorization headers
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(middleware.handle(i18next));
app.get("/", async (req, res) => {
  const { data } = await axios.get("https://api.ipify.org?format=json");
  console.log("this is your ip");
  res.send(data);
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/data", dataRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/deals", dealsRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/orders", ordersRouter);

app.use("/*splat", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "No handler found for this endpoint",
  });
});

app.use(errorController);
export default app;
