const bcrypt = require('bcrypt');

const User = require('../../models/User');
const ApiError = require('../../utils/ApiError');

module.exports.get = async function (req, res, next) {
  const user = await User.findOne(req.query);
    
  res.json({...user});
}

module.exports.post = async function (req, res, next) {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
  
    if (user) {
      throw new ApiError(400, 'Пользователь с таким Email уже существует');
    }

    if (req.body.password && req.body.password !== '') {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    } else {
      throw new ApiError(400, 'Укажите пароль пользователя');
    }

    await User.validate(req.body);
  
    const newUser = await User.insert(req.body);
    res.json({...newUser});
  } catch(e) {
    next(e);
  }
}

module.exports.put = async function (req, res, next) {
  try {
    await User.validate(req.body);

    if (req.body.password && req.body.password !== '') {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    } else {
      delete req.body.password;
    }
  
    await User.update({
      _id: req.query.id
    }, {
      $set: req.body
    })

    res.sendStatus(200);
  } catch(e) {
    next(e);
  }
}

module.exports.remove = async function (req, res, next) {
    await User.remove({
      _id: req.query.id
    })
    
    res.sendStatus(200);
}