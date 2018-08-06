import JsonApi from 'devour-client'
import schema from '../models/schema'
import VuexStore from 'vuex-orbit';
import IndexedDBSource from '@orbit/indexeddb';
import Coordinator, {SyncStrategy} from '@orbit/coordinator';
import {LogLevel} from '@orbit/coordinator';
import JSONAPISource from '@orbit/jsonapi';
import {RequestStrategy} from '@orbit/coordinator';
//bucket
import LocalStorageBucket from '@orbit/local-storage-bucket';
import IndexedDBBucket, {supportsIndexedDB} from '@orbit/indexeddb-bucket';
  const options={namespace: 'fs-tobias'};
const bucket =  supportsIndexedDB()
? new IndexedDBBucket(options)
: new LocalStorageBucket(options);
const backup = new IndexedDBSource({bucket, schema, name: 'backup', namespace: 'tobias'});
const store = new VuexStore({bucket, schema});
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
export default store;