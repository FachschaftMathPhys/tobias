import template from './new.slim'
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  name: 'NewMeeting',
  mixins: [template],
  data: () => ({
    model: {title:"",description:"",date:"",begin:"",end:"",moderation:"", clerk:""}
  }),
  methods:{
    submit(){
      console.log(this.$store.getters);
      this.$store.dispatch('meetings/addMeeting', {...(this.model),
      organization:{id:this.$route.params.org_id}}).then(()=>
      this.$router.push({ name: 'organization', params: { org_id: this.$route.params.org_id }})
    )
    }
  },
  computed:{
    ...mapGetters({
      t: 'Top'
    })
  },
  created() {
  }
}