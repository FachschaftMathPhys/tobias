<template lang="pug">
div(v-if="top")
  v-card
    v-card-title
      h3.headline {{top.attributes.title}}
        .right.grey-text @{{top.attributes.author}}
    v-card-text {{top.attributes.description}}
    v-card-actions
      v-btn(color="primary" flat=true :to='{name:"organizations-organization-tops-top",params:{top:top.id,organization:top.relationships.organization.data.id}}')
        span Anschauen
      v-spacer
      v-btn(flat=true color="secondary" icon=true :to='{name:"organizations-organization-tops-top-edit",params:{top:top.id,organization:top.relationships.organization.data.id}}')
        v-icon edit
      v-btn(flat=true color="secondary" icon=true @click.native.stop="deleteTop(top)")
        v-icon delete
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import { TransformBuilder, Record, QueryBuilder} from '@orbit/data'
const TopProps = Vue.extend({
  props: ['top','related']
})
@Component({
  name: 'Top'
})
export default class Top extends TopProps {
  created () {}
  deleteTop (top:Record) {
    if (confirm('Willst du wirklich diesen TOP entfernen?')) {
      this.$store.dispatch('update', {
        update: (t: TransformBuilder) => {
          return t.removeRecord(top)
        },
        queryParam:{query:(q:QueryBuilder)=>q.findRelatedRecords(this.related,'tops'),setField:"tops"}
      })
      // this.$store.dispatch('delete', top)
    }
  }
}
</script>