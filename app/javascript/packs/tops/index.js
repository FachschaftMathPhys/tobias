/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %> (and
// <%= stylesheet_pack_tag 'hello_vue' %> if you have styles in your component)
// to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.
//TODO use alias instead
import Vue from 'vue/dist/vue.esm'
import App from '../../views/organizations/index.vue'
import Vuetify from 'vuetify'
 import TurbolinksAdapter from 'vue-turbolinks';
 import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
console.log("holla");
// Material design:, TODO: only components
//colors


// Helpers
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: '#990000', // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
})
Vue.use(TurbolinksAdapter)
document.addEventListener('turbolinks:load', () => {
   const app = new Vue({
     el: '#app',
     data: {
       message: "Can you say hello?"
     },
     components: { App }
   })
   console.log(app)
 })
