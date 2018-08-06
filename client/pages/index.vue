<template lang="slm">
v-container app=true
  h1 Willkommen bei TobiaS
  p Starte mit einem Klick auf die Organisationen...
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
const AppProps = Vue.extend({
  name: 'Welcome'
})
@Component({})
export default class Welcome extends AppProps {}
</script>