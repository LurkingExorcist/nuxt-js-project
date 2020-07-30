const User = require('../../models/User');

module.exports.get = async function (req, res, next) {
  const data = await User
    .find(req.query)
    .then(
      data => data.map(item => ({...item}))
    );
    
  res.json(data);
}