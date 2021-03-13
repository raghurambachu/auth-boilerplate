const validator = require("validator");
const userService = require("../services/userService");

const usersController = {
  createUser: async function (req, res, next) {
    let user = req.body.user;
    if (!user.email || !user.password) {
      return res
        .status(400)
        .json({ msg: "Email & Password fields are required" });
    }
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

    // Check if email is already registered
    try {
      let isAlreadyRegistered = await userService.showUserByField({
        email: user.email,
      });

      if (isAlreadyRegistered)
        return res.status(400).json({ msg: "Email is already registered." });

      const createdUser = await userService.createUser(user);
      return res.status(201).json({ user: createdUser });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = usersController;
