import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

function validation(key) {
  const value = process.env[key];

  if (!value) {
    throw new Error("dotenv file is missing");
  }

  return value.trim();
}

export const config = Object.freeze({
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  MONGODB_URI: validation("MONGODB_URI"),
});
