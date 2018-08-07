<template lang="slm">
.page-container
  v-app :dark="darkTheme"
    v-navigation-drawer  app=true hide-overlay=true mini-variant=true permanent=true
      slot name="drawer"
        v-toolbar.transparent flat=true
          v-list.pa-0
            v-list-tile avatar=true
              v-list-tile-avatar
                img :src="pic"
              v-list-tile-content
                v-list-tile-title
                  | {fullname}
              v-list-tile-action
                v-btn icon=true @click.native.stop="menuVisible = !menuVisible"
                  v-icon chevron_left
        v-list
          v-list-tile to="/organizations"
            v-list-tile-action
              v-icon group
            v-list-tile-content
              v-list-tile-title Organisationen
          v-list-tile to="/inmails"
            v-list-tile-action
              v-icon inbox
            v-list-tile-content
              v-list-tile-title Inbox
          v-list-tile href="https://github.com/fachschaftmathphys/tobias"
            v-list-tile-action
              v-icon extension
            v-list-tile-content
              v-list-tile-title Erweiterung anfordern
          v-list-tile to="/settings"
            v-list-tile-action
              v-icon settings
            v-list-tile-content
              v-list-tile-title Einstellungen
    v-toolbar app=true color="primary"
          v-toolbar-title TobiaS
          v-spacer
    v-content
      v-container fluid=true
        router-view
</template>
<script lang='ts'>
  import Vue from 'vue'
  import Component from 'nuxt-class-component'
  import { createHelpers, mapFields } from 'vuex-map-fields'
import { QueryBuilder } from '@orbit/data'
import { merge } from '@orbit/utils'
  const helpers = createHelpers({
    getterType: 'settings/getField',
    mutationType: 'settings/updateField'
  })
  const AppProps = Vue.extend({
    name: 'Flexible',
    computed: merge(helpers.mapFields({ darkTheme: 'darkTheme' }),
      mapFields({fullname: 'user.attributes.fullname', pic: 'user.attributes.pic'}))
  })
  @Component({
  })
  export default class App extends AppProps {
    created () {
      this.$store.dispatch('querying', {
        queryOrExpression: (q: QueryBuilder) => {
          return q.findRecord({ type: 'user', id: 'me' })
        },
        thenable: ({ commit, dispatch }, data) => {
          commit('set', { data, model: 'user' })
        }
      })
    }
    menuVisible: boolean = false
  }
</script>