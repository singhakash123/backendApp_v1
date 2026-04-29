import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

function validation(key) {
  const value = process.env[key];

  if (!value || value.trim() === "") {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value.trim();
}

const port = Number(process.env.PORT);

export const config = Object.freeze({
  PORT: port && !isNaN(port) ? port : 3000,
  MONGODB_URI: validation("MONGODB_URI"),
  CORS_ORIGIN: validation("CORS_ORIGIN"),
  CLOUDINARY_CLOUD_NAME: validation("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY: validation("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: validation("CLOUDINARY_API_SECRET"),
  ACCESS_TOKEN_SECRET: validation("ACCESS_TOKEN_SECRET"),
  ACCESS_TOKEN_EXPIRY: validation("ACCESS_TOKEN_EXPIRY"),
  REFRESH_TOKEN_SECRET: validation("REFRESH_TOKEN_SECRET"),
  REFRESH_TOKEN_EXPIRY: validation("REFRESH_TOKEN_EXPIRY"),
});
