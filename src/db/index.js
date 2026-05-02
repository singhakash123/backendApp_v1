import mongoose from "mongoose";
import { config } from "../config/config.js";
import { db_name } from "../constant.js";

export const db_connect = async () => {
  try {
    const uri = `${config.MONGODB_URI}/${db_name}`;

    const connectionIntense = await mongoose.connect(uri);

    console.log(`DB Host : ${connectionIntense.connection.host}`);
  } catch (error) {
    console.error(`Database connection failed : ${error.message}`);
    process.exit(1);
  }
};
