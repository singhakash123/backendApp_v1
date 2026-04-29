import { db_connect } from "./db/index.js";
import { app } from "./app.js";
import { config } from "./config/config.js";

const port = config.PORT;

let server;

const startServer = async () => {
  try {
    await db_connect();

    server = app.listen(port, () => {
      console.log(`🚀 Server is listening on port: ${port}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

// 🔴 Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION 💥", err);
  process.exit(1);
});

// 🔴 Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION 💥", err);
  shutdown();
});

// 🟡 Graceful shutdown
const shutdown = () => {
  console.log("🛑 Shutting down server...");

  if (server) {
    server.close(() => {
      console.log("💤 Server closed");
      process.exit(0); // clean exit
    });
  } else {
    process.exit(1);
  }
};

// 🟡 System signals
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startServer();
