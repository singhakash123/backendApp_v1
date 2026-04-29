import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Minimum length should be 3"],
      maxlength: [50, "Maximum length should be 50"],
    },

    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      minlength: [4, "Username must be at least 4 characters"],
      maxlength: [20, "Maximum username should be 20 characters"],
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },

    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // 🔥 security
    },

    refreshToken: {
      type: String,
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "user", "author"],
      default: "user",
    },

    avatar: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// 🔐 Hash password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// 🔐 Compare password
userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 🔐 Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      role: this.role,
    },
    config.ACCESS_TOKEN_SECRET,
    {
      expiresIn: config.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// 🔐 Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    config.REFRESH_TOKEN_SECRET,
    {
      expiresIn: config.REFRESH_TOKEN_EXPIRY,
    }
  );
};
// userSchema.index({ email: 1 }, { unique: true });
// userSchema.index({ userName: 1 }, { unique: true });
userSchema.index({ fullName: "text", userName: "text" });

export const User = mongoose.model("User", userSchema);
