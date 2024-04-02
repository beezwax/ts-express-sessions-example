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

interface SignInUserResultSuccess {
  success: true;
  user: User;
}

interface SignInUserResultFailure {
  success: false;
  error: string;
}

const signInUser = async ({
  username,
  password,
}: SignInFormParams): Promise<
  SignInUserResultSuccess | SignInUserResultFailure
> => {
  const user = await users.findByCredentials(username, password);
  if (user === null) return { success: false, error: "Invalid credentials" };

  return { success: true, user };
};

router.post("/", function (req, res, next) {
  const { username, password } = req.body as SignInFormParams;

  signInUser({ username, password })
    .then((result) => {
      if (result.success) {
        req.session.user = result.user;
        res.redirect("/secret");
      } else {
        res.render("index", { error: result.error });
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
