import draggable from 'vuedraggable'
import template from './show.slim'
import {
  mapGetters,
  mapActions,
  mapState
} from 'vuex'
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
    ...mapGetters({
      org: 'Organization',
      tops: 'allTops',
      meetings: 'meetings/allMeetings'
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
    this.$store.commit('updateTops', value)
  }
  created() {
    this.$store.dispatch('getOrganization', {
      id: this.$route.params.org_id
    });
    this.$store.dispatch('getTops', {
      org_id: this.$route.params.org_id
    })
    this.$store.dispatch('meetings/getMeetings', {
      org_id: this.$route.params.org_id
    })
  }
}