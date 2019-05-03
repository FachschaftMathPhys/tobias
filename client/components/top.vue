<template lang="pug">
div(v-if="top")
  v-card
    v-card-title
      h3.headline {{top.title}}
        user-chip(:user="top.author")
    v-card-text {{top.description}}
    v-card-actions
      v-btn(color="primary" flat=true :to='{name:"organizations-organization-tops-top",params:{top:top.id,organization:top.organization.id}}')
        span Anschauen
      v-spacer
      v-btn(flat=true color="secondary" icon=true :to='{name:"organizations-organization-tops-top-edit",params:{top:top.id,organization:top.organization.id}}')
        v-icon edit
      v-btn(flat=true color="secondary" icon=true @click.native.stop="deleteTop(top)")
        v-icon delete
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import UserChip from "./user-chip.vue"
import gql from "graphql-tag"
import QUERY_ORGANIZATION from "./query-organization.gql"
const TopProps = Vue.extend({
  props: ['top','related'],
  components:{
    UserChip
  }
})
@Component({
  name: 'Top'
})
export default class Top extends TopProps {
  created () {}
  deleteTop (top) {
    if (confirm("Willst du wirklich diesen Top entfernen?")) {
      this.$apollo.mutate({
        mutation: gql`
        mutation($top:ID!){
          deleteTop(top:$top)
        }`,
        variables:{
          top:this.top.id
        },
        update: (store, { data: { deleteTop } }) => {
       // Read the data from our cache for this query.
       let orgId = this.top.organization.id
        const data = store.readQuery({ query: QUERY_ORGANIZATION, variables:{
          organization:orgId
        } })
        data.organization.tops = data.organization.tops.filter((item)=>!(item.id==this.top.id))
        // Write our data back to the cache.
        store.writeQuery({ query: QUERY_ORGANIZATION,variables:{
          organization:orgId
        } , data })
      },
      })
    }
  }
}
</script>