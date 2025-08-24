import mongoose from "mongoose";
import app from "./app";
import { config } from "dotenv";
config();

const CONNECTION_STRING = process.env.DB_STRING?.replace(
  "<<USERNAME>>",
  process?.env?.DB_USERNAME ?? ""
)?.replace("<<PASSWORD>>", process?.env?.DB_PASSWORD ?? "");

mongoose.connect(CONNECTION_STRING!).then(() => {
  console.log("connected to the database");
});

app.listen(8080, () => {
  console.log(`Listening on Port ${8080}`);
});
