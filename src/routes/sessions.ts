import express from "express";
import users, { type User } from "@/repositories/users";

const router = express.Router();

interface SignInFormParams {
  username: string;
  password: string;
}

declare module "express-session" {
  export interface SessionData {
    user: User;
  }
}

router.post("/", function (req, res, next) {
  const { username, password } = req.body as SignInFormParams;

  const user = users.findByCredentials(username, password);
  if (user !== null) {
    req.session.user = user;
  }

  if (req.session.user === undefined) {
    res.render("index", { error: "Invalid credentials" });
  } else {
    res.redirect("/secret");
  }
});

router.get("/destroy", function (req, res, next) {
  req.session.user = undefined;
  res.redirect("/");
});

export default router;
