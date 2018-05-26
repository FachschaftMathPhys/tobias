
import template from './edit.slim'
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
const EditProps = Vue.extend({
  name: 'EditOrganization',
  computed: mapFields({
    description: "organization.description",
    title: "organization.title", meetinginvitationtemplate: "organization.meetinginvitationtemplate"
  })
}
)
@Component({
  mixins: [template]
})
export default class EditOrganization extends EditProps {
  submit() {
    console.log(this);
    this.$store.dispatch('updateOrg', {
      title: this.title,
      description: this.description,
      meetinginvitationtemplate: this.meetinginvitationtemplate,
      id: this.$route.params.org_id
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
  created() {
    this.$store.dispatch('getOrganization', {
      id: this.$route.params.org_id
    })
  }
}
