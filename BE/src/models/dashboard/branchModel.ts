import mongoose, { Schema } from "mongoose";
import { tr } from "../../utils/string";
import { BranchType } from "../../types/branches";

const branchSchema = new Schema<BranchType>(
  {
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
            field: "FIELDS.NAME_AR",
          },
        }),
      ],
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: [
          true,
          tr("VALIDATIONS.REQUIRED_FIELD", {
            placeholders: {
              field: "FIELDS.LOCATION",
            },
          }),
        ], // make the type field required
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true, // make coordinates required
        validate: {
          validator: function (val) {
            return val.length === 2; // must contain [lng, lat]
          },
          message: tr("VALIDATIONS.REQUIRED_FIELD", {
            placeholders: {
              field: "FIELDS.LOCATION",
            },
          }),
        },
      },
    },
    address: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      displayName: {
        type: String,
        required: [
          true,
          tr("VALIDATIONS.REQUIRED_FIELD", {
            placeholders: {
              field: "FIELDS.ADDRESS",
            },
          }),
        ],
      },
    },
    phoneNumber: {
      type: String,
      required: [
        true,
        tr("VALIDATIONS.REQUIRED_FIELD", {
          placeholders: {
            field: "FIELDS.PHONE_NUMBER",
          },
        }),
      ],
      validate: {
        validator: function (val: string) {
          return (
            /^(010|011|012|015|016)\d{8}$/.test(val) || // Mobile
            /^0(2|3|4[0-10]|5[0-10]|6[0-10]|8[0-10]|9[0-10])\d{6,7}$/.test(val)
          ); // Landline
        },
        message: tr("VALIDATIONS.INVALID_FORMAT", {
          placeholders: {
            field: "FIELDS.PHONE_NUMBER",
          },
        }),
      },
    },
    manager: {
      type: mongoose.Types.ObjectId,
      ref: "DashboardUser",
      required: [
        true,
        tr("VALIDATIONS.REQUIRED_FIELD", {
          placeholders: {
            field: "FIELDS.BRANCH_MANAGER",
          },
        }),
      ],
    },
    startHour: {
      type: String,
      required: [
        true,
        tr("VALIDATIONS.REQUIRED_FIELD", {
          placeholders: {
            field: "FIELDS.START_HOUR",
          },
        }),
      ],
    },
    endHour: {
      type: String,
      required: [
        true,
        tr("VALIDATIONS.REQUIRED_FIELD", {
          placeholders: {
            field: "FIELDS.END_HOUR",
          },
        }),
      ],
    },
  },
  { timestamps: true }
);

const Branch = mongoose.model<BranchType>("Branch", branchSchema);
export default Branch;
