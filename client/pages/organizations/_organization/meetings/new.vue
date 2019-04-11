
<template lang="pug">
div
  h1 Sitzung anlegen
  v-form(ref="form")
    v-text-field(label="Titel" v-model="model.title" required=true)
    v-textarea(label="Beschreibung" v-model="model.description")
    div
      v-date-picker(label="Datum" v-model="model.date" landscape=true full-width=true)
    user-autocomplete(label="Moderation" v-model="model.moderation" required=true)
    user-autocomplete(label="Protokollant" v-model="model.clerk" required=true)
    v-btn(@click="submit") submit
</template>
<script lang="ts">
import Vue from 'vue'

import qgl from "graphql-tag"
import Component from 'nuxt-class-component'
import VueRouter, { Route } from 'vue-router'
import UserAutocomplete from "~/components/user-autocomplete"
import QUERY_ORGANIZATION from '../query-organization.gql'
import CREATE_MEETING from './create-meeting.gql'
interface WithRouteAndRouter /* can also extend Vue to make sure nothing is colliding */ {
  $route: Route,
  $router: VueRouter
}

const NewMeetingProps = Vue.extend({
  name: 'NewMeeting',
  components:{
    UserAutocomplete
  }
})
@Component
export default class NewMeeting extends NewMeetingProps implements WithRouteAndRouter {
  model = {
    title: '',
    description: '',
    date: null,
    begin: null,
    end: null,
    moderation: '',
    clerk: ''
  }
  submit () {
    this.$apollo.mutate({
      mutation:CREATE_MEETING,
      variables:{
        ...this.model,
        organization:this.$route.params.organization
      },
      // Update the cache with the result
      // The query will be updated with the optimistic response
      // and then with the real result of the mutation
      update: (store, { data: { createMeeting } }) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: QUERY_ORGANIZATION, variables:{
          organization:this.$route.params.organization
        } })
        // Add our tag from the mutation to the end
        data.organization.meetings.push(createMeeting)
        // Write our data back to the cache.
        store.writeQuery({ query: QUERY_ORGANIZATION,variables:{
          organization:this.$route.params.organization
        } , data })
      },
    })
      .then(() =>
        this.$router.push({
          name: 'organizations-organization',
          params: { organization: this.$route.params.organization }
        })
      )
  }
  created () {}
}
</script>