<template lang="slm">
v-expansion-panel-content
  div slot="header"
    v-tooltip bottom=true
      v-btn flat=true color="accent" icon=true slot="activator" @click.native.stop='$emit("deleteAction",action)'
        v-icon remove
      span TOP entfernen
    | {{top.attributes.title}}
  Top :top="top"
</template>
<script lang="ts">
import Vue from 'vue'
import Top from './top.vue'
import Component from 'nuxt-class-component'
import store from '~/store/api'
const ActionProps = Vue.extend({
  components: {
    Top
  },
  props: ['action']
})
@Component({})
export default class Action extends ActionProps {
  top = {
    loaded: true,
    attributes: {
      title: ''
    },
    relationships: {
      organization: {
        data: {
          id: 'loading'
        }
      }
    }
  }
  created () {
    console.log(this.action)
    store.query((q) => q.findRelatedRecord(this.action, 'top')).then((data) => { this.top = data })
  }
}
</script>
