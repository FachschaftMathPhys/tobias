
import template from './edit.slim'
import {
  mapGetters,
  mapActions,
  mapState
} from 'vuex'
import { createHelpers } from 'vuex-map-fields';
import Vue from 'vue';
import Component from 'vue-class-component';

// `fooModule` is the name of the Vuex module.
const { mapFields } = createHelpers({
  getterType: 'meetings/getField',
  mutationType: 'meetings/updateField',
});
interface meeting{
  title: String
  description:String
  date: String,
  begin: String,
  end: String,
  moderation:String
  clerk:String
}
const EditProps = Vue.extend({
  computed:
  mapFields({description:"meeting.description",
  title: "meeting.title", date: "meeting.date",begin: "meeting.begin",end: "meeting.end", moderation:"meeting.moderation", clerk:"meeting.clerk"})
})

@Component(
  {
    mixins: [template]
  }
)
export default class EditMeeting extends EditProps{
  name: 'EditMeeting';
  submit() {
      this.$store.dispatch('meetings/updateMeeting', {
        title: this.title,
        description: this.description,
        date: this.date,
        begin: this.begin,
        end: this.end,
        moderation: this.moderation,
        clerk: this.clerk,
        id: this.$route.params.meeting_id
      }).then(() => {
        this.$router.push({
          name: 'meeting',
          params: {
            org_id: this.$route.params.org_id,
            meeting_id: this.$route.params.meeting_id
          }
        })
      })
    }
  created() {
    this.$store.dispatch('meetings/getMeeting', {
      id: this.$route.params.meeting_id
    })
  }
}