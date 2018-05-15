<style lang="scss" scoped>
</style>

<script>
import template from './organization.slim'
import draggable from 'vuedraggable'
import Top from './top.vue'
import TopCreateDialog from './top-create-dialog.vue'
export default {
  name: 'Organization',
  components: {
    draggable,
    Top,
    TopCreateDialog
  },
  props: ['organization' ],
  mixins: [template],
  methods: {
    save(top){
      this.$store.dispatch('addTop', top).then(()=>{
      this.dialog=false;
    });
    },
    deleteTop(item) {
      if (confirm("Wirklich diesen TOP entfernen? (TODO: implementieren)")) {
          this.$store.dispatch("removeTop", {
            top: item,
            organization: this.organization
          })
      }
    }
  },
  data:()=> {
    return {
      dialog:false,
      mail:{
        subject:"",
        header:"",
        fromname:""
      }
    }
  },
  computed: {
    Tops: {
      get() {
        return this.organization.tops
      },
      set(value) {
        let tops = [];
        let inmails = [];
        for (let v of value) {
          let m = v;
          if (v.type == "tops") {
            tops.push(m)
          } else{
            inmails.push(m);
            this.dialog =true;
            this.mail = m;
          }
        }
        console.log(this.dialog);
        console.log(inmails);
        //this.$store.commit('updateTops', value)
      }
    }
  }
}
</script>
