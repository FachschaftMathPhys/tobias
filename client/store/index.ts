import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import VuexStore from './api'
import SettingsModule from './settings'

const debug = false

export default function () {
  return new Vuex.Store({
    modules: {
      VuexStore,
      settings: SettingsModule
    },
    strict: debug,
    plugins: [createLogger({})]
  })
}
