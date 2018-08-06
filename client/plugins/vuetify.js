import Vue from 'vue'
import {
  Vuetify,
  VApp,
  VAvatar,
  VCard,
  VDataIterator,
  VDialog,
  VExpansionPanel,
  VNavigationDrawer,
  VFooter,
  VForm,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VProgressCircular,
  VSelect,
  VSwitch,
  VSpeedDial,
  VTextField,
  VToolbar,
  VTooltip,
  VDatePicker,
  VSubheader,
  VDivider
} from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  components: {
    VApp,
    VAvatar,
    VCard,
    VDataIterator,
    VDialog,
    VExpansionPanel,
    VNavigationDrawer,
    VFooter,
    VForm,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VProgressCircular,
    VSelect,
    VSpeedDial,
    VSwitch,
    VTextField,
    VToolbar,
    VTooltip,
    VDatePicker,
    VSubheader,
    VDivider
  },
  theme: {
    primary: '#990000', // #E53935
    secondary: colors.deepPurple.base, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
})
