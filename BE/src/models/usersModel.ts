import mongoose, { Schema } from "mongoose";
import { UserType } from "../types/users";
import validator from "validator";
import { hash } from "bcrypt";

const userSchema = new Schema<UserType>({
  name: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
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
        message: "Password and Confirmation doesn't match",
        validator: function test(val) {
          const password = this.password ?? this.get("password");
          const provider = this.provider ?? this.get("provider") ?? "LOCAL";
          const identical = password === val;
          return provider === "LOCAL" ? identical : true;
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
    default: true,
  },
});
// Pre validations
// userSchema.pre("validate", function (next) {
//   console.log("test");
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
  if (!!this.password) this.password = await hash(this.password, 8);
  this.passwordConfirmation = "";
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
