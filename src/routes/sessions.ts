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

  users
    .findByCredentials(username, password)
    .then((user) => {
      if (user === null) {
        res.render("index", { error: "Invalid credentials" });
      } else {
        req.session.user = user;
        res.redirect("/secret");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Something went wrong" });
    });
});

router.get("/destroy", function (req, res, next) {
  req.session.user = undefined;
  res.redirect("/");
});

export default router;
