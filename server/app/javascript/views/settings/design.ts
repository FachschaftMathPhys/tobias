import template from './design.slim'
import Vue from 'vue'
import Component from 'vue-class-component';
import { createHelpers } from 'vuex-map-fields';
import colors, { Color } from 'vuetify/es5/util/colors'
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
    primary={color: colors.red};
    secondary={color: colors.deepPurple};
    accent={color: colors.amber};
    created() {
        console.log(this.$vuetify);
  }
  get colors(){
      let result=[]
    Object.keys(colors).forEach((color)=>{
        result.push({color:colors[color],name:color})
    })
    return result;
  }
  apply(){
      console.log(this);
    this.$vuetify.theme.primary=this.primary.color.base;
    this.$vuetify.theme.secondary=this.secondary.color.base;
    this.$vuetify.theme.accent=this.accent.color.base;
}
}