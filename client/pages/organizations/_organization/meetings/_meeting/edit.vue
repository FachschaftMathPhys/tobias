<template lang="pug">
div
  h1 Sitzung 
  v-form
    v-text-field(label="Titel" v-model="meeting.title" required=true)
    v-textarea(label="Beschreibung" v-model="meeting.description")
    v-date-picker(label="Datum" v-model="meeting.date" landscape=true full-width=true)
    v-text-field(label="Moderation" v-model="meeting.moderation" required=true)
    v-text-field(label="Protokollant" v-model="meeting.clerk" required=true)
    v-btn(@click="submit") submit
</template>
<script lang="ts">
import { mapFields } from 'vuex-map-fields'
import {Commit} from 'vuex'
import Vue from 'vue'
import Component from 'vue-class-component'
import { TransformBuilder, Record } from '@orbit/data'
import QUERY_MEETING from "./query-meeting.gql"
import UPDATE_MEETING from "./update-meeting.gql"
const EditProps = Vue.extend({
  name: 'EditMeeting',
  data(){
    return {
      mId:this.$route.params.meeting
    }
  },
  //@ts-ignore
  apollo: {
        meeting: { 
          query: QUERY_MEETING,
        variables(){
          return {
            meeting: this.mId
          }
        }
      }
    }
})

@Component({})
export default class EditMeeting extends EditProps {
  submit () {
    this.$apollo.mutate({
      mutation:UPDATE_MEETING,
      variables:{
        ...this.meeting,
        meeting:this.$route.params.meeting
      },
      // Update the cache with the result
      // The query will be updated with the optimistic response
      // and then with the real result of the mutation
      update: (store, { data: { updateMeeting } }) => {
       // Read the data from our cache for this query.
        const data = store.readQuery({ query: QUERY_MEETING, variables:{
          meeting:this.$route.params.meeting
        } })
        data.meeting.title = updateMeeting.title
        data.meeting.description = updateMeeting.description
        data.meeting.date = updateMeeting.date
        console.log(data)
        // Write our data back to the cache.
        store.writeQuery({ query: QUERY_MEETING,variables:{
          meeting:this.$route.params.meeting
        } , data })
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateMeeting: {
          __typename: 'Meeting',
          ...this.meeting,
          id:this.$route.params.meeting
        },
      },
    })
      .then(() => {
        this.$router.push({
          name: 'organizations-organization-meetings-meeting',
          params: {
            organization: this.$route.params.organization,
            meeting: this.$route.params.meeting
          }
        })
      })
  }
  created () {
  }
}
</script>
