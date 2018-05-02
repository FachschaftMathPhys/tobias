<style lang="scss" scoped>
</style>

<script>
import template from './new.slim'
import { mapGetters, mapActions, mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'Organization',
  mixins: [template],
  methods:{
    submit(){
      console.log(this.$store.getters);
      console.log(this);
      this.$store.dispatch('addOrg', {title:this.title,description:this.description}).then(()=>{
      //verknüpfen, falls meeting_id angegeben
      this.$router.push({ name: 'organizations'})
    }
    )
    }
  },
  computed:{
    ...mapFields(["organization.description","organization.title"])
  }
}
</script>
