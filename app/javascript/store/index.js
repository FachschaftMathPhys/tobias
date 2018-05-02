
import Vue from 'vue'
import Vuex from 'vuex'
import organizations from './modules/organizations'
import createLogger from 'vuex/dist/logger'
import tops from './modules/tops'
import meetings from './modules/meetings'
import comments from './modules/comments'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const myPlugin = store => {
  // called when the store is initialized
  store.subscribe((mutation, state) => {
    console.log(mutation);
    // called after every mutation.
    // The mutation comes in the format of `{ type, payload }`.
  })
}
export default new Vuex.Store({
  modules: {
    organizations,
    tops,
    meetings,
    comments
  },
  strict:true,
  plugins: [myPlugin,createLogger]
})
