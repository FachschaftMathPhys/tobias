<style lang="scss" scoped>
</style>

<script>
import template from './new.slim'
import Top from "../../components/top.vue"
import Comment from "../../components/comment.vue"
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  name: 'Tops',
  mixins: [template],
  data: () => ({
    model: {title:"",description:""}
  }),
  methods:{
    submit(){
      console.log(this.$store.getters);
      this.$store.dispatch('addTop', {...(this.model),
      organization:{id:this.$route.params.org_id}}).then(()=>{
      //verknüpfen, falls meeting_id angegeben
      if(this.$route.params.meeting_id){
        alert("Füge zu "+this.$route.params.meeting_id)
      }
      this.$router.push({ name: 'organization', params: { org_id: this.$route.params.org_id }})
    }
    )
    }
  },
  computed:{
    ...mapGetters({
      t: 'Top'
    })
  }
}
</script>
