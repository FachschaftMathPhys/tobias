<template lang="slm">
div
  h1 Organisationen
  v-container fluid=true grid-list-md=true wrap=true
    v-layout row=true wrap=true
      v-flex v-for="organization in organizations" :key="organization.id"  xs12=true sm6=true md4=true lg3=true
        v-card
          v-card-title primary-title=true
            h3.headline.mb-0
              | {{organization.attributes.title}}
          v-card-text
            | {{organization.attributes.description}}
          v-card-actions
            v-btn (flat=true color="primary" :to='{name:"organizations-organization",params:{organization:organization.id}}') Anschauen
            v-spacer
            v-btn flat=true icon=true color="secondary" @click.native.stop="deleteOrg(organization)"
              v-icon delete
  v-btn color="blue darken-2" dark=true fab=true hover=true bottom=true right=true fixed=true :to='{name:"organizations-new"}'
    v-icon add
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapFields } from 'vuex-map-fields'
import { QueryBuilder } from '@orbit/data'
const IndexOrganizationProps = Vue.extend({
  computed: mapFields({
    organizations: 'organizations'
  })
})

@Component({
  name: 'Organizations'
})
export default class IndexOrganization extends IndexOrganizationProps {
  menuVisible = false
  rowsPerPageItems = [4, 8, 12]
  pagination = {
    rowsPerPage: 4
  }
  deleteOrg (org) {
    if (confirm('Willst du wirklich diese Organisation entfernen?')) {
      this.$store.dispatch('delete', org)
    }
  }
  created () {
    this.$store.dispatch('querying', {
      queryOrExpression: (q: QueryBuilder) => {
        return q.findRecords('organization').sort('title')
      },
      thenable: ({ commit, dispatch }, data) => {
        commit('set', { data, model: 'organizations' })
      }
    })
  }
}
</script>