import api from '../../api/index'
import { getField, updateField } from 'vuex-map-fields';
// initial state
const state = {
    all:[],
    organization:{title:"",description:"",meetinginvitationtemplate:""}
}

// getters
const getters = {
  allOrganizations(s){

    return s.all;},
    Organization(s){
      return s.organization;},
      getField
}

// actions
const actions = {
  getAllOrganizations({commit}) {
    api.getOrganizations(function(orgs) {
      commit('setOrganizations', orgs)
    })
  },
  getOrganization({commit},id) {
    api.getOrganization(id,function(orgs) {
      commit('setOrganization', orgs)
    })
  },
  updateActionsMeetings({commit},model){
    let m ={
      ...model.meeting
    };
    for(let ac of model.newactions){
      api.createAction(ac,function(action){
        model.actions.push(action);
        m.actions = model.actions;
        api.updateMeeting(m,function(meeting){
          commit("linkMeeting",meeting);
        });
      })
    }
  },
  updateOrg({commit},model) {
    api.updateOrganization(model,function(orgs) {
      commit('setOrganization', orgs)
    })
  },
  addTopToOrg({commit},model){
    commit("addTopToOrg",model);
  },
  addOrg({commit},model) {
    api.createOrganization(model,function(orgs) {
      commit('setOrganization', orgs)
      commit('addOrganization', orgs)
    })
  },
  removeAction({commit,rootState},model){
    api.deleteAction(model,(data)=>{
      commit('removeAct',model);
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
  addTopToOrg(s,top){
    s.all.filter((item)=>{
      return item.id == top.organization.id;
    })[0].tops.unshift(top);
  },
  setOrganization(s, org) {
  //  Vue.set(s,"all" , _.cloneDeep(organizations))
    s.organization =org//Object.assign([], organizations)
  },
  updateTops(s, org) {
  //  Vue.set(s,"all" , _.cloneDeep(organizations))
    s.organization.tops =org//Object.assign([], organizations)
  },
  linkMeeting(s,model){
    console.log(model);
    s.organization.meetings.filter((item)=>{
      return item.id==model.id;
    })[0].actions= model.actions;
  },
  removeAct(s,action){
    const index = s.organization.meetings.indexOf(action.meeting);
    const meeting = s.organization.meetings[index];
    const index2 = meeting.actions.indexOf(action.action);
    if (index2 !== -1) {
        s.organization.meetings[index].actions.splice(index2, 1);
    } else alert("not found");
  },
  updateField
}

export default {state, getters, actions, mutations}
