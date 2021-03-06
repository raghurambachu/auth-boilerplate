const jwt = require("jsonwebtoken");

const authService = {
  generateToken: async function (user) {
    const payload = { id: user._id, email: user.email };
    try {
      return await jwt.sign(payload, "sanketappsecret");
      // sanketappsecret needs to be modified with process.env.secret
    } catch (err) {
      return err;
    }
  },
};

module.exports = authService;
