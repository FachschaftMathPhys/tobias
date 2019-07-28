<template lang="pug">
div
  h1 TOP anlegen
  v-form(ref="form")
    v-text-field(label="Titel" v-model="model.title" required=true)
    v-textarea(label="Beschreibung" v-model="model.description")
    v-btn(@click="submit") submit
</template>
<script lang="ts">
// import Top from '../../components/top.vue'
// import Comment from '../../components/comment.vue'
import {mapFields} from 'vuex-map-fields'
import Vue from 'vue'
import Component from 'vue-class-component'
import CREATE_TOP from "./create-top.gql"
import QUERY_ORGANIZATION from "../query-organization.gql"
const TopNewProps = Vue.extend({
  computed: mapFields({
    t: 'top'
  })
})
@Component({
  name: 'Tops'
})
export default class TopNew extends TopNewProps {
    model= {
      title: '',
      description: ''
    }
    submit () {
      this.$apollo.mutate({
      mutation:CREATE_TOP,
      variables:{
        ...this.model,
        organization:this.$route.params.organization
      },
      // Update the cache with the result
      // The query will be updated with the optimistic response
      // and then with the real result of the mutation
      update: (store, { data: { createTop } }) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: QUERY_ORGANIZATION, variables:{
          organization:this.$route.params.organization
        } })
        // Add our tag from the mutation to the end
        data.organization.tops.push(createTop)
        // Write our data back to the cache.
        store.writeQuery({ query: QUERY_ORGANIZATION,variables:{
          organization:this.$route.params.organization
        } , data })
      },
    }).then(() => {
        // verknüpfen, falls meeting angegeben
        if (this.$route.params.meeting) {
          alert('Füge zu ' + this.$route.params.meeting)
        }
        // zurück gehen
        this.$router.push({
          name: 'organizations-organization',
          params: {
            organization: this.$route.params.organization
          }
        })
      })
    }
}
</script>