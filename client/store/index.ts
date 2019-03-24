import { Schema, TransformBuilderFunc, QueryBuilderFunc } from '@orbit/data'
// @ts-ignore
const schemaDefinition = {
  models: {
    user: {
      attributes: {
        name: {
          type: 'string'
        },
        fullname: {
          type: 'string'
        },
        pic: {
          type: 'string'
        }
      }
    },
    action: {
      attributes: {
        position: {
          type: 'number'
        }
      },
      relationships: {
        top: {
          type: 'hasOne',
          model: 'top'
        },
        meeting: {
          type: 'hasOne',
          model: 'meeting',
          inverse: 'actions'
        },
        protocol: {
          type: 'hasOne',
          model: 'protocol'
        }
      }
    },
    attachment: {
      attributes: {
        author: {
          type: 'string'
        },
        content: {
          type: 'string'
        },
        name: {
          type: 'string'
        }
      }
    },
    comment: {
      attributes: {
        author: {
          type: 'string'
        },
        content: {
          type: 'string'
        },
        title: {
          type: 'string'
        }
      }
    },
    email: {
      attributes: {
        address: {
          type: 'string'
        },
        subject: {
          type: 'string'
        },
        body: {
          type: 'string'
        },
        uid: {
          type: 'string'
        }
      },
      relationships: {
        referencable: {
          type: 'hasMany',
          polymorphic: true
        }
      }
    },
    inmail: {
      attributes: {
        fromaddress: {
          type: 'string'
        },
        fromname: {
          type: 'string'
        },
        subject: {
          type: 'string'
        },
        body: {
          type: 'string'
        },
        uid: {
          type: 'string'
        },
        avatar: {
          type: 'string'
        }
      },
      relationships: {

      }
    },
    organization: {
      attributes: {
        title: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        meetinginvitationtemplate: {
          type: 'string'
        }
      },
      relationships: {
        tops: {
          type: 'hasMany',
          model: 'top',
          inverse: 'organization'
        },
        meetings: {
          type: 'hasMany',
          model: 'meeting',
          inverse: 'organization'
        }
      }
    },
    top: {
      attributes: {
        title: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        submitter: {
          type: 'string'
        },
        author: {
          type: 'string'
        },
        submitted_at: {
          type: 'date'
        }
      },
      relationships: {
        organization: {
          type: 'hasOne',
          model: 'organization',
          inverse: 'tops'
        }
      }
    },
    meeting: {
      attributes: {
        title: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        date: {
          type: 'date'
        },
        moderation: {
          type: 'string'
        },
        clerk: {
          type: 'string'
        },
        begin: {
          type: 'date'
        },
        end: {
          type: 'date'
        },
        download: {
          type: 'string'
        }
      },
      relationships: {
        organization: {
          type: 'hasOne',
          model: 'organization',
          inverse: 'meetings'
        },
        actions: {
          type: 'hasMany',
          model: 'action',
          inverse: 'meeting'
        }
      }
    }
  }
}
// @ts-ignore
const schema = new Schema(schemaDefinition)

import Store from "@orbit/store"
import IndexedDBSource from '@orbit/indexeddb'
import Coordinator, { SyncStrategy, RequestStrategy, LogLevel } from '@orbit/coordinator'
import { updateField } from 'vuex-map-fields';

import JSONAPISource from '@orbit/jsonapi'
//  bucket
import LocalStorageBucket from '@orbit/local-storage-bucket'
import IndexedDBBucket from '@orbit/indexeddb-bucket'
import { NetworkError, Transform } from '@orbit/data';
import {clone} from '@orbit/utils'
import { Commit, Dispatch } from 'vuex';
const options = { namespace: 'fs-tobias' }
const bucket = false//supportsIndexedDB()
  ? new IndexedDBBucket(options)
  : new LocalStorageBucket(options)

const backup = new IndexedDBSource({ bucket, schema, name: 'backup', namespace: 'tobias' })
const store = new Store({
  name: 'store',
  //bucket,
  schema
})
import Vue from "vue"
Vue.prototype.$orbitstore = store

const remote = new JSONAPISource({
  schema: schema,
  name: 'remote',
  host: `https://${window.location.host}/api`,
  defaultFetchSettings: {
    credentials: 'same-origin',
    headers: {
      Accept: 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json'
    }
  },
  //bucket
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
const backupStoreSync = new SyncStrategy({ source: 'store', target: 'backup', blocking: false })
const backupStoreBackSync = new SyncStrategy({ source: 'backup', target: 'store', blocking: true })
coordinator.addStrategy(backupStoreBackSync)
coordinator.addStrategy(backupStoreSync)
coordinator.addStrategy(new RequestStrategy({
  name: 'remote-push-fail',

  source: 'remote',
  on: 'pushFail',

  action(transform: Transform, e: Error) {
    //@ts-ignore
    const coordinator = this.coordinator;
    const remote = coordinator.getSource('remote');
    const store = coordinator.getSource('store');
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

  action(transform: Transform, e: Error) {
    //@ts-ignore
    const coordinator = this.coordinator;
    const remote = coordinator.getSource('remote');
    const store = coordinator.getSource('store');
    //console.log(bucket)
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
export const state = () => {
  return {
    organizations: [],
    organization: false,
    tops: [],
    meetings: [],
    user: false
  }
}

export const getters = {
  getField: (state: any) => {
    return (path: string) => path.split(/[.[\]]+/).reduce((prev: any, key: string) => {
      if (prev != null) {
        return prev[key]
      } else {
        return null;
      }
    }, state);
  }
}
interface QueryParams {
  query: QueryBuilderFunc,
  setField: string
}
console.log(store)
export const actions = {
  query: async ({ commit }: { commit: Commit }, { query, setField }: QueryParams) => {
    commit("set",{data:false,setField})
    store.query(query).then((data) => {
      console.info(data)
      commit("set", { data:clone(data), setField })
    }).catch((reason)=>{
      console.log("Fehler")
      console.log(reason)
    })
  },
  update: async ({ dispatch }: { dispatch: Dispatch }, { update, queryParam }: { update: TransformBuilderFunc, queryParam: QueryParams }) => {
    let data = await store.update(update)
    console.log(data)
    if (queryParam) {
      dispatch("query", queryParam);
    }
  }
}
export const mutations = {
  updateField,
  set: (state: any, { data, setField }: { data: any, setField: string }) => {
    state[setField] = data;
  }
}

import createLogger from 'vuex/dist/logger'

export const plugins = [createLogger()]
