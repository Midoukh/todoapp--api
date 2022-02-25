const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATA_BASE

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to DB");
  });

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`app runnig on port ${process.env.PORT || 5000}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED");
  server.close(() => {
    console.log("Process terminated");
  });
})