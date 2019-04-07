<template lang="pug">
div
  h1 Organisationen bearbeiten
  v-form(ref="form")
    v-text-field(label="Titel" v-model="organization.title" required=true)
    v-textarea(label="Beschreibung" v-model="organization.description")
    v-btn(@click="submit") submit
</template>
<script lang="ts">
import { mapFields, Commit } from "vuex-map-fields";

// `fooModule` is the name of the Vuex module.

import Vue from "vue";
import Component from "vue-class-component";
import { Record, QueryBuilder } from "@orbit/data";
import { TransformBuilder } from "@orbit/data";
import QUERY_ORGANIZATION from "./query-organization.gql";
import UPDATE_ORGANIZATION from "./update-organization.gql"
const EditProps = Vue.extend({
  name: "EditOrganization",
  data() {
    console.log(this.$route.params.organization);
    return {
      orgId: this.$route.params.organization
    };
  },
  //@ts-ignore
  apollo: {
    organization: {
      query: QUERY_ORGANIZATION,
      variables() {
        return {
          organization: this.orgId
        };
      }
    }
  }
});
@Component({})
export default class EditOrganization extends EditProps {
  submit() {
    console.log(this);

    this.$apollo
      .mutate({
        mutation: UPDATE_ORGANIZATION,
        variables: {
          ...this.organization,
          organization: this.$route.params.organization
        },
        // Update the cache with the result
        // The query will be updated with the optimistic response
        // and then with the real result of the mutation
        update: (store, { data: { updateOrganization } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: QUERY_ORGANIZATION,
            variables: {
              organization: this.$route.params.organization
            }
          });
          data.organization.title = updateOrganization.title;
          data.organization.description = updateOrganization.description;

          // Write our data back to the cache.
          store.writeQuery({
            query: QUERY_ORGANIZATION,
            variables: {
              organization: this.$route.params.organization
            },
            data
          });
        }
      })
      .then(() => {
        // verknüpfen, falls meeting angegeben
        if (this.$route.params.meeting) {
          alert("Füge zu " + this.$route.params.meeting);
        }
        this.$router.push({
          name: "organizations-organization",
          params: {
            organization: this.$route.params.organization
          }
        });
      });
  }
  created() {
    this.$store.dispatch("query", {
      query: (q: QueryBuilder) => {
        return q.findRecord({
          type: "organization",
          id: this.$route.params.organization as string
        });
      },
      setField: "organization"
    });
  }
}
</script>