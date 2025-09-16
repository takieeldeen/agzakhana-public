import { Router } from "express";
import { sendContacUsMessage } from "../controllers/messageController";

const messageRouter = Router();

messageRouter.post("/contact-us", sendContacUsMessage);

export default messageRouter;
