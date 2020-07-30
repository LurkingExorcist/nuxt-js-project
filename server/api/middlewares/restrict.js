const ApiError = require("../utils/ApiError");

module.exports = (...restricted) => async (req, res, next) => {
  try {
    const { role } = req.user;

    if (!role) {
      throw new ApiError(400, 'invalid role');
    }

    if (restricted.indexOf(role) !== -1) {
      throw new ApiError(403, 'Доступ к запрашиваемому ресурсу запрещен');
    }

    next();
  } catch(e) {
    next(e);
  }
};
