import template from './new.slim'
import { mapGetters, mapActions, mapState } from 'vuex'
import Vue from 'vue';
import Component from 'vue-class-component';
const NewMeetingProps = Vue.extend(
  {
    name: 'NewMeeting',
    mixins: [template]
  }
)
@Component
export default class NewMeeting extends NewMeetingProps {
  model = { title: "", description: "", date: "", begin: "", end: "", moderation: "", clerk: "" }
  submit() {
    console.log(this.$store.getters);
    this.$store.dispatch('create', {
      type: "meeting",
      attributes: this.model,
      relationships: {
        organization: {
          data: {
            type: "organization",
            id: this.$route.params.org_id
          }
        }
      }
    }).then(() =>
      this.$router.push({ name: 'organization', params: { org_id: this.$route.params.org_id } })
    )
  }
  created() {
  }
}