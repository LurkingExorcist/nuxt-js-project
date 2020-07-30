const { loadNuxt, build } = require('nuxt')
const app = require('express')()

require('dotenv').config();

const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

const uploads = require('./api/middlewares/uploads');
const api = require('./api');

async function start() {
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

  app.use('/uploads', uploads());
  app.use('/api/', api());
  app.use(nuxt.render)

  if (isDev) {
    build(nuxt)
  }
  app.listen(port, '0.0.0.0')
  console.log('Server listening on `localhost:' + port + '`.')
}

start()