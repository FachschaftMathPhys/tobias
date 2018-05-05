export default function(jsonApi) {
  jsonApi.define('comment', {
    title: '',
    author: '',
    content: '',
    commentable: {
      jsonApi: "hasOne"
    }
  });
  jsonApi.define('meeting', {
    title: '',
    date: '',
    begin: '',
    end: '',
    moderation: '',
    clerk: '',
    description: '',
    actions: {
      jsonApi: 'hasMany',
      type: 'actions'
    },
    organization: {
      jsonApi: 'hasOne',
      type: 'organizations'
    },
    comments: {
      jsonApi: 'hasMany',
      type: 'comments'
    },
  });
  jsonApi.define('organization', {
    title: '',
    description: '',
    tops: {
      jsonApi: 'hasMany',
      type: 'tops'
    },
    meetings: {
      jsonApi: 'hasMany',
      type: 'meetings'
    }
  });
  jsonApi.define('top',{
    title:'',
    description:'',
    submitter:'',
    author:'',
    submittedAt:'',
    comments: {
      jsonApi: 'hasMany',
      type: 'comments'
    },
    organization:{
      jsonApi:'hasOne',
      type:'organizations'
    }
  })
  jsonApi.define('action', {
    top: {
      jsonApi: 'hasOne',
      type: 'tops'
    },
    meeting: {
      jsonApi: 'hasOne',
      type: 'meetings'
    }
  });
}
