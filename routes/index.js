const express = require("express");
const router = express.Router();

const { identifyUser } = require("../middleware/authMiddleware");

router.get("/verify", identifyUser, function (req, res, next) {
  return res.json({ user: req.user });
});

module.exports = router;
