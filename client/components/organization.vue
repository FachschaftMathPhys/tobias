<template lang="pug">
v-card(v-if="loading")
  v-card-title
    h3.headline {{organization.attributes.title}}
  v-card-text {{organization.attributes.description}}
    h3 TOPS
    v-expansion-panel
      draggable(v-model='Tops' group="tops" style="width:100%")
        v-expansion-panel-content(v-for="top in Tops" :key="top.id")
          div(slot="header")
            v-tooltip(bottom=true)
              v-btn(flat=true color="accent" icon=true slot="activator" @click.native.stop="deleteTop(top)")
                v-icon remove 
              span TOP entfernen
            | {{top.attributes.title}}
          Top(:top="top" :related="organization")
        v-btn(flat=true) Ziehe TOPs hierhin...
  v-card-actions
    v-btn(color="accent" flat=true :to='{name:"organizations-organization",params:{organization:organization.id}}')
      span Anschauen
  div(v-if="dialog")
    TopCreateDialog(:visible="dialog" :mail="mail" :organization="organization" @save="save" @abort="dialog=false")
</template>
<script lang="ts">
import draggable from "vuedraggable";
import Top from "./top.vue";
import TopCreateDialog from "./top-create-dialog.vue";
import Vue from "vue";
import Component from "vue-class-component";
import { Record, TransformBuilder } from "@orbit/data";
//import store from '../store/api'
import { Prop } from "nuxt-property-decorator";
const OrganizationProps = Vue.extend({
  components: {
    draggable,
    Top,
    TopCreateDialog
  }
});
@Component({
  name: "Organization"
})
export default class Organization extends OrganizationProps {
  save(top: {
    description: String;
    submitter: String;
    title: String;
    organization: any;
  }) {
    console.log(top);
    this.$store.dispatch("api.update", {
      update: (u: TransformBuilder) => {
        //@ts-ignore
        return u.addRecord({
          type: "top",
          attributes: {
            description: top.description,
            submitter: top.submitter,
            title: top.title
          },
          relationships: {
            organization: {
              data: top.organization
            }
          }
        });
      }
    });
  }
  @Prop({})
  organization: Record | null = null;
  deleteTop(item: Record) {
    if (confirm("Wirklich diesen TOP entfernen? (TODO: implementieren)")) {
      this.$store.dispatch("api.update", {
        update: (t: TransformBuilder) => {
          return t.removeRecord(item);
        }
      });
    }
  }
  loading: boolean = false;
  dialog: boolean = false;
  mail = {};
  tops: Record[] = [{ type: "top", id: "" }];
  get Tops() {
    if (this.loading) {
      return this.tops;
    } else {
      return [];
    }
  }
  set Tops(value: Record[]) {
    let tops: any[] = [];
    let inmails = [];
    for (let v of value) {
      let m = v;
      if (v.type === "top") {
        tops.push(m);
      } else {
        console.log(v.attributes);
        inmails.push(m);
        this.mail = m;
        this.dialog = true;
      }
    }
  }
  mounted() {
    this.loading = false;
    this.$store.dispatch("query", {
      query: (q: any) => {
        return q.findRelatedRecords(
          { type: "organization", id: this.organization!.id },
          "tops"
        );
      },
      setField: "tops"
    });
  }
}
</script>
