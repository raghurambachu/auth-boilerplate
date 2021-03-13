const jwt = require("jsonwebtoken");
const validator = require("validator");
const authService = require("../services/authService");
const userService = require("../services/userService");

const authController = {
  login: async function (req, res, next) {
    let user = req.body.user;
    if (!user.email || !user.password) {
      return res
        .status(400)
        .json({ msg: "Email & Password fields are required" });
    }
    // If valid email is input
    if (!validator.isEmail(user.email)) {
      return res.status(400).json({ msg: "Invalid email id." });
    }
    // Password shud have atleast 1 lowercase, 1 uppercase, 1 special char & 1 number.
    if (
      !validator.matches(
        user.password,
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
      )
    ) {
      return res.status(400).json({
        msg:
          "Password shud have atleast 1 lowercase, 1 uppercase, 1 Numeral & 1 special char and shud be between 8 to 20char.",
      });
    }
    try {
      const registeredUser = await userService.showUserByField({
        email: user.email,
      });
      if (!registeredUser)
        return res
          .status(400)
          .json({ msg: "Email is not registered.Please register to login." });

      // If registered compare password.
      const isValidUser = await registeredUser.comparePassword(user.password);

      if (!isValidUser)
        return res.status(400).json({ msg: "Invalid credentials." });
      const token = await authService.generateToken(registeredUser);
      res.cookie("token", token, { signed: true, httpOnly: true });
      return res.json({ user: registeredUser });
    } catch (err) {
      next(err);
    }
  },
  identifyUser: async function (req, res, next) {
    const token = req.signedCookies.token;
    if (!token) {
      return res.status(403).json({
        msg: "Unauthenticated, Please login to access the resource.",
      });
    }
    try {
      const payload = await jwt.verify(token, "sanketappsecret");
      // sanketappsecret needs to be modified with process.env.secret
      if (!payload) {
        return res.status(403).json({
          msg: "Unauthenticated, Please login to access the resource.",
        });
      }
      const user = await userService.showUser(payload.id);
      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = authController;
