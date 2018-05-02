<style lang="scss" scoped>
</style>

<script>
import template from './edit.slim'
import {
  mapGetters,
  mapActions,
  mapState
} from 'vuex'
import { createHelpers } from 'vuex-map-fields';

// `fooModule` is the name of the Vuex module.
const { mapFields } = createHelpers({
  getterType: 'meetings/getField',
  mutationType: 'meetings/updateField',
});
export default {
  name: 'EditMeeting',
  mixins: [template],
  methods: {
    submit() {
      console.log(this)
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
  },
  computed: {
    ...mapFields(["meeting.description", "meeting.title", "meeting.date", "meeting.begin", "meeting.end", "meeting.moderation", "meeting.clerk"])
  },
  created() {
    this.$store.dispatch('meetings/getMeeting', {
      id: this.$route.params.meeting_id
    })
  }
}
</script>
