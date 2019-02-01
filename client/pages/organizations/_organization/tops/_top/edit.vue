<template lang="pug">
div(v-if="t")
  h1 TOP bearbeiten
  v-form(ref="form")
    v-text-field(label="Titel" v-model="title" required=true)
    v-textarea(label="Beschreibung" v-model="description")
    v-btn(@click="submit") Speichern
</template>
<script lang="ts">
// import Top from '../../components/top.vue'
// import Comment from '../../components/comment.vue'
import { mapFields } from 'vuex-map-fields'
import Vue from 'vue'
import Component from 'vue-class-component'
const TopEditProps = Vue.extend({
  computed: mapFields({
    t: 'top',
    title: 'top.attributes.title',
    description: 'top.attributes.description'
  })
})
@Component({
  name: 'EditTop'
})
export default class TopEdit extends TopEditProps {
  submit () {
    this.$store.dispatch('update', this.t).then(() => {
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
    this.$store.dispatch('fetchOne', {
      model: 'top',
      id: this.$route.params.top
    })
  }
}
</script>