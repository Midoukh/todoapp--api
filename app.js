const path = require("path");
const cors = require("cors");
const express = require("express");

const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");

const todosRouter = require("./routes/todos.route");
const AppError = require("./utils/AppError");
// const globalErrorHandler = require("./controllers/errorControllers");

const app = express();
// app.use((req, res, next) => {
//   res.set({
//     "Content-Security-Policy": `default-src 'self' http: https:;block-all-mixed-content;font-src 'self' https: data:;frame-ancestors *;img-src *;object-src 'none';script-src * 'unsafe-inline' 'unsafe-eval';script-src-elem https: http: ;script-src-attr * 'unsafe-inline';style-src * 'unsafe-inline';worker-src * blob:`,
//   });
//   return next();
// });

//cors
app.use(cors());
//middlewares

app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(express.json());

//data sanitization against NoSql query injection
app.use(mongoSanitize());

//data sanitization against xss
app.use(xss());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Routes MIDDLEWARE
app.use("/api/todos", todosRouter);

//unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// app.use(globalErrorHandler);

module.exports = app;
