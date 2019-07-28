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
  vuetify: {
      theme: {
        primary: '#990000',
        secondary: '#2f985c',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      }
  },
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
  plugins:[
    { src: '@/plugins/vue-apollo', ssr: false}
  ],
  /*
   ** Build configuration
   */
  build: {
    parallel: false,
    plugins: [
      new VuetifyLoaderPlugin()
    ],
    transpile: [/^vuetify/,'apollo-upload-client'],
    babel: {
      ignore: [/[\/\\]core-js/, /@babel[\/\\]runtime/],
      plugins: [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-modules-commonjs'
      ]
    },
    extend(config,ctx){
      const gqlRules = {
        test: /\.(graphql|gql)$/,
        use: 'graphql-tag/loader'
      }
      //gqlRules.exclude = /(node_modules)/
      config.module.rules.push(gqlRules)
    }
  },
  extractCSS: true
  /*
   ** Run ESLint on save
   */
  //
}
