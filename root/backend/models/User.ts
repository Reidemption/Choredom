import mongoose from "mongoose";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { model, Schema, Model, Document } from "mongoose";

//declare point type
export interface IPoint extends Document {
  type: string;
  coordinates: string;
}
//generate point schema
const Point: Schema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});
//declare user type
export interface IUser extends Document {
  getResetPasswordToken(): string;
  getSignedToken(): string;
  resetPasswordToken: string | undefined;
  resetPasswordExpire: string | undefined;
  matchPassword(password: string): boolean | PromiseLike<boolean>;
  username: string;
  password: string;
  email: string;
  profile: {
    firstName: String;
    lastName: String;
    avatar: String;
    bio: String;
    phone: String;
    gender: String;
    address: {
      street1: String;
      street2: String;
      city: String;
      state: String;
      country: String;
      zip: String;
      location: {
        type: IPoint;
        required: false;
      };
    };
    active: true;
  };
}
// define user schema
const UserSchema: Schema = new Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Can't be blank"],
    index: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [8, "Please use minimum of 8 characters"],
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "Can't be blank"],
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please use a valid address"],
    unique: true,
    index: true,
  },
  profile: {
    firstName: String,
    lastName: String,
    avatar: String,
    bio: String,
    phone: String,
    gender: String,
    address: {
      street1: String,
      street2: String,
      city: String,
      state: String,
      country: String,
      zip: String,
      location: {
        type: Point,
        required: false,
      },
    },
    required: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: String,

  active: { type: Boolean, default: true },
});

UserSchema.pre<IUser>("save", async function (next: any) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bycrypt.genSalt(10);
  this.password = bycrypt.hashSync(this.password, 10);
  next();
});

UserSchema.methods.matchPassword = async function (password: string) {
  return await bycrypt.compare(password, this.password);
};
UserSchema.methods.getSignedToken = function (password: string) {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  return resetToken;
};

export const User: Model<IUser> = model("User", UserSchema);
