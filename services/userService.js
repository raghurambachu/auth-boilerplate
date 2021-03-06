const User = require("../models/User");

const userService = {
  createUser: async function (user) {
    try {
      return await User.create(user);
    } catch (err) {
      return err;
    }
  },
  showUserByField: async function (filterObj) {
    try {
      return await User.findOne(filterObj);
    } catch (err) {
      return err;
    }
  },
};

module.exports = userService;
