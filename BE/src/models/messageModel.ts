import { Schema } from "mongoose";
import { MessageType } from "../types/messages";

const messageSchema = new Schema<MessageType>();
