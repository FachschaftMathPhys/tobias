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
import Vue from 'vue'
import Component from 'nuxt-class-component'

const OrganizationNewProps = Vue.extend({
  name: 'Organization'
})
@Component({})
export default class OrganizationNew extends OrganizationNewProps {
  description: string = ''
  title: string = ''
  meetinginvitationtemplate: string = ''
  submit () {
    this.$store
      .dispatch('create', {
        type: 'organization',
        attributes: {
          description: this.description,
          title: this.title,
          meetinginvitationtemplate: this.meetinginvitationtemplate
        }
      })
      .then(() => {
        // verknüpfen, falls meeting angegeben
        this.$router.push({
          name: 'organizations'
        })
      })
  }
}
</script>