import mongoose, { Schema, Types } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "full name is required"],
      lowercase: true,
      trim: true,
      minlength: [5, "full name should be minimum 5 character"],
      maxlength: [12, "full name maximum length is 12character"],
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [5, "username should not less than 5"],
      maxlength: [10, "username should not exceed more then 10 character"],
    },
    refreshToken: {
      type: String,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    orderHistory: [
      {
        type: Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// hash the password before the save  :
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// compare the password :
userSchema.methods.isPasswordCorrect = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

// generate access and refreshToken :
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
    },
    config.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: config.ACCESS_TOKEN_EXPIRY_DAY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    config.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: config.REFRESH_TOKEN_EXPIRY_DAY,
    }
  );
};
export const User = mongoose.model("User", userSchema);
