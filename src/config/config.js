import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const validate = (key) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value.trim();
};

export const config = Object.freeze({
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  MONGODB_URI: validate("MONGODB_URI"),
  CORS_ORIGIN: validate("CORS_ORIGIN"),
  CLOUDINARY_CLOUD_NAME: validate("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_CLOUD_API_KEY: validate("CLOUDINARY_CLOUD_API_KEY"),
  CLOUDINARY_CLOUD_API_SECRET: validate("CLOUDINARY_CLOUD_API_SECRET"),
  ACCESS_TOKEN_SECRET_KEY: validate("ACCESS_TOKEN_SECRET_KEY"),
  ACCESS_TOKEN_EXPIRY_DAY: validate("ACCESS_TOKEN_EXPIRY_DAY"),
  REFRESH_TOKEN_SECRET_KEY: validate("REFRESH_TOKEN_SECRET_KEY"),
  REFRESH_TOKEN_EXPIRY_DAY: validate("REFRESH_TOKEN_EXPIRY_DAY"),
});
