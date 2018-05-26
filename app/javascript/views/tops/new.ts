
import template from './new.slim'
import Top from "../../components/top"
import Comment from "../../components/comment"
import {
  mapGetters,
  mapActions,
  mapState
} from 'vuex'
import Vue from 'vue'
import Component from 'vue-class-component';
const TopNewProps = Vue.extend({
  computed:mapGetters({
    t: 'Top'
  })
})
@Component({
  name:'Tops',
  mixins: [template]
})
export default class TopNew extends TopNewProps {
    model: {
      title: "",
      description: ""
    }
    submit() {
      this.$store.dispatch('addTop', {
        attributes: this.model,
        relationships: {
          organization: {
            data:{
            type: "organization",
            id: this.$route.params.org_id
          }
        }
        }
      }).then(() => {
        //verknüpfen, falls meeting_id angegeben
        if (this.$route.params.meeting_id) {
          alert("Füge zu " + this.$route.params.meeting_id)
        }
        this.$router.push({
          name: 'organization',
          params: {
            org_id: this.$route.params.org_id
          }
        })
      })
    }
}