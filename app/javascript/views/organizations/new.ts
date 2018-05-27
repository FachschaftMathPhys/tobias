import template from './new.slim'
import {
  mapGetters,
  mapActions,
  mapState
} from 'vuex'
import {
  mapFields
} from 'vuex-map-fields';
import Vue from 'vue';
import Component from 'vue-class-component';

const OrganizationNewProps = Vue.extend({
  name: 'Organization',
  mixins: [template]
})
@Component({

})
export default class OrganizationNew extends OrganizationNewProps{
  description:string=""
  title:string=""
  meetinginvitationtemplate:string=""
    submit() {
      this.$store.dispatch('create', {
        type: "organization",
        attributes: {
          description: this.description,
          title:this.title,
          meetinginvitationtemplate: this.meetinginvitationtemplate
        }
      }).then(() => {
        //verknüpfen, falls meeting_id angegeben
        this.$router.push({
          name: 'organizations'
        })
      })
    }
}