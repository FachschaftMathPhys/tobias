import template from './organization.slim'
import draggable from 'vuedraggable'
import Top from './top'
import TopCreateDialog from './top-create-dialog'
import Vue from 'vue';
import Component from 'vue-class-component';

const OrganizationProps = Vue.extend({
  components: {
    draggable,
    Top,
    TopCreateDialog
  },
  props: ['organization'],
  mixins: [template]
});
@Component({
  name: 'Organization'
})
export default class Organization extends OrganizationProps {
  save(top) {
    this.$store.dispatch('addTop', top).then(() => {
      this.dialog = false;
    });
  }
  deleteTop(item) {
    if (confirm("Wirklich diesen TOP entfernen? (TODO: implementieren)")) {
      this.$store.dispatch("removeTop", {
        top: item,
        organization: this.organization
      })
    }
  }
  dialog: boolean = false;
  mail: {
    subject: ""
    header: ""
    fromname: ""
  }
  get Tops() {
    return this.organization.relationships.tops
  }
  set Tops(value) {
    let tops = [];
    let inmails = [];
    for (let v of value) {
      let m = v;
      if (v.type == "tops") {
        tops.push(m)
      } else {
        inmails.push(m);
        this.dialog = true;
        this.mail = m;
      }
    }
  }
}
