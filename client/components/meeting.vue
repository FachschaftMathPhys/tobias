<template lang="slm">
div
  v-card
    v-card-title
      h3.headline
        | {{meeting.attributes.title}}
        .right.grey-text
          | @{{meeting.attributes.moderation}}
    v-card-text
      | {{meeting.attributes.description}}
      h4 TOPS
      v-expansion-panel v-if="meeting.relationships"
        draggable v-model='Actions' :options='{group:"tops"}' style="width:100%"
          div v-for="action in actions" :key="action.id"
            Action :action="action" @deleteAction="da"
          v-btn slot="footer" flat=true Ziehe TOPs hierhin...
    v-card-actions
      v-btn color="accent" flat=true :to='{name:"organizations-organization-meetings-meeting",params:{meeting:meeting.id,organization:$route.params.organization}}'
        span v-if="meeting.relationships.comments"
          | {{meeting.relationships.comments.length}} Kommentar(e)
      v-btn color="secondary" flat=true  icon=true
        v-icon edit
      v-btn color="secondary" flat=true  icon=true
        v-icon delete
</template>
<script lang="ts">
import draggable from 'vuedraggable'
import Action from './action.vue'
import Component from 'nuxt-class-component'
import { Watch } from 'nuxt-property-decorator'
import Vue from 'vue'
import store from '../store/api'
import { Record } from '@orbit/data'

const MeetingProps = Vue.extend({
  components: {
    draggable,
    Action
  },
  methods: {
  },
  props: ['meeting', 'organizationview']
})

@Component({
  name: 'Meeting'
})
export default class Meeting extends MeetingProps {
  da (item) {
    if (confirm('Wirklich aus der Tagesordnung entfernen?')) {
      store.update((q) => q.removeRecord(item)).then((data) => {
        this.actions = this.actions.filter((i) => item.id !== i.id)
      })
    }
  }

  Actions = []
  actions = []
  @Watch('meeting')
  onMeeting (val: Record, oldVal: Record) {
    store
      .query(q => q.findRelatedRecords(this.meeting, 'actions'), {
        label: 'Find all related Actions',
        sources: {
          remote: {
            include: ['top']
          }
        }
      })
      .then(data => (this.actions = data))
  }
  @Watch('Actions')
  onActions (val: Record[], oldVal: Record[]) {
    if (val.length === 0) return
    let top: Record
    for (let v of val) {
      if (v.type === 'top') {
        top = v
      }
    }
    store
      .update(t =>
        t.addRecord({
          relationships: {
            top: {
              data: top
            },
            meeting: {
              data: this.meeting
            }
          },
          type: 'action'
        })
      )
      .then(d => {
        store
          .query(q => q.findRelatedRecords(this.meeting, 'actions'), {
            label: 'Find all related Actions',
            sources: {
              remote: {
                include: ['top']
              }
            }
          })
          .then(data => {
            console.log(data)
            this.Actions = []
            this.actions = data
          })
      })
  }
  created () {
    store.query((q) => q.findRelatedRecords(this.meeting, 'actions')).then((data) => { this.actions = data })
  }
}
</script>