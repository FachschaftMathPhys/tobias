
import template from './welcome.slim'
import Vue from 'vue'
import Component from 'vue-class-component'
const AppProps = Vue.extend({
  name:'Welcome'
})
@Component({
  mixins: [template]
})
export default class Welcome extends AppProps{
}