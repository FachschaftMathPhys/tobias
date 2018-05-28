
  import Vue from 'vue'
import template from "./application.slim"
import Component from 'vue-class-component'
import { createHelpers } from 'vuex-map-fields';
const { mapFields } = createHelpers({
  getterType: 'settings/getField',
  mutationType: 'settings/updateField',
});
const AppProps = Vue.extend({
  name:'Flexible',
  computed:mapFields({darkTheme:"darkTheme"})
})
@Component({
  mixins: [template]
})
export default class App extends AppProps{
  menuVisible: boolean = false
}