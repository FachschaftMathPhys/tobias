
import template from './edit.slim'
import Top from "../../components/top"
import Comment from "../../components/comment"
import {
  mapGetters,
  mapActions,
  mapState
} from 'vuex'
import {mapFields} from 'vuex-map-fields'
import Vue from 'vue'
import Component from 'vue-class-component';
const TopEditProps = Vue.extend({
  computed:mapFields({
    t: 'top',
    title:'top.attributes.title',
    description: 'top.attributes.description'
  })
})
@Component({
  name:'EditTop',
  mixins: [template]
})
export default class TopEdit extends TopEditProps {
    submit() {
      this.$store.dispatch('update', this.t).then(() => {
        //zurück gehen
        this.$router.push({
          name: 'organization',
          params: {
            org_id: this.$route.params.org_id
          }
        })
      })
    }
    created(){
      this.$store.dispatch('fetchOne', { model: "top", id: this.$route.params.top_id })
    }
}