<style lang="scss" scoped>
</style>

<script>
import template from './show.slim'
import Top from "../../components/top.vue"
import Comment from "../../components/comment.vue"
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  name: 'Tops',
  mixins: [template],
  data: () => ({
    menuVisible: false
  }),
  components: {
    Top,Comment
  },
  computed:{
    ...mapGetters({
      t: 'Top'
    })
  },
  created() {
    this.$store.dispatch('getTop', {
      id: this.$route.params.top_id
    })
  }
}
</script>
