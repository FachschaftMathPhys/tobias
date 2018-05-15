import api from '../../api/index'
import { getField, updateField } from 'vuex-map-fields';
const state ={
  all:[],
  inmail:{}
}

const getters = {
  allInmails(s){
    return s.all;
  },
  Inmail(s){
    return s.inmail
  },
  getField
}

const actions ={
  getInmails({commit}){
    api.getInmails(function(inmails){
      commit('setInmails',inmails);
    })
  },
  getInmail({
    commit
  }, id) {
    api.getInmail(id, function(inmail) {
      commit('setInmail', inmail)
    })
  },
}
const mutations = {
  setInmails( s,inmails) {
    s.all= inmails;
  },
  setInmail(s,inmail){
    s.inmail = inmail;
  }
}

export default {namespaced: true, state, getters, actions, mutations}
