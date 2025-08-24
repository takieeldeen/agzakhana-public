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
    required: [true, "Please enter the password"],
    select: false,
  },
  passwordConfirmation: {
    type: String,
    required: [true, "Please enter the password confirmation"],
    validate: {
      message: "Password and Confirmation doesn't match",
      validator: function test(val) {
        return this.password === val;
      },
    },
    select: false,
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
});

userSchema.pre("save", async function (next) {
  if (!!this.password) this.password = await hash(this.password, 8);
  this.passwordConfirmation = "";
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
