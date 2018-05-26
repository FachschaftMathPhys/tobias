
import template from './show.slim'
import Top from "../../components/top"
import Comment from "../../components/comment"
import { mapGetters, mapActions, mapState } from 'vuex'
import Vue from 'vue'
import Component from 'vue-class-component';
const TopShowProps = Vue.extend({
  components: {
    Top,Comment
  },
  computed:{
    ...mapGetters({
      t: 'Top'
    })
  },
})
@Component({
  name:'TopShow',
  mixins: [template]
})
export default class TopShow extends TopShowProps {
  menuVisible: false
  created() {
    this.$store.dispatch('getTop', {
      id: this.$route.params.top_id
    })
  }
}