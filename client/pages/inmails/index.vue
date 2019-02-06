<template lang="pug">
v-container(grid-list-md=true)
  v-layout(row=true wrap=true)
    v-flex(md6=true)
      v-card(flat=true tile=true)
        v-card-title(primary-title=true)
          h3.head-line.mb-0 Mails
        v-list(two-line=true)
          draggable(v-model='inmails' :options='{group:{name:"tops",pull:"clone", put:false}}')
            v-list-group(:key="mail.header" v-for="(mail, index) in inmails")
              v-subheader(v-if="mail.header" :key="mail.header") {{ mail.header }}
              v-list-tile(avatar=true v-else-if="mail" :key="mail.title" slot="activator")
                v-list-tile-avatar
                  v-icon(color="orange" dark=true x-large=true v-if='mail.attributes.avatar=="avatar"') account_circle
                  img(v-else=true :src="mail.attributes.avatar")
                v-list-tile-content
                  v-list-tile-title(v-html="mail.attributes.subject")
                  v-list-tile-sub-title
                    div
                      span(class='text--primary') {{mail.attributes.fromname}}&mdash;
                      span(v-html='mail.attributes.body.substr( 0, mail.attributes.body.lastIndexOf( " ", 20 ) ) + "..."')
              v-card
                v-card-text(v-html='mail.attributes.body')
                v-card-actions
                  v-btn(@click="email=mail" flat=true color="accent") Antworten
              v-divider
    v-flex(md6=true)
      v-card
        v-card-title(primary-title=true)
          h3.head-line.mb-0 Organisationen
        v-layout(row=true wrap=true)
          v-flex(xs12=true)
            v-expansion-panel
              v-expansion-panel-content(v-for="organization in orgs" :key="organization.id")
                div(slot="header")
                  | {{organization.attributes.title}}
                Organization(:organization="organization")
  div(v-if="email!=null")
    EmailCreateDialog(:mail="email" :visible="email!=null" @save="sendEmail" @abort="email=null")
</template>
<script lang="ts">
import { mapFields, Commit } from 'vuex-map-fields'
import Organization from '../../components/organization.vue'
import TopCreateDialog from '../../components/top-create-dialog.vue'
import EmailCreateDialog from '../../components/email-create-dialog.vue'
import store from '../../store/api'
import draggable from 'vuedraggable'
import Vue from 'vue'
import Component from 'nuxt-class-component'
import { QueryBuilder, Record } from '@orbit/data'

@Component({
  name: 'inmail',
  components: { Organization, draggable, TopCreateDialog, EmailCreateDialog },
  computed: mapFields({
    inmails: 'inmails',
    orgs: 'organizations'
  })
})
export default class Inmail extends Vue {
  dialog: boolean = true
  email: Record|null= null
  created () {
    this.$store.dispatch('fetchAllOf', 'inmail')
    this.$store.dispatch('querying', {
      queryOrExpression: (q: QueryBuilder) => {
        return q.findRecords('organization').sort('title')
      },
      thenable: ({ commit }:{commit:Commit}, data:Record[]) => {
        commit('set', { data, model: 'organizations' })
      }
    })
  }
  sendEmail (mail:{body:String,subject:String,address:String, mail:String}) {
    store.update((u) => {
      return u.addRecord({
        type: 'email',
        attributes: {
          body: mail.body,
          subject: mail.subject,
          address: mail.address
        },
        relationships: {
          referencable: {
            data: mail.mail
          }
        }
      })
    }).then(() => {
      this.email = null
      alert('Email versandt.')
    })
  }
}
</script>