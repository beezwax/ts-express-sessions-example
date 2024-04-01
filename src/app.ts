import path from "path";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import createError, { type HttpError } from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

dotenv.config({
  path: path.join(
    __dirname,
    "..",
    process.env.NODE_ENV === undefined
      ? ".env.development"
      : `.env.${process.env.NODE_ENV}`,
  ),
});

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status ?? 500);
  res.render("error");
});

// initialize app
const initialize = (): void => {
  const port = process.env.PORT;

  app.listen(port, () => {
    console.log(`⚡️ [SERVER]: Express is running at http://localhost:${port}`);
  });
};

export { app, initialize };
