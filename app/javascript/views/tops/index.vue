<style lang="scss" scoped>
</style>

<script>
import template from './index.slim'
import App from '../application.vue'
export default {
  name: 'Organizations',
  props:['organizations'],
  mixins: [template],
  data: () => ({
    menuVisible: false
  }),
  components:{App}
}
</script>
