import { getField, updateField } from 'vuex-map-fields'
const state = () => {
  return {
    darkTheme: true
  }
}
const getters = {
  getField
}
const mutations = {
  updateField
}
export default {
  state, getters, mutations, namespaced: true
}
