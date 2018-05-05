import JsonApi from 'devour-client'
import Models from '../models/models'
// Bootstrap
const jsonApi = new JsonApi({apiUrl: 'http://localhost:8077/api'})
Models(jsonApi)
export default{
  getOrganizations(cb){
    jsonApi.findAll('organization').then(({ data, errors, meta, links })=>{
      cb(data)
    })
  },
  getOrganization(id,cb){
    jsonApi.find('organization',id.id,{include: "meetings,tops,tops.comments,meetings.comments,meetings.actions,meetings.organization,meetings.actions.top"}).then(({ data, errors, meta, links })=>{
      cb(data)
    })
  },
  createOrganization(model,cb){
    console.log(model)
    jsonApi.create('organization',model).then(({ data, errors, meta, links })=>{
      cb(data)
    })},
  updateOrganization(data,cb){
    jsonApi.update('organization',data).then(({ data, errors, meta, links })=>{
      cb(data)
    })
  },
  getTops(params,cb){
    jsonApi.findAll('top',{filter: {organization: params.org_id}}).then(({ data, errors, meta, links })=>{
      cb(data)
    })
  },
  getTop(id,cb){
    jsonApi.find('top',id.id,{include: "comments"}).then(({ data, errors, meta, links })=>{
      cb(data)
    })
  },
  createTop(model,cb){
    jsonApi.create('top',model).then(({ data, errors, meta, links })=>{
      cb(data)
    })},
    getMeetings(params,cb){
      jsonApi.findAll('meeting',{filter: {organization: params.org_id}}).then(({ data, errors, meta, links })=>{
        cb(data)
      })
    },
    getMeeting(id,cb){
      jsonApi.find('meeting',id.id,{include: "comments,actions,actions.top,actions.top.comments"}).then(({ data, errors, meta, links })=>{
        cb(data)
      })
    },
    updateMeeting(data,cb){
      jsonApi.update('meeting',data,{
 include: 'actions,actions.top'
      }).then(({ data, errors, meta, links })=>{
        cb(data)
      })
    },
    createMeeting(model,cb){
      jsonApi.create('meeting',model).then(({ data, errors, meta, links })=>{
        cb(data)
      })
  },
  createComment(model,cb){
    jsonApi.create('comment',model).then(({ data, errors, meta, links })=>{
      cb(data)
    })},
    createAction(model,cb){
      jsonApi.create('action',model,{
 include: 'top'
      }).then(({ data, errors, meta, links })=>{
        cb(data)
      })},
      deleteAction(model,cb){
        console.log(model)
        jsonApi.destroy('action',model.action.id).then(({data,errors,meta,links})=>{
          cb(data);
        })
      }
}
