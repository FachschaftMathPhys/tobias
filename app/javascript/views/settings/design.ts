import template from './design.slim'
import Vue from 'vue'
import Component from 'vue-class-component';
import { createHelpers } from 'vuex-map-fields';
const { mapFields } = createHelpers({
  getterType: 'settings/getField',
  mutationType: 'settings/updateField',
});
const SettingsDesignProps = Vue.extend({
    computed:mapFields({darkTheme:"darkTheme"})
})

@Component({
  name: 'SettingsDesign',
  mixins: [template]
})
export default class SettingsDesign extends SettingsDesignProps {
    created() {
        console.log(this.$vuetify);
  }
  save(){
      
  }
}