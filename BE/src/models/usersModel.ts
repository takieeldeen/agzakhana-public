import mongoose, { Schema } from "mongoose";
import { UserType } from "../types/users";
import validator from "validator";
import { hash } from "bcrypt";
import { tr } from "../utils/string";

const userSchema = new Schema<UserType>({
  name: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, "Please enter a unique name"],
    required: [true, "please enter the email address"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    select: false,
    default: "",
    validate: {
      message: "Please enter the password",
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
        message: "Please enter password confirmation",
        validator: function test(val) {
          const provider = this.provider ?? this.get("provider") ?? "LOCAL";
          const notEmpty = typeof val === "string" && val !== "";
          return provider === "LOCAL" ? notEmpty : true;
        },
      },
      {
        message: tr("VALIDATIONS.PASSWORD_MISMATCH"),
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
  provider: {
    type: String,
    default: "LOCAL",
    enum: ["GOOGLE", "LOCAL"],
  },
  imageUrl: {
    type: String,
  },
  role: {
    type: String,
    default: "USER",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  phoneNumber: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  activationToken: {
    type: String,
    select: false,
  },
  address: String,
  birthDate: Date,
  gender: {
    type: String,
    enum: ["MALE", "FEMALE"],
  },
});
// Pre validations
// userSchema.pre("validate", function (next) {
//   const { provider, password, passwordConfirmation } = this;
//   if (provider === "LOCAL" && (typeof password !== "string" || password === ""))
//     this.invalidate("password", "please enter the password");
//   if (
//     provider === "LOCAL" &&
//     (typeof passwordConfirmation !== "string" || passwordConfirmation === "")
//   )
//     this.invalidate(
//       "passwordConfirmation",
//       "please enter the password confirmation"
//     );
//   if (provider === "LOCAL" && password !== passwordConfirmation)
//     this.invalidate(
//       "passwordConfirmation",
//       "please enter the password confirmation"
//     );
//   next();
// });

userSchema.pre("save", async function (next) {
  if (!!this.password && this.isModified("password"))
    this.password = await hash(this.password, 8);
  this.passwordConfirmation = "";
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
