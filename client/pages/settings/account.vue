<template lang="slm">
div
  v-card
    v-card-media src="https://avatars2.githubusercontent.com/u/10349817?s=460&v=4" height="200px"
      v-spacer
      v-btn fab=true icon=true
        v-icon file_upload
    v-card-title primary-title=true
      v-layout row=true
        v-flex xs8=true
          v-text-field label="Anzeigename" required=true
        v-flex xs4=true
          v-text-field label="Loginname" disabled=true
        div
    v-card-actions
      v-spacer
      v-btn flat=true color="primary" Speichern
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
const SettingsAccountProps = Vue.extend({

})

@Component({
  name: 'SettingsAccount'
})
export default class SettingsAccount extends SettingsAccountProps {
  created () {
  }
}
</script>