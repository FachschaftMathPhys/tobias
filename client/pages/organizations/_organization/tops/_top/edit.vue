<template lang="pug">
div(v-if="top")
  h1 TOP bearbeiten
  v-form(ref="form")
    v-text-field(label="Titel" v-model="top.title" required=true)
    v-textarea(label="Beschreibung" v-model="top.description")
    user-autocomplete(label="Autor" v-model="top.author" required=true)
    user-autocomplete(label="Einreichender" v-model="top.submitter" required=true)
    v-btn(@click="submit") Speichern
</template>
<script lang="ts">
// import Top from '../../components/top.vue'
// import Comment from '../../components/comment.vue'
import { mapFields } from 'vuex-map-fields'
import Vue from 'vue'
import Component from 'vue-class-component'
import UserAutocomplete from "~/components/user-autocomplete.vue"
import QUERY_TOP from "./query-top.gql"
import UPDATE_TOP from "./update-top.gql"
const TopEditProps = Vue.extend({
  components:{
    UserAutocomplete
  },
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
        title:this.top.title,
        description:this.top.description,
        submitter: this.top.submitter?this.top.submitter.id:null,
        submitted_at:this.top.submitted_at,
        author: this.top.author?this.top.author.id:null,
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
        data.top.title = updateTop.title
        data.top.description = updateTop.description
        data.top.submitted_at = updateTop.submitted_at
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