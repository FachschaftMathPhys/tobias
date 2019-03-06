const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const nodeExternals = require('webpack-node-externals')

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
  css: [
    '~/assets/style/app.styl'
  ],
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#990000'
  },
  modules: [ '@nuxtjs/pwa', '@nuxtjs/vuetify'],
  modulesDir: ['node_modules'],
  workbox: {
    // Workbox options
    wbOptions: {
      credentials: 'same-origin'
    },
    offline:true
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
    parallel: true,
    plugins: [
      new VuetifyLoaderPlugin(),
    ],
    transpile: [/^vuetify/]
  },

  extractCSS: true
  /*
   ** Run ESLint on save
   */
  //
}
