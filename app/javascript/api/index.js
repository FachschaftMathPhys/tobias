import JsonApi from 'devour-client'
import schema from '../models/schema'
import Store from '@orbit/store';
import IndexedDBSource from '@orbit/indexeddb';
import Coordinator, {SyncStrategy} from '@orbit/coordinator';
import {LogLevel} from '@orbit/coordinator';
import JSONAPISource from '@orbit/jsonapi';
import {RequestStrategy} from '@orbit/coordinator';
//bucket
import LocalStorageBucket from '@orbit/local-storage-bucket';
import IndexedDBBucket, {supportsIndexedDB} from '@orbit/indexeddb-bucket';
const BucketClass = supportsIndexedDB()
  ? IndexedDBBucket
  : LocalStorageBucket;
const bucket = new BucketClass({namespace: 'fs-tobias'});
const backup = new IndexedDBSource({bucket, schema, name: 'backup', namespace: 'tobias'});
const store = new Store({bucket, schema});
const remote = new JSONAPISource({
  schema,
  name: 'remote',
  host: "http://" + location.host + '/api'
});

const coordinator = new Coordinator({
  sources: [store, backup]
});
coordinator.addSource(remote);
coordinator.addStrategy(new RequestStrategy({source: 'store', on: 'beforeQuery', target: 'remote', action: 'pull', blocking: true}));
// Update the remote server whenever the store is updated
coordinator.addStrategy(new RequestStrategy({source: 'store', on: 'beforeUpdate', target: 'remote', action: 'push', blocking: true}));
// Sync all changes received from the remote server to the store
coordinator.addStrategy(new SyncStrategy({source: 'remote', target: 'store', blocking: true}));
const backupStoreSync = new SyncStrategy({source: 'store', target: 'backup', blocking: true});
coordinator.addStrategy(backupStoreSync);
coordinator.activate({logLevel: LogLevel.Info});
console.log(store);
export default {
  getOrganizations(cb) {
    store.query(q => q.findRecords('organization')).then((data) => {
      cb(data)
    })
  },
  getOrganization(id, cb) {
    store.query(q => q.findRecord({type: 'organization', id: id.id})).then((data) => {
      cb(data)
    })
  },
  createOrganization(model, cb) {
    jsonApi.create('organization', model).then(({data, errors, meta, links}) => {
      cb(data)
    })
  },
  updateOrganization(data, cb) {
    jsonApi.update('organization', data).then(({data, errors, meta, links}) => {
      cb(data)
    })
  },
  getTops(params, cb) {
    store.query(q => q.findRelatedRecords({
      type: 'organization',
      id: params.org_id
    }, 'tops')).then((data) =>{
      cb(data);});
  },
  getTop(id, cb) {
    store.query(q => q.findRecord({type: 'top', id: id.id})).then((data) => {
      cb(data)
    })
  },
  createTop(model, cb) {
    console.log(model);
    schema.initializeRecord(model);
    store.update(t => t.addRecord(  { type: 'top', ...model })).then((data)=>{cb(model)});
  },
  getMeetings(params, cb) {
    store.query(q => q.findRelatedRecords({
      type: 'organization',
      id: params.org_id
    }, 'meetings')).then((data) => cb(data));
  },
  getMeeting(id, cb) {
    store.query(q => q.findRecord({type: 'meeting', id: id.id})).then((data) => {
      cb(data)
    })
  },
  updateMeeting(data, cb) {
    jsonApi.update('meeting', data, {include: 'actions,actions.top'}).then(({data, errors, meta, links}) => {
      cb(data)
    })
  },
  createMeeting(model, cb) {
    jsonApi.create('meeting', model).then(({data, errors, meta, links}) => {
      cb(data)
    })
  },
  createComment(model, cb) {
    jsonApi.create('comment', model).then(({data, errors, meta, links}) => {
      cb(data)
    })
  },
  createAction(model, cb) {
    jsonApi.create('action', model, {include: 'top'}).then(({data, errors, meta, links}) => {
      cb(data)
    })
  },
  deleteAction(model, cb) {
    jsonApi.destroy('action', model.action.id).then(({data, errors, meta, links}) => {
      cb(data);
    })
  },
  getInmails(cb) {
    jsonApi.findAll('inmails').then(({data, errors, meta, links}) => {
      cb(data)
    })
  }
}
