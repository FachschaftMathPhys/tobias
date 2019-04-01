<template lang="pug">
div
  v-card
    v-card-title
      h3.headline {{meeting.title}}
        .right.grey-text @{{meeting.moderation}}
    v-card-text {{meeting.description}}
      h4 TOPS
      v-expansion-panel
        draggable(v-model='Actions' :options='{group:"tops"}' style="width:100%")
          div(v-for="action in actions" :key="action.id")
            Action(:action="action" @deleteAction="da")
          v-btn(slot="footer" flat=true) Ziehe TOPs hierhin...
    v-card-actions
      v-btn(color="accent" flat=true :to='{name:"organizations-organization-meetings-meeting",params:{meeting:meeting.id,organization:$route.params.organization}}')
        span Anschauen
      v-btn(color="secondary" flat=true  icon=true :to='{name:"organizations-organization-meetings-meeting-edit",params:{meeting:meeting.id,organization:meeting.organization.id}}')
        v-icon edit
      v-btn(color="secondary" flat=true  icon=true @click.native.stop="removeMeeting(meeting)")
        v-icon delete
</template>
<script lang="ts">
import draggable from "vuedraggable";
import Action from "./action.vue";
import gql from "graphql-tag"
import Component from "nuxt-class-component";
import { Watch } from "nuxt-property-decorator";
import Vue from "vue";
//import store from '../store/api'

import QUERY_ORGANIZATION from "./query-organization.gql"
import { Record, TransformBuilder, QueryBuilder } from "@orbit/data";

import { Commit } from "vuex";

const MeetingProps = Vue.extend({
  components: {
    draggable,
    Action
  },
  methods: {},
  props: ["meeting", "organizationview"]
});

@Component({
  name: "Meeting"
})
export default class Meeting extends MeetingProps {
  da(item: Record) {
    if (confirm("Wirklich aus der Tagesordnung entfernen?")) {
      this.$store.dispatch("update", {
        update: (q:TransformBuilder) => q.removeRecord(item),
        queryParam: {
          query: (q:QueryBuilder) => q.findRelatedRecords(this.meeting, "actions"),
          setField: "actions"
        }
      });
    }
  }

  Actions = [];
  actions: Record[] = [];
  @Watch("meeting")
  onMeeting(val: Record, oldVal: Record) {
    console.log(val);
    console.log(oldVal);
    this.$store.dispatch("query", {
      query: (q:QueryBuilder)=> q.findRelatedRecords(this.meeting, "actions"),
      setField: "actions"
    });
  }
  @Watch("Actions")
  onActions(val: Record[]) {
    if (val.length === 0) return;
    let top: Record;
    for (let v of val) {
      if (v.type === "top") {
        top = v;
      }
    }
    this.$store.dispatch("api.update", {
      update: (t: TransformBuilder) =>
        //@ts-ignore
        t.addRecord({
          relationships: {
            top: {
              data: top
            },
            meeting: {
              data: this.meeting
            }
          },
          type: "action"
        }),
      queryParam: {
        query: (q:QueryBuilder) => q.findRelatedRecords(this.meeting, "actions"),
        setField: "actions"
      }
    });
  }
  removeMeeting(meeting: Record) {
    if (confirm("Willst du wirklich dieses Treffen entfernen?")) {
      this.$apollo.mutate({
        mutation: gql`
        mutation($meeting:ID!){
          deleteMeeting(meeting:$meeting)
        }`,
        variables:{
          meeting:this.meeting.id
        },
        update: (store, { data: { deleteMeeting } }) => {
       // Read the data from our cache for this query.
       let orgId = this.meeting.organization.id
        const data = store.readQuery({ query: QUERY_ORGANIZATION, variables:{
          organization:orgId
        } })
        data.organization.meetings = data.organization.meetings.filter((item)=>!(item.id==this.meeting.id))
        // Write our data back to the cache.
        store.writeQuery({ query: QUERY_ORGANIZATION,variables:{
          organization:orgId
        } , data })
      },
      })
    }
  }
  mounted() {
  }
}
</script>