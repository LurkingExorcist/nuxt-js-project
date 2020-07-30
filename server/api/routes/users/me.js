const User = require('../../models/User');

module.exports.get = function (req, res, next) {
  res.json({
    user: {...req.user}
  });
}

module.exports.put = async function (req, res, next) {
  try {
    await User.validate(req.body);

    await User.update({
      _id: req.user._id
    }, {
      $set: {
        address: req.body.address,
        phone_number: req.body.phone_number,
        contract: req.body.contract,
      }
    })

    res.sendStatus(200);
  } catch(e) {
    next(e);
  }
}