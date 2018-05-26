import template from './meeting.slim'
import draggable from 'vuedraggable'
import Top from './top'
import Component from 'vue-class-component';
import Vue from 'vue';

const MeetingProps = Vue.extend({
  components: {
    draggable,
    Top
  },
  props: ['meeting', 'organizationview']
});

@Component({
  name:'Meeting',
  mixins: [template]
})
export default class Meeting extends MeetingProps {

    deleteAction(item) {
      if (confirm("Wirklich aus der Tagesordnung entfernen?")) {
        if (typeof this.$route.params.meeting_id != 'undefined') {
          this.$store.dispatch("meetings/removeAction", {
            action: item,
            meeting: this.meeting
          })
        } else {
          this.$store.dispatch("removeAction", {
            action: item,
            meeting: this.meeting
          })
        }
      }
    }

    get Actions() {
      return this.meeting.actions
    }
    set Actions (value) {
        let actions = [];
        let newactions = [];
        for (let v of value) {
          let m = v;
          if (v.type == "tops") {
            m = {
              top: v,
              meeting: this.meeting
            };
            newactions.push(m)
          } else
            actions.push(m);
        }
        this.$store.dispatch('updateActionsMeetings', {
          meeting: {
            ...this.meeting,
            organization: {
              type: "organizations",
              id: this.$route.params.org_id
            }
          },
          actions: actions,
          newactions: newactions
        })
      }
}
