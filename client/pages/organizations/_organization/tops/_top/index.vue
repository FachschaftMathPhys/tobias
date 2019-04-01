<template lang="pug">
div
  div(v-if="top")
    Top(:top="top")
    h3 Kommentare
    div(v-for="c in top.comments")
      Comment(:comment='c')
  v-container(v-else)
    p.text-xs-center
      v-progress-circular(color="accent" indeterminant=true)
</template>
<script lang="ts">
import Top from '~/components/top.vue'
import Comment from '~/components/comment.vue'
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapFields } from 'vuex-map-fields'
import QUERY_TOP from "./query-top.gql"
const TopShowProps = Vue.extend({
  components: {
    Top,
    Comment
  },
  data(){
    return {
      tId:this.$route.params.top 
    }
  },
  //@ts-ignore
  apollo: {
        top: { 
          query: QUERY_TOP,
        variables(){
          return {
            top: this.tId
          }
        }
      }
    }
})
@Component({
  name: 'TopShow'
})
export default class TopShow extends TopShowProps {
  menuVisible: boolean = false
  created () {
  }
}
</script>