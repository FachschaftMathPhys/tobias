const nodeExternals = require('webpack-node-externals')
const resolve = (dir) => require('path').join(__dirname, dir)

module.exports = {
  /*
   ** Headers of the page
   */
  mode: 'spa',
  head: {
    title: 'tobias',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Tool zur Vorbereitung von Sitzungen'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  plugins: ['~/plugins/vuetify.js'],
  css: [
    '~/assets/style/app.styl'
  ],
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#FF0000'
  },
  modules: ['nuxt-typescript', '@nuxtjs/pwa'],
  modulesDir: ['node_modules'],
  workbox: {
    // Workbox options
  },
  manifest: {
    name: 'Tobias',
    lang: 'de',
    mobileAppIOS: true,
    crossorigin: 'use-credentials'
  },
  /*
   ** Build configuration
   */
  build: {
    babel: {
      plugins: ['transform-decorators-legacy', 'transform-class-properties', ["transform-imports", {
        "vuetify": {
          "transform": "vuetify/es5/components/${member}",
          "preventFullImport": true
        }
      }]]
    },
    vendor: [
      '~/plugins/vuetify.js',
      '@orbit/core',
      '@orbit/jsonapi'
    ],
    extractCSS: true,
    /*
     ** Run ESLint on save
     */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
      config.module.rules.push({
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['vue-app'],
          babelrc: false,
          cacheDirectory: true
        },
        include: [
          // path.resolve(__dirname, './node_modules/TestComponent'),
          resolve(__dirname, './node_modules/vuetify/src')
        ]
      })
    }
  }
}