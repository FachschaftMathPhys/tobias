
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import VuexStore from '../api/index'
Vue.use(Vuex)

const debug = false

export default new Vuex.Store({
  modules: {
    VuexStore
  },
  strict:debug,
  plugins: [createLogger({})]
})
