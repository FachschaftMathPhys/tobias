
<template lang="pug">
div
  h1 Sitzung anlegen
  v-form(ref="form")
    v-text-field(label="Titel" v-model="model.title" required=true)
    v-textarea(label="Beschreibung" v-model="model.description")
    div
      v-date-picker(label="Datum" v-model="model.date" landscape=true full-width=true)
    v-text-field(label="Moderation" v-model="model.moderation" required=true)
    v-text-field(label="Protokollant" v-model="model.clerk" required=true)
    v-btn(@click="submit") submit
</template>
<script lang="ts">
import Vue from 'vue'

import Component from 'nuxt-class-component'
import VueRouter, { Route } from 'vue-router'
interface WithRouteAndRouter /* can also extend Vue to make sure nothing is colliding */ {
  $route: Route,
  $router: VueRouter
}

const NewMeetingProps = Vue.extend({
  name: 'NewMeeting'
})
@Component
export default class NewMeeting extends NewMeetingProps implements WithRouteAndRouter {
  model = {
    title: '',
    description: '',
    date: '',
    begin: '',
    end: '',
    moderation: '',
    clerk: ''
  }
  submit () {
    this.$store
      .dispatch('create', {
        type: 'meeting',
        attributes: this.model,
        relationships: {
          organization: {
            data: {
              type: 'organization',
              id: this.$route.params.organization
            }
          }
        }
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