import mongoose from "mongoose";
import { config } from "../config/config.js";
import { db_name } from "../constant.js";

export const db_connect = async () => {
  try {
    const url = `${config.MONGODB_URI}/${db_name}`;

    const connectionInstance = await mongoose.connect(url, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(
      `Db connected :|| HOST : ${connectionInstance.connection.host}`
    );

    // connection events (important in production)

    mongoose.connection.on("error", (err) => {
      console.error(`mongodb connection error : ${err}`);
    });

    mongoose.connection.on("disconnect", () => {
      console.warn("mongodb disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log(`Mongodb reconnected`);
    });
  } catch (error) {
    console.log(`Dtabase connection failed : `, error.message);
    process.exit(1);
  }
};
