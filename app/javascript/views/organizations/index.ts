import template from './index.slim'
import { mapGetters, mapActions, mapState } from 'vuex'
import Vue from 'vue'
import Component from 'vue-class-component';
const IndexOrganizationProps = Vue.extend({
  computed: {
    ...mapGetters({
      orgs: 'allOrganizations'
    }),
    allOrgs: {
      cache: false, get() {
        return this.$store.getters.allOrganizations
      }
    }
  }
})

@Component({
  name: 'Organizations',
  mixins: [template]
})
  export default class IndexOrganization extends IndexOrganizationProps  {
    menuVisible= false
    rowsPerPageItems= [4, 8, 12]
    pagination= {
      "rowsPerPage": 4
    }
    created() {
      this.$store.dispatch('getAllOrganizations')
    }
  }