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
  mixins: [template],
  computed: mapFields({description:"organization.description",title: "organization.title",meetinginvitationtemplate:"organization.meetinginvitationtemplate"})
})
@Component({

})
export default class OrganizationNew extends OrganizationNewProps{
    submit() {
      this.$store.dispatch('addOrg', {
        title: this.title,
        description: this.description,
        "meetinginvitationtemplate": this.meetinginvitationtemplate
      }).then(() => {
        //verknüpfen, falls meeting_id angegeben
        this.$router.push({
          name: 'organizations'
        })
      })
    }
}