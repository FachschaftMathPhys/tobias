import api from '../../api/index'
import { getField, updateField } from 'vuex-map-fields';
// initial state
const state = {
    all:[],
    organization:{title:"",description:""}
}

// getters
const getters = {
  allOrganizations(s){ console.log(s);

    return s.all;},
    Organization(s){
      return s.organization;},
      getField
}

// actions
const actions = {
  getAllOrganizations({commit}) {
    api.getOrganizations(function(orgs) {
      console.log("actions");
      console.log(orgs);
      commit('setOrganizations', orgs)
    })
  },
  getOrganization({commit},id) {
    api.getOrganization(id,function(orgs) {
      console.log("actions");
      console.log(orgs);
      commit('setOrganization', orgs)
    })
  },
  updateOrg({commit},model) {
    api.updateOrganization(model,function(orgs) {
      commit('setOrganization', orgs)
    })
  },
  addOrg({commit},model) {
    api.createOrganization(model,function(orgs) {
      commit('setOrganization', orgs)
      commit('addOrganization', orgs)
    })
  }

}

// mutations
const mutations = {
  setOrganizations(s, orgs) {
  //  Vue.set(s,"all" , _.cloneDeep(organizations))
    s.all =orgs//Object.assign([], organizations)
  },
  addOrganization(s, orgs) {
  //  Vue.set(s,"all" , _.cloneDeep(organizations))
    s.all.push(orgs)//Object.assign([], organizations)
  },
  setOrganization(s, org) {
  //  Vue.set(s,"all" , _.cloneDeep(organizations))
    s.organization =org//Object.assign([], organizations)
  },
  updateField
}

export default {state, getters, actions, mutations}
