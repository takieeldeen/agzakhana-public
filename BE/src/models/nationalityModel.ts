import mongoose from "mongoose";
import { LocalizaedObject } from "../types/common";
import { tr } from "../utils/string";

const nationalitySchema = new mongoose.Schema<LocalizaedObject>({
  nameAr: {
    type: String,
    required: [
      true,
      tr("VALIDATIONS.REQUIRED_FIELD", {
        placeholders: {
          field: "FIELDS.NAME_AR",
        },
      }),
    ],
  },
  nameEn: {
    type: String,
    required: [
      true,
      tr("VALIDATIONS.REQUIRED_FIELD", {
        placeholders: {
          field: "FIELDS.NAME_EN",
        },
      }),
    ],
  },
});

const Nationality = mongoose.model<LocalizaedObject>(
  "Nationality",
  nationalitySchema
);

export default Nationality;
