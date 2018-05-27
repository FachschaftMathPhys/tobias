import draggable from 'vuedraggable'
import template from './show.slim'
import {
  mapGetters,
  mapActions,
  mapState
} from 'vuex'
import {mapFields} from 'vuex-map-fields'
import Top from '../../components/top'
import Meeting from '../../components/meeting'
import Vue from 'vue'
import Component from 'vue-class-component';

const OrganizationShowProps = Vue.extend({
  components: {
    Top,
    Meeting,
    draggable
  },
  computed: {
    ...mapFields({
      org: 'organization',
      tops: 'tops',
      meetings: 'meetings'
    })
  }
});
@Component({
  name: "OrganizationShow",
  mixins: [template]
})
export default class OrganizationShow extends OrganizationShowProps {
  menuVisible: false
  get Tops() {
    return this.org.tops
  }
  set Tops(value) {
    this.$store.commit('set', {data:value, model:"tops"});
  }
  created() {
    this.$store.dispatch('fetchOne',{model:'organization',id:this.$route.params.org_id});
    this.$store.dispatch('fetchAllRelatedOf', {data:{
      type: 'organization',
      id: this.$route.params.org_id
    },relationship:"meetings"
    });
    this.$store.dispatch('fetchAllRelatedOf', {data:{
      type: 'organization',
      id: this.$route.params.org_id
    },relationship:"tops"
    });
  }
}