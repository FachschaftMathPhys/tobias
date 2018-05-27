
import template from './comment.slim'
import Component from 'vue-class-component';
import Vue from 'vue';

const CommentProps=Vue.extend({
  props:['comment']
})
@Component({
  mixins:[template]
})
export default class Comment extends CommentProps {
  name: 'Comment'
}
