<style lang="scss" scoped>
</style>

<script>
import template from './top.slim'
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  name: 'Top',
  props:['top'],
  mixins: [template],
  computed:{
    ...mapGetters({
      org: 'Organization'
    })
  },
  created(){
  }
}
</script>
