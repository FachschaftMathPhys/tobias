<style lang="scss" scoped>
</style>

<script>
import template from './index.slim'
import { mapGetters, mapActions, mapState } from 'vuex'
import Organization from "../../components/organization.vue"
import TopCreateDialog from "../../components/top-create-dialog.vue"
import draggable from "vuedraggable"
export default {
  name: 'inmail',
  mixins: [template],
  data: () => {
    return {
      dialog:true
    }
  },
  computed: {...mapGetters({
    inmails: 'inmails/allInmails',
    orgs:"allOrganizations"
  })
},
  components:{Organization,draggable,TopCreateDialog},
  created () {
    this.$store.dispatch('inmails/getInmails');
    this.$store.dispatch('getAllOrganizations');
  }
}
</script>
