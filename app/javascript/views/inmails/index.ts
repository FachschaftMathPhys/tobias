
import template from './index.slim'
import { mapGetters, mapActions, mapState } from 'vuex'
import {mapFields} from 'vuex-map-fields'
import Organization from "../../components/organization"
import TopCreateDialog from "../../components/top-create-dialog"
import draggable from "vuedraggable"
import Vue from "vue"
import Component from 'vue-class-component';

@Component({
  name: 'inmail',
  mixins: [template],
  components: { Organization, draggable, TopCreateDialog },
  computed: mapFields({
    inmails: 'inmails',
    orgs:"organizations"
  })
}
)
export default class Inmail extends Vue {
  dialog: boolean = true
  created() {
    this.$store.dispatch('fetchAllOf',"inmail");
    this.$store.dispatch('fetchAllOf',"organization");
  }
}
