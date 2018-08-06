import template from './account.slim'
import Vue from 'vue'
import Component from 'vue-class-component';
const SettingsAccountProps = Vue.extend({

})

@Component({
  name: 'SettingsAccount',
  mixins: [template]
})
export default class SettingsAccount extends SettingsAccountProps {
  created() {
  }
}