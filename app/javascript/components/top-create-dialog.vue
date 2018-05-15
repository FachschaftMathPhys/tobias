<style lang="scss" scoped>
</style>

<script>
import template from './top-create-dialog.slim'
import {
  mapGetters,
  mapActions,
  mapState
} from 'vuex'
export default {
  name: 'TopCreateDialog',
  props: ['visible', 'mail', 'organization'],
  mixins: [template],
  computed: {
    top() {
      return {
        description: this.mail.body,
        title: this.mail.subject,
        submitter: this.mail.fromname,
        organization: this.organization
      }
    }
  }
}
</script>
