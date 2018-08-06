import {Schema} from '@orbit/data';

const schemaDefinition = {
  models: {
    action:{
      attributes:{
        position:{
          type:'number'
        }
      },
      relationships:{
        top:{
          type:"hasOne",
          model:'top',
          inverse:'actions'
        },
        meeting:{
          type:'hasOne',
          model:'meeting',
          inverse:'actions'
        },
        protocol:{
          type:'hasOne',
          model:'protocol'
        }
      }
    },
    attachment:{
      attributes:{
        author:{
          type:"string"
        },
        content:{
          type:"string"
        },
        name: {
          type:'string'
        }
      }
    },
    comment:{
      attributes:{
        author:{
          type:"string"
        },
        content:{
          type:"string"
        },
        title: {
          type:'string'
        }
      }
    },
    inmail:{
      attributes:{
        fromaddress:{
          type:"string"
        },
        fromname:{
          type:"string"
        },
        subject:{
          type:"string"
        },
        body:{
          type:"string"
        },
        uid:{
          type:"string"
        },
        avatar:{
          type:"string"
        }
      },
      relationships:{

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
        },
        actions:{
          type: 'hasMany',
          model: 'action',
          inverse:'top'
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
        }
      },
      relationships: {
        organization: {
          type: 'hasOne',
          model: 'organization',
          inverse: 'meetings'
        },
        actions: {
          type:'hasMany',
          model:'action',
          inverse: 'meeting'
        }
      }
    }
  }
};
const schema = new Schema(schemaDefinition);
export default schema;
