import template from './meeting.slim'
import draggable from 'vuedraggable'
import Top from './top'
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator'
import Vue from 'vue';
import store from '../api/index'
import { Record, QueryBuilder } from '@orbit/data';

const MeetingProps = Vue.extend({
  components: {
    draggable,
    Top
  },
  props: ['meeting', 'organizationview']
});

@Component({
  name: 'Meeting',
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

  Actions = []
  actions = []
  @Watch("meeting")
  onMeeting(val:Record,oldVal:Record){
    store.query(q=>q.findRelatedRecords(this.meeting,"actions"),{
      label: 'Find all related Actions',
      sources: {
        remote: {
          include: ['top']
        }
      }
    }).then(data=>this.actions= data)
  }
  @Watch('Actions', { deep: true })
  onActions(val: Record[], oldVal: Record[]) {
    let top: Record;
    for (let v of val) {
      if (v.type == "top") {
        top = v;
      }
    }
    store.update(t => t.addRecord({
      relationships: {
        top: {
          data: top
        },
        meeting: {
          data: this.meeting
        }
      },
      type:"action"
    })).then(d => {
      store.query(q => q.findRelatedRecords(this.meeting, "actions"), {
        label: 'Find all related Actions',
        sources: {
          remote: {
            include: ['top']
          }
        }
      }).then((data) => {
        console.log(data);
        this.actions = data;
      })
    });
  }
  created(){
  }
}
