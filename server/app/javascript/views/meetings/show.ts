import template from './show.slim'
import Top from "../../components/top"
import Meeting from "../../components/meeting"
import Comment from "../../components/comment"
import { mapGetters, mapActions, mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields';
export default {
  name: 'Meetings',
  mixins: [template],
  data: () => ({
    menuVisible: false,
    dialog: false,
    topdialog:false,
    linkdialog:false,
    title:"",
    content:"",
    description:"",
    select:"",
    items:[],
    loading: false,
    search: null
  }),
  components: {
    Top,Comment, Meeting
  },
  methods:{
    submitComment(){
      this.dialog= false;
      this.$store.dispatch('meetings/addComment',{
        title:this.title,
        content: this.content,
        commentable: this.m
      });
    },
    linkTop(){
      this.linkdialog=false;
      this.$store.dispatch('meetings/linkTOP',{
        top:this.select,meeting: this.m
      })
    },
    submitTOP(){
      this.topdialog= false;
      this.$store.dispatch('meetings/addTOP',{top:{
        title:this.title,
        description: this.description,
        organization: {id:this.$route.params.org_id}
      }, meeting:this.m});
    },
    querySelections (v) {
      this.loading = true
      // Simulated ajax query
      /*api.getTops({org_id:this.$route.org_id},(data)=>{
        this.items =data;
        this.loading=false;
      })*/
    }
  },
  watch:{
    search(val){
      val && this.querySelections(val)
    }
  },
  computed:{
    ...mapFields({
      m: 'meeting'
    })
  },
  created() {
    this.$store.dispatch('fetchOne', {
      model:"meeting",
      id: this.$route.params.meeting_id
    })
  }
}