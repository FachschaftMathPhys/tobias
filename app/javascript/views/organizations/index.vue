<style lang="scss" scoped>
</style>

<script>
import template from './index.slim'
import App from '../application.vue'
export default {
  name: 'Organizations',
  props:["organizations"],
  mixins: [template],
  data: () => ({
    menuVisible: false,
    rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      }
  }),
  components:{App}
}
</script>
