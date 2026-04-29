import express from "express";
import helmet from "helmet";
import cors from "cors";
import { config } from "./config/config.js";
import morgan from "morgan";
import { limit } from "./constant.js";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

const app = express();

// trust proxy (IMPORTANT for production)
app.set("trust proxy", 1);

// security : helmet
app.use(helmet());
// helmet is a security middleware for Express.js that helps protect your backend by setting important HTTP headers.

app.use(
  cors({
    origin: config.CORS_ORIGIN,
    credentials: true,
  })
);

// morgan :
app.use(morgan("dev"));

// body parsing :
app.use(
  express.json({
    limit,
  })
);

app.use(
  express.urlencoded({
    limit,
    extended: true,
  })
);

// for the static file :
app.use(express.static("public"));

// rate limit :
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});

app.use("/api", limiter);

app.use(cookieParser());

export { app };
