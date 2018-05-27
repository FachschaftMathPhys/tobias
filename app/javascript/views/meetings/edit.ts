
import template from './edit.slim'
import {
  mapGetters,
  mapActions,
  mapState
} from 'vuex'
import {  mapFields } from 'vuex-map-fields';
import Vue from 'vue';
import Component from 'vue-class-component';
import { TransformBuilder } from '@orbit/data';



const EditProps = Vue.extend({
  computed:
  mapFields({description:"meeting.attributes.description",
  title: "meeting.attributes.title", date: "meeting.attributes.date",begin: "meeting.attributes.begin",end: "meeting.attributes.end", moderation:"meeting.attributes.moderation", clerk:"meeting.attributes.clerk"})
})

@Component(
  {
    mixins: [template]
  }
)
export default class EditMeeting extends EditProps{
  name: 'EditMeeting';
  submit() {
      this.$store.dispatch('updating',{transformOrOperations:(t:TransformBuilder)=>{
        return t.replaceRecord({
          attributes:{
            title: this.title,
        description: this.description,
        date: this.date,
        begin: this.begin,
        end: this.end,
        moderation: this.moderation,
        clerk: this.clerk,
          },
          id: this.$route.params.meeting_id,
          type:"meeting"
        })
      },thenable:({commit},data)=>{
        commit('set', { data, model: data.type })
      }
      }).then(() => {
        this.$router.push({
          name: 'meeting',
          params: {
            org_id: this.$route.params.org_id,
            meeting_id: this.$route.params.meeting_id
          }
        })
      })
    }
  created() {
    this.$store.dispatch('fetchOne', {
      model:"meeting",
      id: this.$route.params.meeting_id
    })
  }
}