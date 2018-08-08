<template lang="slm">
v-container app=true
  h1 Willkommen bei TobiaS
  p Starte mit einem Klick auf die Organisationen...
  v-speed-dial bottom=true right=true direction="top" fixed=true open-on-hover=true
    v-btn slot="activator" color="blue darken-2" dark=true fab=true hover=true
      v-icon add
      v-icon close
    v-tooltip left=true
      v-btn slot="activator" color="blue darken-2" dark=true small=true fab=true hover=true   @click="newTop"
        v-icon group_add
      span Meeting hinzufügen
    v-tooltip left=true
      v-btn slot="activator" color="blue darken-2" dark=true small=true fab=true hover=true   @click="newTop"
        v-icon note_add
      span Top hinzufügen
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
const AppProps = Vue.extend({
  name: 'Welcome'
})
@Component({})
export default class Welcome extends AppProps {
  newTop () {
    alert('Test')
  }
}
</script>