import api from '../../api/index'
import {getField, updateField} from 'vuex-map-fields';
// initial state
const state = {
  all: [],
  meeting: {
    title: "",
    description: "",
    date: "",
    begin: "",
    end: "",
    moderation: "",
    clerk: ""
  }
}

// getters
const getters = {
  allMeetings(s) {
    return s.all;
  },
  Meeting(s) {
    return s.meeting;
  },
  getField
}

// actions
const actions = {
  getMeetings({
    commit
  }, item) {
    api.getMeetings(item, function(meetings) {
      commit('setMeetings', meetings)
    })
  },
  updateMeeting({
    commit
  }, model) {
    api.updateMeeting(model, function(orgs) {
      commit('setMeeting', orgs)
    })
  },
  getMeeting({
    commit
  }, id) {
    api.getMeeting(id, function(meeting) {
      commit('setMeeting', meeting)
    })
  },
  addMeeting({
    commit
  }, model) {
    console.log(model);
    api.createMeeting(model, function(meeting) {
      commit('addMeeting', meeting)
    })
  },
  addComment({
    commit
  }, model) {
    api.createComment(model, function(comment) {
      commit('addComment', comment)
    })
  },
  addTOP({
    commit
  }, model) {
    api.createTop(model.top, (top) => {
      api.createAction({
        top: top,
        meeting: model.meeting
      }, (action) => {
        commit('addTOP', action)
      });
    })
  },
  linkTOP({
    commit
  }, model) {
    api.createAction({
      top: model.top,
      meeting: model.meeting
    }, (action) => {
      commit('addTOP', action)
    });
  },
  removeAction({commit,rootState},model){
    api.deleteAction(model,(data)=>{
      commit('removeAction',model);
    })
  },
  updateField
}

// mutations
const mutations = {
  setMeetings(s, meetings) {
    //  Vue.set(s,"all" , _.cloneDeep(organizations))
    s.all = meetings //Object.assign([], organizations)
  },
  addMeeting(s, meeting) {
    //  Vue.set(s,"all" , _.cloneDeep(organizations))
    s.all.push(meeting) //Object.assign([], organizations)
  },
  setMeeting(s, meeting) {
    //  Vue.set(s,"all" , _.cloneDeep(organizations))
    console.log(meeting)
    s.meeting = meeting //Object.assign([], organizations)
  },
  addComment(s, comment) {
    //  Vue.set(s,"all" , _.cloneDeep(organizations))
    s.meeting.comments.unshift(comment) //Object.assign([], organizations)
  },
  addTOP(s, top) {
    //  Vue.set(s,"all" , _.cloneDeep(organizations))
    s.meeting.actions.unshift(top) //Object.assign([], organizations)
  },
  removeAction(s,action){
    const index = s.meeting.actions.indexOf(action.action);

    if (index !== -1) {
        s.meeting.actions.splice(index, 1);
    } else alert("not found");
  },
  updateField
}

export default {namespaced: true, state, getters, actions, mutations}
