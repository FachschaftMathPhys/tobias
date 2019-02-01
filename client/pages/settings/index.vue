<template lang="pug">
div
  h1 Einstellungen
  v-list(two-line=true subheader=true)
    v-subheader Allgemein
    v-list-tile(to="/settings/account")
      v-list-tile-action
        v-avatar
          v-icon account_circle
      v-list-tile-content
        v-list-tile-title Account
        v-list-tile-sub-title Ändere Anzeigename, Profilbild, etc.
    v-list-tile(to="/settings/design")
      v-list-tile-action
        v-avatar
          v-icon palette
      v-list-tile-content
        v-list-tile-title Darstellung & Design
        v-list-tile-sub-title Ändere Theme und Farbschema
    v-subheader Experimentell
    v-list-tile(to="/settings/history")
      v-list-tile-action
        v-avatar
          v-icon history
      v-list-tile-content
        v-list-tile-title Verlauf
        v-list-tile-sub-title Betrachte und bearbeite deinen lokalen Verlauf
    v-subheader Rechtliches
    v-list-tile(to="/settings/privacy")
      v-list-tile-action
        v-avatar
          v-icon security
      v-list-tile-content
        v-list-tile-title Datenschutz
        v-list-tile-sub-title Sehe gespeicherte Daten & informiere dich über deren Verarbeitung
    v-list-tile(to="/licenses")
      v-list-tile-action
        v-avatar
          v-icon receipt
      v-list-tile-content
        v-list-tile-title Lizenzen
        v-list-tile-sub-title Verwendeter Software und Bibliotheken
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
const SettingsIndexProps = Vue.extend({

})

@Component({
  name: 'SettingsIndex'
})
export default class SettingsIndex extends SettingsIndexProps {
  created () {
  }
}
</script>