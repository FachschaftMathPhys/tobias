
import template from './empty.slim'
import Vue from 'vue'
import Component from 'vue-class-component'
const WelcomeProps = Vue.extend({
  name:'Empty'
})
@Component({
  mixins: [template]
})
export default class Empty extends WelcomeProps{
}
