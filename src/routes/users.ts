import express from "express";
import users from "@/repositories/users";

const router = express.Router();

router.get("/new", function (req, res, next) {
  res.render("users/new");
});

interface SignUpFormParams {
  username: string;
  password: string;
  email: string;
}

router.post("/", function (req, res, next) {
  const { username, password, email } = req.body as SignUpFormParams;
  if (username === "" || password === "" || email === "") {
    res.render("users/new", { error: "All fields are mandatory" });
    return;
  }

  const user = users.findByUsername(username);
  if (user !== null) {
    res.render("users/new", { error: "Username already exists" });
    return;
  }

  users.create(username, password, email);
  res.redirect("/");
});

export default router;
