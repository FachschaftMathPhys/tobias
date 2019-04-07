<template lang="pug">
.page-container
  v-app(:dark="darkTheme")
    v-navigation-drawer(app=true hide-overlay=true :mini-variant="menuVisible" permanent=true)
      slot(name="drawer")
        v-toolbar.transparent(flat=true)
          v-list.pa-0
            v-list-tile(avatar=true v-if="!$apollo.loading")
              v-list-tile-avatar
                img(:src="`http://localhost:4001/attachments/${me.image}`" v-if="me&&me.image")
                v-icon(v-else x-large color="orange") account_circle
              v-list-tile-content
                v-list-tile-title
                  span {{me.fullname}}
                  i {{me.username}}
              v-list-tile-action
                v-btn(icon=true @click.native.stop="menuVisible = !menuVisible")
                  v-icon chevron_left
        v-list
          v-list-tile(to="/")
            v-list-tile-action
              v-icon home
            v-list-tile-content
              v-list-tile-title Start
          v-list-tile(to="/organizations")
            v-list-tile-action
              v-icon group
            v-list-tile-content
              v-list-tile-title Organisationen
          v-list-tile(to="/inmails")
            v-list-tile-action
              v-icon inbox
            v-list-tile-content
              v-list-tile-title Inbox
          v-list-tile(href="https://github.com/fachschaftmathphys/tobias")
            v-list-tile-action
              v-icon extension
            v-list-tile-content
              v-list-tile-title Erweiterung anfordern
          v-list-tile(to="/settings")
            v-list-tile-action
              v-icon settings
            v-list-tile-content
              v-list-tile-title Einstellungen
          v-list-tile(v-if="menuVisible")
            v-list-tile-action
              v-btn(icon=true @click.native.stop="menuVisible = !menuVisible")
                v-icon chevron_right
            v-list-tile-content
              v-list-tile-title Menü ausklappen
    v-toolbar(app=true color="primary")
          v-toolbar-title TobiaS
          v-spacer
    v-content
      v-container(fluid=true)
        router-view
</template>
<script lang='ts'>
import Vue from "vue";
import gql from "graphql-tag"
import Component from "nuxt-class-component";
import { createHelpers, mapFields } from "vuex-map-fields";
import { QueryBuilder, Record } from "@orbit/data";
import { merge } from "@orbit/utils";
const helpers = createHelpers({
  getterType: "settings/getField",
  mutationType: "settings/updateField"
});
const AppProps = Vue.extend({
  name: "Flexible",
  computed: merge(
    helpers.mapFields({ darkTheme: "darkTheme" })
  ),
  apollo: {
      me: gql`{
        me {
          image,
          fullname
          username,
          id
        }
      }`
    }
});
@Component({})
export default class App extends AppProps {
  mounted() {
    
  }
  
  menuVisible: boolean = false;
}
</script>