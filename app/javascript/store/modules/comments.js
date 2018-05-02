import api from '../../api/index'
import { getField, updateField } from 'vuex-map-fields';
// initial state
const state = {
  all: [],
  comment: {
    title: "",
    content: ""
  }
}

// getters
const getters = {
  allComments(s) {
    return s.all;
  },
  Comment(s) {
    return s.comment;
  },
  getField
}

// actions
const actions = {
  getComments({
    commit
  }, item) {
    api.getComments(item, function(comments) {
      commit('setComments', comments)
    })
  },
  updateComment({commit},model) {
    api.updateComment(model,function(orgs) {
      commit('setComment', orgs)
    })
  },
  getComment({
    commit
  }, id) {
    api.getComment(id, function(comment) {
      commit('setComment', comment)
    })
  },
  addComment({
    commit
  }, model) {
    api.createComment(model, function(comment) {
      commit('addComment', comment)
    })
  },
  updateField
}

// mutations
const mutations = {
  setComments(s, comments) {
    //  Vue.set(s,"all" , _.cloneDeep(organizations))
    s.all = comments //Object.assign([], organizations)
  },
  addComment(s, comment) {
    //  Vue.set(s,"all" , _.cloneDeep(organizations))
    s.all.push(comment) //Object.assign([], organizations)
  },
  setComment(s, comment) {
    //  Vue.set(s,"all" , _.cloneDeep(organizations))
    s.comment = comment //Object.assign([], organizations)
  },
  updateField
}

export default {namespaced: true,state, getters, actions, mutations}
