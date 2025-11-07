import mongoose, { Schema } from "mongoose";
import { DashboardUserType } from "../../types/users";
import { tr } from "../../utils/string";
import validator from "validator";
import { hash } from "bcrypt";
import { AppError, FormError } from "../../utils/errors";

const dashboardUserSchema = new Schema<DashboardUserType>(
  {
    imageUrl: {
      type: String,
    },
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
    password: {
      type: String,
      select: false,
      default: "",
      validate: {
        message: tr("VALIDATIONS.REQUIRED_FIELD", {
          placeholders: {
            field: "FIELDS.PASSWORD",
          },
        }),
        validator: function test(val) {
          const provider = this.provider ?? this.get("provider") ?? "LOCAL";
          const notEmpty = typeof val === "string" && val !== "";
          return provider === "LOCAL" ? notEmpty : true;
        },
      },
    },
    passwordConfirmation: {
      type: String,
      default: "",
      validate: [
        {
          message: tr("VALIDATIONS.REQUIRED_FIELD", {
            placeholders: {
              field: "FIELDS.PASSWORD_CONFIRMATION",
            },
          }),
          validator: function test(val) {
            const provider = this.provider ?? this.get("provider") ?? "LOCAL";
            const notEmpty = typeof val === "string" && val !== "";
            return provider === "LOCAL" ? notEmpty : true;
          },
        },
        {
          message: tr("VALIDATIONS.PASSWORD_CONFIRMATION"),
          validator: function test(val) {
            const password = this.password ?? this.get("password");
            const provider = this.provider ?? this.get("provider") ?? "LOCAL";
            const isIdentical = password === val;
            const shoudValidate = provider === "LOCAL" || (!!password && !!val);
            return shoudValidate ? isIdentical : true;
          },
        },
      ],
      select: false,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [
        true,
        tr("VALIDATIONS.REQUIRED_FIELD", {
          placeholders: {
            field: "FIELDS.email",
          },
        }),
      ],
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    gender: {
      type: String,
      required: [
        true,
        tr("VALIDATIONS.REQUIRED_FIELD", {
          placeholders: {
            field: "FIELDS.GENDER",
          },
        }),
      ],
      enum: ["MALE", "FEMALE"],
    },
    nationalId: {
      type: String,
      unique: true,
      required: [
        true,
        tr("VALIDATIONS.REQUIRED_FIELD", {
          placeholders: {
            field: "FIELDS.NATIONAL_ID",
          },
        }),
      ],
      validate: {
        validator: function (val: string) {
          const century = val[0];
          if (century !== "2" && century !== "3") return false;

          const year = parseInt(val.slice(1, 3), 10) || 0;
          const month = parseInt(val.slice(3, 5), 10) || 0;
          const day = parseInt(val.slice(5, 7), 10) || 0;
          // Validate month and day ranges
          if (month < 1 || month > 12) return false;
          if (day < 1 || day > 31) return false;
          if (year > new Date().getFullYear()) return false;
          return true;
        },
        message: tr("VALIDATIONS.INVALID_FORMAT", {
          placeholders: {
            field: "FIELDS.NATIONAL_ID",
          },
        }),
      },
    },
    birthDate: {
      type: Date,
      required: [
        true,
        tr("VALIDATIONS.REQUIRED_FIELD", {
          placeholders: {
            field: "FIELDS.BIRTH_DATE",
          },
        }),
      ],
      validate: {
        validator: function (val: Date | string) {
          const validationValue = typeof val === "string" ? new Date(val) : val;
          return validationValue < new Date();
        },
        message: tr("VALIDATIONS.INVALID_FORMAT", {
          placeholders: {
            field: "FIELDS.BIRTH_DATE",
          },
        }),
      },
    },
    joiningDate: {
      type: Date,
      required: [
        true,
        tr("VALIDATIONS.REQUIRED_FIELD", {
          placeholders: {
            field: "FIELDS.JOINING_DATE",
          },
        }),
      ],
    },
    nationality: {
      type: mongoose.Types.ObjectId,
      ref: "Nationality",
      required: [
        true,
        tr("VALIDATIONS.REQUIRED_FIELD", {
          placeholders: {
            field: "FIELDS.NATIONALITY",
          },
        }),
      ],
    },
    city: {
      type: mongoose.Types.ObjectId,
      ref: "City",
      required: [
        true,
        tr("VALIDATIONS.REQUIRED_FIELD", {
          placeholders: {
            field: "FIELDS.CITY",
          },
        }),
      ],
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
          return /^01[0-2,5]{1}[0-9]{8}$/.test(val);
        },
        message: tr("VALIDATIONS.INVALID_FORMAT", {
          placeholders: {
            field: "FIELDS.PHONE_NUMBER",
          },
        }),
      },
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
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
    files: [{ type: mongoose.Types.ObjectId, ref: "File" }],
    googleMapUrl: String,
    roles: [{ type: mongoose.Types.ObjectId, ref: "Role" }],
  },
  { timestamps: true }
);

dashboardUserSchema.pre("save", async function (next) {
  if (!!this.password && this.isModified("password"))
    this.password = await hash(this.password, 8);
  this.passwordConfirmation = "";
  next();
});

// dashboardUserSchema.post("save", function (error: any, doc: any, next: any) {
//   if (error.name === "MongoServerError" && error.code === 11000) {
//     const errorObject: any = {};
//     const errorKey = Object.keys(error.keyValue)[0]!;
//     errorObject[errorKey] = tr("VALIDATIONS.UNIQUE_FIELD", {
//       placeholders: {
//         field: `FIELDS.${errorKey}`,
//       },
//     })();
//     next(new FormError(400, "Validation Errors", errorObject));
//   } else {
//     next(error);
//   }
// });

const DashboardUser = mongoose.model<DashboardUserType>(
  "DasboardUser",
  dashboardUserSchema
);

export default DashboardUser;
