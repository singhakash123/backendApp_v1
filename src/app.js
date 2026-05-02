import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import { config } from "./config/config.js";
import { limit } from "./constant.js";

const app = express();

// 🔥 Security
app.use(helmet());

// 🔥 CORS
app.use(
  cors({
    origin: config.CORS_ORIGIN || "*",
    credentials: true,
  })
);

// 🔥 Logging
app.use(morgan("dev"));

// 🔥 Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
app.use("/api", limiter);

// 🔥 Body parsing
app.use(express.json({ limit }));
app.use(express.urlencoded({ extended: true, limit }));

// 🔥 Static
app.use(express.static("public"));

// 🔥 Cookies
app.use(cookieParser());

// 🔥 Routes
// import userRoutes from "./routes/user.routes.js";
// app.use("/api/v1/users", userRoutes);

export { app };
