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
      this.$store.dispatch('addOrg', {title:this.title,description:this.description,"meetinginvitationtemplate":this.meetinginvitationtemplate}).then(()=>{
      //verknüpfen, falls meeting_id angegeben
      this.$router.push({ name: 'organizations'})
    }
    )
    }
  },
  computed:{
    ...mapFields(["organization.description","organization.title","organization.meetinginvitationtemplate"])
  }
}
</script>
