<template lang="pug">
div(v-if="org")
  h1 {{org.attributes.title}}
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
    strong Beschreibung: {{org.attributes.description}}
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
                v-expansion-panel-content(v-for="meeting in meetings" :key="meeting.id")
                  div(slot="header") {{meeting.attributes.title}}
                  Meeting(:meeting="meeting" :organizationview="true")
v-container(v-else=true)
  p.text-xs-center
    v-progress-circular(color="accent" indeterminant=true)
</template>
<script lang="ts">
import draggable from 'vuedraggable'

import { mapFields } from 'vuex-map-fields'
import Top from '~/components/top.vue'
import Meeting from '~/components/meeting.vue'
import Vue from 'vue'
import Component from 'vue-class-component'

const OrganizationShowProps = Vue.extend({
  components: {
    Top,
    Meeting,
    draggable
  },
  computed: mapFields({
    org: 'organization',
    tops: 'tops',
    meetings: 'meetings'
  })
})
@Component({
  name: 'OrganizationShow'
})
export default class OrganizationShow extends OrganizationShowProps {
  menuVisible: boolean = false
  get Tops () {
    return this.tops
  }
  set Tops (value) {
  }
  mounted () {
    this.$store.dispatch('fetchOne', {
      model: 'organization',
      id: this.$route.params.organization
    })
    this.$store.dispatch('fetchAllRelatedOf', {
      data: {
        type: 'organization',
        id: this.$route.params.organization
      },
      relationship: 'meetings'
    })
    this.$store.dispatch('fetchAllRelatedOf', {
      data: {
        type: 'organization',
        id: this.$route.params.organization
      },
      relationship: 'tops'
    })
  }
}
</script>