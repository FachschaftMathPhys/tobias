import api from '../../api/index'
import _ from 'lodash';
// initial state
const state = {
  all: [],
  top: {}
}

// getters
const getters = {
  allTops(s) {
    return s.all;
  },
  Top(s) {

    return s.top;
  }
}

// actions
const actions = {
  getTops({
    commit
  }, item) {
    api.getTops(item, function(tops) {
      commit('setTops', tops)
    })
  },
  getTop({
    commit
  }, id) {
    api.getTop(id, function(top) {
      commit('setTop', top)
    })
  },
  addTop({
    commit, dispatch
  }, model) {
    console.log(model);
    api.createTop(model, function(top) {
      console.log(top);
      dispatch('addTopToOrg',top,{root:true});
      commit('addTop', top);
    })
  }

}

// mutations
const mutations = {
  setTops(s, tops) {
    //  Vue.set(s,"all" , _.cloneDeep(organizations))
    s.all = tops //Object.assign([], organizations)
  },
  addTop(s, top) {
    //  Vue.set(s,"all" , _.cloneDeep(organizations))
    console.log(s.all);
    s.all.push(tops) //Object.assign([], organizations)
  },
  setTop(s, top) {
    //  Vue.set(s,"all" , _.cloneDeep(organizations))
    s.top = top //Object.assign([], organizations)
  }
}

export default {state, getters, actions, mutations}
