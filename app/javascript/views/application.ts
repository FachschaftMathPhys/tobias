
  import Vue from 'vue'
import template from "./application.slim"
import Component from 'vue-class-component'
const AppProps = Vue.extend({
  name:'Flexible'
})
@Component({
  mixins: [template]
})
export default class App extends AppProps{
  menuVisible: boolean = false
}