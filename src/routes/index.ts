import express from "express";

const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/secret", function (req, res, next) {
  if (req.session.user === undefined) {
    res.redirect("/");
  } else {
    res.render("secret", { user: req.session.user });
  }
});

export default router;
