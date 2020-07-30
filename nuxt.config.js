export default {
  mode: 'universal',
  target: 'server',
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: 'КГЭУ | ЛК Студента',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  components: true,
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/users/login', method: 'post', propertyName: 'token' },
          logout: { url: '/api/users/logout', method: 'post' },
          user: { url: '/api/users/me', method: 'get', propertyName: 'user' }
        },
      }
    }
  },
  axios: {
    baseURL: 'https://bird-storm-avocado.glitch.me'
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false
    }
  }
}
