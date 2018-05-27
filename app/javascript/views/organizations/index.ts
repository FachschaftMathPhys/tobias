import template from './index.slim'
import { mapGetters, mapActions, mapState } from 'vuex'
import Vue from 'vue'
import Component from 'vue-class-component';
import { mapFields } from 'vuex-map-fields';
import { QueryBuilder } from '@orbit/data';
const IndexOrganizationProps = Vue.extend({
  computed: {
    ...mapFields({
      orgs: 'organizations',
      allOrgs: 'organizations'
    })
  }
})

@Component({
  name: 'Organizations',
  mixins: [template]
})
export default class IndexOrganization extends IndexOrganizationProps {
  menuVisible = false
  rowsPerPageItems = [4, 8, 12]
  pagination = {
    "rowsPerPage": 4
  }
  created() {
    this.$store.dispatch('querying', {
      queryOrExpression: (q: QueryBuilder) => {
        return q.findRecords('organization').sort("title")
      },
      thenable: ({ commit, dispatch }, data) => {
        commit('set', { data, model: "organizations" })
      }
    })
  }
}