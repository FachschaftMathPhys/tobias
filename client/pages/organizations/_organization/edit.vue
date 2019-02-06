<template lang="pug">
div
  h1 Organisationen bearbeiten
  v-form(ref="form")
    v-text-field(label="Titel" v-model="title" required=true)
    v-textarea(label="Beschreibung" v-model="description")
    v-textarea(label="Einladungstemplate" v-model="meetinginvitationtemplate")
    v-btn(@click="submit") submit
</template>
<script lang="ts">
import { mapFields, Commit } from 'vuex-map-fields'
import Vue from 'vue'
import Component from 'vue-class-component'
import {Record} from '@orbit/data'
import { TransformBuilder } from '@orbit/data'
const EditProps = Vue.extend({
  name: 'EditOrganization',
  computed: mapFields({
    description: 'organization.attributes.description',
    title: 'organization.attributes.title',
    meetinginvitationtemplate:
      'organization.attributes.meetinginvitationtemplate'
  })
})
@Component({})
export default class EditOrganization extends EditProps {
  submit () {
    console.log(this)
    this.$store
      .dispatch('updating', {
        transformOrOperations: (t: TransformBuilder) => {
          return t.replaceRecord({
            attributes: {
              title: this.title,
              description: this.description,
              meetinginvitationtemplate: this.meetinginvitationtemplate
            },
            type: 'organization',
            id: this.$route.params.organization
          })
        },
        thenable: ({ commit }:{commit:Commit}, data:Record) => {
          commit('set', { data, model: 'organization' })
        }
      })
      .then(() => {
        // verknüpfen, falls meeting angegeben
        if (this.$route.params.meeting) {
          alert('Füge zu ' + this.$route.params.meeting)
        }
        this.$router.push({
          name: 'organization',
          params: {
            organization: this.$route.params.organization
          }
        })
      })
  }
  created () {
    this.$store.dispatch('fetchOne', {
      model: 'organization',
      id: this.$route.params.organization
    })
  }
}
</script>