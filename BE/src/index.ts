import { config } from "dotenv";
config();
import mongoose from "mongoose";
import app from "./app";

const CONNECTION_STRING = process.env.DB_STRING?.replace(
  "<<USERNAME>>",
  process?.env?.DB_USERNAME ?? ""
)?.replace("<<PASSWORD>>", process?.env?.DB_PASSWORD ?? "");

mongoose.connect(CONNECTION_STRING!).then(() => {
  console.log("connected to the database");
});

app.listen(process.env.port || 8080, () => {
  console.log(`Listening on Port ${process.env.port || 8080}`);
});
