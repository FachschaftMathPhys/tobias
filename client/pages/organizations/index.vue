<template lang="pug">
div
  h1 Organisationen
  v-container(fluid=true grid-list-md=true wrap=true)
    v-layout(row=true wrap=true)
      v-flex(v-for="organization in organizations" :key="organization.id"  xs12=true sm6=true md4=true lg3=true)
        v-card
          v-card-title(primary-title=true)
            h3.headline.mb-0 {{organization.title}}
          v-card-text {{organization.description}}
          v-card-actions
            v-btn(flat=true color="primary" :to='{name:"organizations-organization",params:{organization:organization.id}}') Anschauen
            v-spacer
            v-btn(flat=true icon=true color="secondary" @click.native.stop="deleteOrg(organization)")
              v-icon delete
  v-btn(color="blue darken-2" dark=true fab=true hover=true bottom=true right=true fixed=true :to='{name:"organizations-new"}')
    v-icon add
</template>
<script lang="ts">
import Vue from "vue";
import gql from 'graphql-tag'
import Component from "vue-class-component";
import { mapFields } from "vuex-map-fields";
import { QueryBuilder, Record, TransformBuilder } from "@orbit/data";
const IndexOrganizationProps = Vue.extend({
  //computed: mapFields({
 //   organizations: "organizations"
  //})
  apollo: {
      organizations: gql`{
        organizations {
          title
          description,
          id
        }
      }`
    }
});

@Component({
  name: "Organizations"
})
export default class IndexOrganization extends IndexOrganizationProps {
  menuVisible = false;
  rowsPerPageItems = [4, 8, 12];
  pagination = {
    rowsPerPage: 4
  };
  
  deleteOrg(org: Record) {
    if (confirm("Willst du wirklich diese Organisation entfernen?")) {
      this.$store.dispatch("update", {
        update: (s: TransformBuilder) => s.removeRecord(org),
        queryParam: {
          query: (q: QueryBuilder) => {
            return q.findRecords("organization").sort("title");
          },
          setField: "organizations"
        }
      });
    }
  }
  beforeDestroy() {
    //this.$store.commit('set',{setField:'organization',data:false})
  }
  created() {
    
  }
}
</script>