const express = require("express");
const router = express.Router();

const { identifyUser } = require("../middleware/authMiddleware");

router.get("/verify", identifyUser, function (req, res, next) {
  return res.json({ user: req.user });
});

router.get("/logout", identifyUser, function (req, res, next) {
  return res.clearCookie("token").json({ msg: "Successully logged out" });
});

module.exports = router;
