<template lang="pug">
div(v-if="!$apollo.queries.organization.loading||organization")
  div
    h1 {{organization.title}}
    v-speed-dial(bottom=true right=true direction="top" fixed=true open-on-hover=true)
      v-btn(slot="activator" color="blue darken-2" dark=true fab=true hover=true)
        v-icon menu
        v-icon close
      v-tooltip(left=true)
        v-btn(fab=true dark=true small=true color="green" slot="activator" :to='{name:"organizations-organization-edit",params:{organization:$route.params.organization}}')
          v-icon edit
        span Bearbeiten
      v-tooltip(left=true)
        v-btn(fab=true dark=true small=true color="indigo" slot="activator" :to='{name:"organizations-organization-tops-new",params:{organization:$route.params.organization}}')
          v-icon note_add
        span TOP hinzufügen
      v-tooltip(left=true)
        v-btn(fab=true dark=true small=true color="indigo" slot="activator" :to='{name:"organizations-organization-meetings-new",params:{organization:$route.params.organization}}')
          v-icon group_add
        span Meeting hinzufügen
    p
      strong Beschreibung: {{organization.description}}
      v-container(grid-list-md=true)
        v-layout#drag-scope(row=true wrap=true)
          v-flex.top-container(xs6=true)
            h3 Aktuelle Tops
            draggable(v-model='Tops' :options='{group:"tops"}')
              div(v-for="top in Tops")
                v-flex.top-item.handle(xs12=true)
                  Top(:top="top")
          v-flex(xs6=true)
            h3 Aktuelle Sitzungen
            div 
              v-flex(xs12=true)
                v-expansion-panel
                  v-expansion-panel-content(v-for="meeting in organization.meetings" :key="meeting.id")
                    div(slot="header") {{meeting.title}}
                    Meeting(:meeting="meeting" :organizationview="true")
v-container(v-else=true)
  p.text-xs-center
    v-progress-circular(indeterminate color="primary")
</template>
<script lang="ts">
import draggable from 'vuedraggable'

import { mapFields } from 'vuex-map-fields'
import Top from '~/components/top.vue'
import Meeting from '~/components/meeting.vue'
import gql from "graphql-tag"
import Vue from 'vue'
import Component from 'vue-class-component'
import {Record, QueryBuilder} from '@orbit/data'

import QUERY_ORGANIZATION from "./query-organization.gql"
//import {Watch} from 'vue-property-decorator'

const OrganizationShowProps = Vue.extend({
  components: {
    Top,
    Meeting,
    draggable
  },
  data(){
    console.log(this.$route.params.organization)
    return {
      orgId: this.$route.params.organization
    }
  },
  //@ts-ignore
  apollo: {
        organization: { 
          query: QUERY_ORGANIZATION,
        variables(){
          return {
            organization: this.orgId
          }
        }
      }
    }
})
@Component({
  name: 'OrganizationShow'
})
export default class OrganizationShow extends OrganizationShowProps {
  menuVisible: boolean = false
  get Tops () {
    return this.organization.tops
  }
  set Tops (tops:Record[]) {
    console.log(tops)
  }
  
}
</script>