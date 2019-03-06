<template lang="pug">
v-card
    v-card-title(primary-title=true)
      div
        h3.headline.mb-0 Design & Darstellung
        div
          v-switch(label="Dark Theme" v-model="darkTheme")
          v-select(:items="colors" v-model="primary" label="Primärfarbe" item-text="name" item-value="color" return-object=true)
          v-select(:items="colors" v-model="secondary" label="Sekundärfarbe" item-text="name" item-value="color" return-object=true)
          v-select(:items="colors" v-model="accent" label="Akzentfarbe" item-text="name" item-value="color" return-object=true)
    v-card-actions
      v-spacer
      v-btn(flat=true color="primary" @click="apply") Anwenden
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { createHelpers } from 'vuex-map-fields'
//@ts-ignore
import colors, { Color } from 'vuetify/es5/util/colors'

const { mapFields } = createHelpers({
  getterType: 'settings/getField',
  mutationType: 'settings/updateField'
})
const SettingsDesignProps = Vue.extend({
  computed: mapFields({darkTheme: 'darkTheme'})
})

@Component({
  name: 'SettingsDesign'
})
export default class SettingsDesign extends SettingsDesignProps {
    primary={color: colors.red}
    secondary={color: colors.deepPurple}
    accent={color: colors.amber}
    created () {
    }
    get colors () {
      let result:Color[] = []
      Object.keys(colors).forEach((color) => {
        result.push({color: colors[color], name: color})
      })
      return result
    }
    apply () {
      console.log(this)
      this.$vuetify.theme.primary = this.primary.color.base
      this.$vuetify.theme.secondary = this.secondary.color.base
      this.$vuetify.theme.accent = this.accent.color.base
    }
}
</script>