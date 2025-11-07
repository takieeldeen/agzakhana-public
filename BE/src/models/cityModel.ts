import mongoose from "mongoose";
import { LocalizaedObject } from "../types/common";
import { tr } from "../utils/string";

const citySchema = new mongoose.Schema<LocalizaedObject>({
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

const City = mongoose.model<LocalizaedObject>("City", citySchema);

export default City;
