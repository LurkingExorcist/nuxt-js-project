const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../../models/User");
const ApiError = require("../../utils/ApiError");

module.exports.post = async function (req, res, next) {
  try {
    const {
      email, password
    } = req.body;
  
    const user = await User.findOne({
      email
    });

    if (!user) {
      throw new ApiError(401, 'Неверный Email или пароль');
    }

    const compareResult = await bcrypt.compare(password, user.password);

    if (!compareResult) {
      throw new ApiError(401, 'Неверный Email или пароль');
    }

    res.json({
      token: jwt.sign({...user}, process.env.JWT_SECRET)
    });
  } catch(e) {
    next(e);
  }
}