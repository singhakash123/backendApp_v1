import { db_connect } from "./db/index.js";
import { app } from "./app.js";
import { configDotenv } from "dotenv";
import { config } from "./config/config.js";

const port = config.PORT;

db_connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening at port number : ${port}`);
    });
  })
  .catch((error) => {
    console.error(`Dtabase connection failed : ${error.message}`);
    process.exit(1);
  });
