<template lang="slm">
v-card
  v-card-title
    h3.headline
      | {{comment.title}}
      .right.grey-text
        | @{{comment.author}}
  v-card-text
    | {{comment.content}}
</template>
<script lang="ts">
import Component from 'nuxt-class-component'
import Vue from 'vue'

const CommentProps = Vue.extend({
  props: ['comment']
})
@Component({
})
export default class Comment extends CommentProps {
  name:string= 'Comment'
}
</script>
