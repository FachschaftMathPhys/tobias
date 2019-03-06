<template lang="pug">
div
  v-card
    v-card-title
      h3.headline {{meeting.attributes.title}}
        .right.grey-text @{{meeting.attributes.moderation}}
    v-card-text {{meeting.attributes.description}}
      h4 TOPS
      v-expansion-panel(v-if="meeting.relationships")
        draggable(v-model='Actions' :options='{group:"tops"}' style="width:100%")
          div(v-for="action in actions" :key="action.id")
            Action(:action="action" @deleteAction="da")
          v-btn(slot="footer" flat=true) Ziehe TOPs hierhin...
    v-card-actions
      v-btn(color="accent" flat=true :to='{name:"organizations-organization-meetings-meeting",params:{meeting:meeting.id,organization:$route.params.organization}}')
        span Anschauen
      v-btn(color="secondary" flat=true  icon=true :to='{name:"organizations-organization-meetings-meeting-edit",params:{meeting:meeting.id,organization:meeting.relationships.organization.data.id}}')
        v-icon edit
      v-btn(color="secondary" flat=true  icon=true @click.native.stop="removeMeeting(meeting)")
        v-icon delete
</template>
<script lang="ts">
import draggable from "vuedraggable";
import Action from "./action.vue";
import Component from "nuxt-class-component";
import { Watch } from "nuxt-property-decorator";
import Vue from "vue";
//import store from '../store/api'
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
      //TODO: Umstellen
      this.$store.dispatch("updating", {
        transformOrOperations: (t: TransformBuilder) => {
          return t.removeRecord(meeting);
        },
        thenable: ({ commit }: { commit: Commit }) => {
          commit("remove", { data: meeting, model: meeting.type });
        }
      });
      // this.$store.dispatch('delete', top)
    }
  }
  mounted() {
    this.$store.dispatch("query", {
      query: (q: QueryBuilder) => q.findRelatedRecords(this.meeting, "actions"),
      setField: "actions"
    });
  }
}
</script>