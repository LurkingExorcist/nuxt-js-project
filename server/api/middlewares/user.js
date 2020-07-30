const ApiError = require("../utils/ApiError");
const User = require("../models/User");

module.exports = () => async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findOne({ _id });

    if (!user) {
      throw new ApiError(401, 'Неверный токен.');
    }

    req.user = user;

    next();
  } catch(e) {
    next(e)
  }
};
