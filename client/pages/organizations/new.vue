<template lang="pug">
div
  h1 Organisation erstellen
  v-form(ref="form")
    v-text-field(label="Titel" v-model="title" required=true)
    v-textarea(label="Beschreibung" v-model="description")
    v-textarea(label="Einladungstemplate" v-model="meetinginvitationtemplate")
    v-btn(@click="submit") submit
</template>
<script lang="ts">
import Vue from "vue";
import Component from "nuxt-class-component";
import { TransformBuilder } from "@orbit/data";


import gql from 'graphql-tag'
import CREATE_ORGANIZATION from './create-organization.gql'
const OrganizationNewProps = Vue.extend({
  name: "Organization"
});
@Component({})
export default class OrganizationNew extends OrganizationNewProps {
  description: string = "";
  title: string = "";
  meetinginvitationtemplate: string = "";
  submit () {
    this.$apollo.mutate({
      mutation:CREATE_ORGANIZATION,
      variables:{
        title:this.title,
        description: this.description
      },
      // Update the cache with the result
      // The query will be updated with the optimistic response
      // and then with the real result of the mutation
      update: (store, { data: { createOrganization } }) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: gql`{
        organizations {
          title
          description,
          id
        }
      }`})
        // Add our tag from the mutation to the end
        data.organizations.push(createOrganization)
        // Write our data back to the cache.
        store.writeQuery({ query:  gql`{
        organizations {
          title
          description,
          id
        }
      }`,  data })
      },
    })
      .then(() =>
        this.$router.push({
          name: 'organizations'
        })
      )
  }
}
</script>