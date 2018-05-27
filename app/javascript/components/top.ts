import template from './top.slim'
import { mapGetters, mapActions, mapState } from 'vuex'
import Vue from 'vue';
import Component from 'vue-class-component';
const TopProps = Vue.extend({
  props:['top'],
  computed:mapGetters({
    org: 'Organization'
  })
})
@Component(
  {
    mixins:[template],
    name: 'Top'
  }
)
export default class Top extends TopProps {
  created(){
  }
  deleteTop(top){
    if(confirm("Willst du wirklich diesen TOP entfernen?"))
    this.$store.dispatch("delete",top);
  }
}
