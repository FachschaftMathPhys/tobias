
import template from './show.slim'
import Top from "../../components/top"
import Comment from "../../components/comment"
import { mapGetters, mapActions, mapState } from 'vuex'
import Vue from 'vue'
import Component from 'vue-class-component';
import { mapFields } from 'vuex-map-fields';
const TopShowProps = Vue.extend({
  components: {
    Top, Comment
  },
  computed: {
    ...mapFields({
      t: 'top',
      comments:'comments'
    })
  },
})
@Component({
  name: 'TopShow',
  mixins: [template]
})
export default class TopShow extends TopShowProps {
  menuVisible: false
  created() {
    this.$store.dispatch('fetchOne', { model: "top", id: this.$route.params.top_id })
    this.$store.dispatch('fetchAllRelatedOf', {data:{
      type: 'top',
      id: this.$route.params.top_id
    },relationship:"comments"
    });
  }
}