import express from "express";

import mainRouter from "./routers";

const app = express();
app.use("", mainRouter);

export default app;
