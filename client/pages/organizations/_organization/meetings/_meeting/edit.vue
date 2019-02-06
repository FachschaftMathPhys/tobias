<template lang="pug">
div
  h1 Sitzung 
  v-form
    v-text-field(label="Titel" v-model="title" required=true)
    v-textarea(label="Beschreibung" v-model="description")
    v-date-picker(label="Datum" v-model="date" landscape=true full-width=true)
    v-text-field(label="Moderation" v-model="moderation" required=true)
    v-text-field(label="Protokollant" v-model="clerk" required=true)
    v-btn(@click="submit") submit
</template>
<script lang="ts">
import { mapFields } from 'vuex-map-fields'
import {Commit} from 'vuex'
import Vue from 'vue'
import Component from 'vue-class-component'
import { TransformBuilder, Record } from '@orbit/data'

const EditProps = Vue.extend({
  name: 'EditMeeting',
  computed: mapFields({
    description: 'meeting.attributes.description',
    title: 'meeting.attributes.title',
    date: 'meeting.attributes.date',
    begin: 'meeting.attributes.begin',
    end: 'meeting.attributes.end',
    moderation: 'meeting.attributes.moderation',
    clerk: 'meeting.attributes.clerk'
  })
})

@Component({})
export default class EditMeeting extends EditProps {
  submit () {
    this.$store
      .dispatch('updating', {
        transformOrOperations: (t: TransformBuilder) => {
          return t.replaceRecord({
            attributes: {
              title: this.title,
              description: this.description,
              date: this.date,
              begin: this.begin,
              end: this.end,
              moderation: this.moderation,
              clerk: this.clerk
            },
            id: this.$route.params.meeting,
            type: 'meeting'
          })
        },
        thenable: ({ commit }:{commit:Commit}, data:Record) => {
          commit('set', { data, model: data.type })
        }
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
    this.$store.dispatch('fetchOne', {
      model: 'meeting',
      id: this.$route.params.meeting
    })
  }
}
</script>
