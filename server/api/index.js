const { Router } = require('express')
const bodyParser = require('body-parser');

const notfound = require('./middlewares/notfound');
const error = require('./middlewares/error');

const users = require('./routes/users')
const storage = require('./routes/storage')

const api = Router()

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

api.use('/users', users())
api.use('/storage', storage())

api.use('*', notfound());

api.use(error());

module.exports = () => api;