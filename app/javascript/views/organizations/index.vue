<style lang="scss" scoped>
</style>

<script>
import template from './index.slim'
console.log(template);
import App from '../application.vue'
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  name: 'orgs',
  mixins: [template],
  data: () => ({
    menuVisible: false,
    rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      }
  }),
  computed: {...mapGetters({
    orgs: 'allOrganizations'
  }),
  allOrgs:{cache:false,get () {
   return this.$store.getters.allOrganizations
 }}
},
  components:{App},
  created () {
    this.$store.dispatch('getAllOrganizations')
  }
}
</script>
