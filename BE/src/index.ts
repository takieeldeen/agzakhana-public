import { config } from "dotenv";
config();
import mongoose from "mongoose";
import app from "./app";

const CONNECTION_STRING = process.env.DB_STRING?.replace(
  "<<USERNAME>>",
  process?.env?.DB_USERNAME ?? ""
)?.replace("<<PASSWORD>>", process?.env?.DB_PASSWORD ?? "");

mongoose
  .connect(CONNECTION_STRING!, {
    ssl: true,
    tlsAllowInvalidCertificates: process.env.NODE_ENV === "development",
  })
  .then(() => {
    console.log("✅ Connected to the database");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    // Avoid crashing the app — optionally retry or alert
  });
app.listen(process.env.port || 8080, () => {
  console.log(`Listening on Port ${process.env.port || 8080}`);
});
