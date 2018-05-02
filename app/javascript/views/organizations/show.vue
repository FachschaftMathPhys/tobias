<style lang="scss" scoped>
</style>

<script>
import template from './show.slim'
import { mapGetters, mapActions, mapState } from 'vuex'
import App from '../application.vue'
import Top from '../../components/top.vue'
import Meeting from '../../components/meeting.vue'
export default {
  name: 'Organization',
  mixins: [template],
  data: () => ({
    menuVisible: false
  }),
  components:{Top, Meeting},
  computed:{
    ...mapGetters({
      org: 'Organization'
    })
  },
  created(){
    this.$store.dispatch('getOrganization',{
  id: this.$route.params.org_id
})
  }
}
</script>
