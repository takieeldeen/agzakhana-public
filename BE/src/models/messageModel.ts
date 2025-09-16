import mongoose, { Schema } from "mongoose";
import { MessageType } from "../types/messages";
import { tr } from "../utils/string";

const messageSchema = new Schema<MessageType>({
  firstName: {
    type: String,
    required: [
      true,
      tr("VALIDATIONS.REQUIRED_FIELD", {
        placeholders: {
          field: "FIELDS.FIRST_NAME",
        },
      }),
    ],
  },
  lastName: {
    type: String,
    required: [
      true,
      tr("VALIDATIONS.REQUIRED_FIELD", {
        placeholders: {
          field: "FIELDS.LAST_NAME",
        },
      }),
    ],
  },
  email: {
    type: String,
    required: [
      true,
      tr("VALIDATIONS.REQUIRED_FIELD", {
        placeholders: {
          field: "FIELDS.EMAIL",
        },
      }),
    ],
  },
  message: {
    type: String,
    required: [
      true,
      tr("VALIDATIONS.REQUIRED_FIELD", {
        placeholders: {
          field: "FIELDS.MESSAGE",
        },
      }),
    ],
  },
});

const Message = mongoose.model<MessageType>("Message", messageSchema);
export default Message;
