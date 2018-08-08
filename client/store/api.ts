import schema from './schema'
import VuexStore from 'vuex-orbit'
import IndexedDBSource from '@orbit/indexeddb'
import Coordinator, { SyncStrategy, RequestStrategy, LogLevel } from '@orbit/coordinator'

import JSONAPISource from '@orbit/jsonapi'
//  bucket
import LocalStorageBucket from '@orbit/local-storage-bucket'
import IndexedDBBucket, { supportsIndexedDB } from '@orbit/indexeddb-bucket'
import { NetworkError, Transform } from '@orbit/data';
const options = { namespace: 'fs-tobias' }
const bucket = supportsIndexedDB()
  ? new IndexedDBBucket(options)
  : new LocalStorageBucket(options)

const backup = new IndexedDBSource({ bucket, schema, name: 'backup', namespace: 'tobias' })
const store = new VuexStore({ bucket, schema })

const remote = new JSONAPISource({
  schema: schema,
  name: 'remote',
  host: `https://${window.location.host}/api`,
  defaultFetchSettings: {
    credentials: 'same-origin',
    headers:{
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json'
    }
  }
})

const coordinator = new Coordinator({
  sources: [store, backup]
})
coordinator.addSource(remote)

coordinator.addStrategy(new RequestStrategy({ source: 'store', on: 'beforeQuery', target: 'remote', action: 'pull', blocking: true }))
// Update the remote server whenever the store is updated
coordinator.addStrategy(new RequestStrategy({ source: 'store', on: 'beforeUpdate', target: 'remote', action: 'push', blocking: true }))
// Sync all changes received from the remote server to the store
coordinator.addStrategy(new SyncStrategy({ source: 'remote', target: 'store', blocking: true }))
const backupStoreSync = new SyncStrategy({ source: 'store', target: 'backup', blocking: true })
coordinator.addStrategy(backupStoreSync)
coordinator.addStrategy(new RequestStrategy({
  name: 'remote-push-fail',

  source: 'remote',
  on: 'pushFail',

  action(transform, e) {
    const coordinator = this.coordinator;
    const remote = coordinator.getSource('remote');
    const store = coordinator.getSource('store');
    const bucket = coordinator.getSource('bucket');
    console.log(transform)
    console.log(store)
    if (e instanceof NetworkError) {
      // When network errors are encountered, try again in 5s
      console.log('NetworkError - will try again soon');
      setTimeout(() => {
        remote.requestQueue.retry();
      }, 5000);

    } else {
      // When non-network errors occur, notify the user and
      // reset state.
      let label = transform.options && transform.options.label;
      if (label) {
        alert(`Unable to complete "${label}"`);
      } else {
        alert(`Unable to complete operation "${transform.id}"`);
      }

      // Roll back store to position before transform
      console.log(store.transformLog)
      if (store.transformLog.contains(transform.id)) {
        console.log('Rolling back - transform:', transform.id);
        store.rollback(transform.id, -1);
      }
      store.requestQueue.clear();
      return remote.requestQueue.skip();
    }
  },

  blocking: true
}))
coordinator.addStrategy(new RequestStrategy({
  name: 'remote-query-fail',

  source: 'remote',
  on: 'queryFail',

  action(transform: Transform, e) {
    const coordinator = this.coordinator;
    const remote = coordinator.getSource('remote');
    const store = coordinator.getSource('store');
    console.log(bucket)
    if (e instanceof NetworkError) {
      // When network errors are encountered, try again in 5s
      console.log('NetworkError - will try again soon');
      setTimeout(() => {
        remote.requestQueue.retry();
      }, 5000);

    } else {
      // When non-network errors occur, notify the user and
      // reset state.
      let label = transform.options && transform.options.label;
      if (label) {
        alert(`Unable to complete "${label}"`);
      } else {
        alert(`Unable to complete operation`);
      }

      // Roll back store to position before transform
      if (store.transformLog.contains(transform.id)) {
        console.log('Rolling back - transform:', transform.id);
        store.rollback(transform.id, -1);
      }

      return remote.requestQueue.skip();
    }
  },

  blocking: true
}))
coordinator.activate({ logLevel: LogLevel.Info })

export default store
