const { Router } = require('express');
const router = Router();

const jwt = require('../../middlewares/jwt');
const user = require('../../middlewares/user');
const restrict = require('../../middlewares/restrict');

const me = require('./me');
const one = require('./one');
const list = require('./list');
const login = require('./login');
const logout = require('./logout');

router.post('/login', login.post)

router.use(jwt());
router.use(user());

router.post('/logout', logout.post)

router.get('/me', me.get)
router.put('/me', me.put)

router.use(restrict('student'))

router.get('/one', one.get)
router.put('/one', one.put)
router.post('/one', one.post)
router.delete('/one', one.remove)

router.get('/list', list.get)

module.exports = () => router;