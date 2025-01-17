import path from "path";
import invariant from "tiny-invariant";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import createError, { type HttpError } from "http-errors";
import session from "express-session";
import logger from "morgan";
import dotenv from "dotenv";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import sessionsRouter from "./routes/sessions";

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
app.set("trust proxy", 1); // trust first proxy
invariant(
  process.env.APPLICATION_SALT,
  "Expected APPLICATION_SALT environment variable",
);
app.use(
  session({
    secret: process.env.APPLICATION_SALT,
    name: "sessionId",
  }),
);
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/sessions", sessionsRouter);

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
