import express from "express";
import users from "@/repositories/users";

const router = express.Router();

interface SignUpFormParams {
  username: string;
  password: string;
  email: string;
}

interface CreateUserResult {
  success: boolean;
  error?: string;
}

const createUser = async ({
  username,
  password,
  email,
}: SignUpFormParams): Promise<CreateUserResult> => {
  if (username === "" || password === "" || email === "") {
    return { success: false, error: "All fields are mandatory" };
  }

  const user = await users.findByUsername(username);
  if (user !== null) {
    return { success: false, error: "Username already exists" };
  }

  await users.create(username, password, email);
  return { success: true };
};

router.post("/", function (req, res, next) {
  const { username, password, email } = req.body as SignUpFormParams;

  createUser({ username, password, email })
    .then(({ success, error }) => {
      if (!success) {
        res.render("users/new", { error });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Something went wrong" });
    });
});

router.get("/new", function (req, res, next) {
  res.render("users/new");
});

export default router;
