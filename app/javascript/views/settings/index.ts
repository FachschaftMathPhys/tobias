import template from './index.slim'
import Vue from 'vue'
import Component from 'vue-class-component';
const SettingsIndexProps = Vue.extend({

})

@Component({
  name: 'SettingsIndex',
  mixins: [template]
})
export default class SettingsIndex extends SettingsIndexProps {
  created() {
  }
}