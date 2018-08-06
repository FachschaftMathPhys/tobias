
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import VuexStore from '../api/index'
import SettingsModule from './modules/settings'
Vue.use(Vuex)

const debug = false

export default new Vuex.Store({
  modules: {
    VuexStore,
    settings:SettingsModule
  },
  strict:debug,
  plugins: [createLogger({})]
})
