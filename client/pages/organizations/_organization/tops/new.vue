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
      this.$store.dispatch('create', {
        type: 'top',
        attributes: this.model,
        relationships: {
          organization: {
            data: {
              type: 'organization',
              id: this.$route.params.organization
            }
          }
        }
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