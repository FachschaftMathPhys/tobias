<style lang="scss" scoped>
</style>

<script>
import draggable from 'vuedraggable'
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
  components:{Top, Meeting,draggable},
  computed:{
    ...mapGetters({
      org: 'Organization'
    }),
    Tops: {
        get() {
            return this.org.tops
        },
        set(value) {
            this.$store.commit('updateTops', value)
        }
    }
  },
  created(){
    this.$store.dispatch('getOrganization',{
  id: this.$route.params.org_id
})
  }
}
</script>
