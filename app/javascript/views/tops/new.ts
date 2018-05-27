
import template from './new.slim'
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
const TopNewProps = Vue.extend({
  computed:mapFields({
    t: 'top'
  })
})
@Component({
  name:'Tops',
  mixins: [template]
})
export default class TopNew extends TopNewProps {
    model= {
      title: "",
      description:""
    }
    submit() {
      this.$store.dispatch('create', {
        type:"top",
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
        //zurück gehen
        this.$router.push({
          name: 'organization',
          params: {
            org_id: this.$route.params.org_id
          }
        })
      })
    }
}