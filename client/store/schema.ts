import { Schema } from '@orbit/data'
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
          type:'hasMany',
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
export default schema
