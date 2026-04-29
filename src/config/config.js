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
});
