<style lang="scss" scoped>
</style>

<script>
import template from './show.slim'
import App from '../application.vue'
export default {
  name: 'Organizations',
  mixins: [template],
  data: () => ({
    menuVisible: false
  }),
  components:{App}
}
</script>
