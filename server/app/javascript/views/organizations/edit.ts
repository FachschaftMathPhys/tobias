
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
import { TransformBuilder } from '@orbit/data';
const EditProps = Vue.extend({
  name: 'EditOrganization',
  computed: mapFields({
    description: "organization.attributes.description",
    title: "organization.attributes.title", meetinginvitationtemplate: "organization.attributes.meetinginvitationtemplate"
  })
}
)
@Component({
  mixins: [template]
})
export default class EditOrganization extends EditProps {
  submit() {
    console.log(this);
    this.$store.dispatch('updating', {
      transformOrOperations: (t: TransformBuilder) => {
        return t.replaceRecord({
          attributes: {
            title: this.title,
            description: this.description,
            meetinginvitationtemplate: this.meetinginvitationtemplate,
          },
          type: "organization",
          id: this.$route.params.org_id
        })
      },
      thenable:({commit},data)=>{
        commit('set',{data,model:'organization'})
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
  created() {
    this.$store.dispatch('fetchOne', {
      model:"organization",
      id: this.$route.params.org_id
    })
  }
}
