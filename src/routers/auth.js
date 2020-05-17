const express = require("express");
const passport = require("passport");

const router = new express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/api/logout", (req, res) => {
  req.logout();
  res.redirect("/signin");
});

router.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
