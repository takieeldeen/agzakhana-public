import mongoose from "mongoose";

import app from "./app.js";

// Server Initialization
const SERVER_PORT = process.env.PORT ?? "8080";
const DB_CONNECTION_STRING = process.env.DB_STRING?.replace(
  "<<USERNAME>>",
  process.env.DB_USERNAME ?? ""
).replace("<<PASSWORD>>", process.env.DB_PASSWORD ?? "");

// Database Connection Establishment
mongoose.connect(DB_CONNECTION_STRING ?? "").then(() => {
  console.log("Connected to the Database");
});

// Server Listening
app.listen(SERVER_PORT, () => {
  console.log(`Started Listening on port ${SERVER_PORT}`);
});
