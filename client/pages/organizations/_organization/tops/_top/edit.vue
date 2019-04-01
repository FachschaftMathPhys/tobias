<template lang="pug">
div(v-if="top")
  h1 TOP bearbeiten
  v-form(ref="form")
    v-text-field(label="Titel" v-model="top.title" required=true)
    v-textarea(label="Beschreibung" v-model="top.description")
    v-btn(@click="submit") Speichern
</template>
<script lang="ts">
// import Top from '../../components/top.vue'
// import Comment from '../../components/comment.vue'
import { mapFields } from 'vuex-map-fields'
import Vue from 'vue'
import Component from 'vue-class-component'
import QUERY_TOP from "./query-top.gql"
import UPDATE_TOP from "./update-top.gql"
const TopEditProps = Vue.extend({
  data(){
    return {
      tId: this.$route.params.top
    }
  },
   //@ts-ignore
  apollo: {
        top: { 
          query: QUERY_TOP,
        variables(){
          return {
            top: this.tId
          }
        }
      }
    }
})
@Component({
  name: 'EditTop'
})
export default class TopEdit extends TopEditProps {
  submit () {
    this.$apollo.mutate({
      mutation:UPDATE_TOP,
      variables:{
        ...this.top,
        top:this.$route.params.top
      },
      // Update the cache with the result
      // The query will be updated with the optimistic response
      // and then with the real result of the mutation
      update: (store, { data: { updateTop } }) => {
       // Read the data from our cache for this query.
        const data = store.readQuery({ query: QUERY_TOP, variables:{
          top:this.$route.params.top
        } })
        data.meeting.title = updateTop.title
        data.meeting.description = updateTop.description
        data.meeting.submitted_at = updateTop.submitted_at
        // Write our data back to the cache.
        store.writeQuery({ query: QUERY_TOP,variables:{
          meeting:this.$route.params.top
        } , data })
      }
    }).then(() => {
      //  zurück gehen
      this.$router.push({
        name: 'organizations-organization',
        params: {
          organization: this.$route.params.organization
        }
      })
    })
  }
  created () {
  }
}
</script>