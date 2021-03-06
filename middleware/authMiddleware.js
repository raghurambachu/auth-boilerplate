const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

const authMiddleware = {
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
      const user = await userService.showUserByField({ email: payload.email });
      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = authMiddleware;
