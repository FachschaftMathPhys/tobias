<template lang="slm">
div
  div v-if="t"
    Top :top="t"
    h3 Kommentare
    div v-for="c in t.comments"
      Comment :comment='c'
  v-container v-else=true
    p.text-xs-center
      v-progress-circular color="accent" indeterminant=true
</template>
<script lang="ts">
import Top from '~/components/top.vue'
import Comment from '~/components/comment.vue'
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapFields } from 'vuex-map-fields'
const TopShowProps = Vue.extend({
  components: {
    Top,
    Comment
  },
  computed: mapFields({
    t: 'top',
    comments: 'comments'
  })
})
@Component({
  name: 'TopShow'
})
export default class TopShow extends TopShowProps {
  menuVisible: boolean = false
  created () {
    this.$store.dispatch('fetchOne', {
      model: 'top',
      id: this.$route.params.top
    })
    this.$store.dispatch('fetchAllRelatedOf', {
      data: {
        type: 'top',
        id: this.$route.params.top
      },
      relationship: 'comments'
    })
  }
}
</script>