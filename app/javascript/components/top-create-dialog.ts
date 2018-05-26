
import template from './top-create-dialog.slim'
import {
  mapGetters,
  mapActions,
  mapState
} from 'vuex';
import Vue from 'vue';
import Component from 'vue-class-component';
const TopCreateDialogProps = Vue.extend({
  props: ['visible', 'mail', 'organization']
});
@Component({
  name: 'TopCreateDialog',
  mixins: [template]
})
export default class TopCreateDialog extends TopCreateDialogProps {
    top() {
      return {
        description: this.mail.body,
        title: this.mail.subject,
        submitter: this.mail.fromname,
        organization: this.organization
      }
  }
}