<template lang="pug">
div
  v-container(grid-list-md=true v-if="!$apollo.queries.meeting.loading||meeting")
    v-layout(row=true wrap=true)
      v-flex(sm6=true)
        Meeting(:meeting="meeting")
      v-flex(sm6=true)
        v-card
          v-card-title.headline Sonstige Informationen
          v-card-text
            v-list(two-line=true subheader=true)
              v-list-tile(avatar=true)
                v-list-tile-content
                  v-list-tile-title {{meeting.date}}
                  v-list-tile-sub-title Date
              v-list-tile(avatar=true)
                v-list-tile-content
                  v-list-tile-title {{meeting.clerk}}
                  v-list-tile-sub-title Protokollant
              v-list-tile(avatar=true)
                v-list-tile-content
                  v-list-tile-title {{meeting.begin}}
                  v-list-tile-sub-title Beginn
              v-list-tile(avatar=true)
                v-list-tile-content
                  v-list-tile-title {{meeting.end}}
                  v-list-tile-sub-title Ende
    v-speed-dial(bottom=true right=true direction="top" fixed=true open-on-hover=true)
      v-btn(slot="activator" color="blue darken-2" dark=true fab=true hover=true)
        v-icon menu
        v-icon close
      v-tooltip(left=true)
        v-btn(fab=true dark=true small=true color="green" slot="activator" :href='"data:text/plain;base64,"+meeting.description' download="einladung.tex")
          v-icon file_download
        span Herunterladen
      v-tooltip(left=true)
        v-btn(fab=true dark=true small=true color="green" slot="activator" :to='{name:"organizations-organization-meetings-meeting-edit",params:{organization:$route.params.organization,meeting:$route.params.meeting}}')
          v-icon edit
        span Bearbeiten
      v-tooltip(left=true)
        v-btn(fab=true dark=true small=true color="indigo" slot="activator" @click.native.stop="topdialog = true")
          v-icon note_add
        span TOP hinzufügen
      v-tooltip(left=true)
        v-btn(fab=true dark=true small=true color="indigo" slot="activator" @click.native.stop="linkdialog = true")
          v-icon link
        span TOP verlinken
      v-tooltip(left=true)
        v-btn(fab=true dark=true small=true color="indigo" slot="activator" @click.native.stop="dialog = true")
          v-icon chat
        span Kommentar hinzufügen
    v-container(grid-list-md=true)
      v-layout(row=true wrap=true)
        v-flex(md6=true)
          h3 Aktuelle Tops
          div(v-for="action in meeting.actions")
            v-flex(xs12=true)
              Top(:top="action.top")
        v-flex(md6=true v-if="meeting")
          h3 Aktuelle Kommentare (zur Zeit deaktiviert)
          v-expansion-panel(popout=true)
            v-expansion-panel-content(hide-actions=true v-if="meeting.comments" v-for="(comment, i) in meeting.comments" :key="i")
              v-layout(align-center=true row=true spacer=true slot="header")
                v-flex(xs4=true sm2=true md1=true)
                  v-avatar(size="36px" slot="activator")
                    img(src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" alt="comment.author" v-if="comment.avatar")
                    v-icon(color="orange") account_circle
                v-flex(sm5=true md3=true hidden-xs-only=true)
                  strong(v-html="comment.author")
                v-flex(no-wrap=true xs5=true sm3=true)
                  strong(v-html="comment.title")
                v-flex(class="grey--text" ellipsis=true hidden-sm-and-down=true v-if="comment.excerpt") &mdash{{ content.excerpt }}
              v-card
                v-divider
                v-card-text(v-text="comment.content")
            v-dialog(v-model="dialog" persistent=true max-width="400")
              v-card
                v-card-title(class="headline") Kommentar hinzufügen
                v-card-text
                  v-form(ref="form")
                    v-text-field(label="Titel" v-model="title" required=true)
                    v-textarea(label="Inhalt" v-model="content")
                v-card-actions
                  v-spacer
                  v-btn(color="green darken-1" flat=true @click.native="dialog = false") Abbrechen
                  v-btn(color="green darken-1" flat=true @click="submitComment") Hinzufügen
            v-dialog(v-model="topdialog" persistent=true max-width="400")
              v-card
                v-card-title(class="headline") TOP hinzufügen
                v-card-text
                  v-form(ref="form")
                    v-text-field(label="Titel" v-model="title" required=true)
                    v-textarea(label="Beschreibung" v-model="description")
                v-card-actions
                  v-spacer
                  v-btn(color="green darken-1" flat=true @click.native="dialog = false") Abbrechen
                  v-btn(color="green darken-1" flat=true @click="submitTOP") Hinzufügen
            v-dialog(v-model="linkdialog" persistent=true max-width="400")
              v-card
                v-card-title.headline Bestehenden TOP hinzufügen
                v-card-text
                  v-container(fluid=true)
                    v-layout
                      v-flex
                        v-autocomplete(label="Name des TOPs" autocomplete=true :loading="loading" cache-items=true required=true :items="items" :search-input.sync="search" v-model="select" item-text="title" item-value="id" return-object=true)
                v-card-actions
                  v-spacer
                  v-btn(color="green darken-1" flat=true @click.native="linkdialog = false") Abbrechen
                  v-btn(color="green darken-1" flat=true @click="linkTop") Hinzufügen
  v-container(v-else)
    p.text-xs-center
      v-progress-circular(color="accent" indeterminant=true)
</template>
<script lang="ts">
import Vue from "vue"
import Top from '~/components/top.vue'

import Component from 'nuxt-class-component'
import Meeting from '~/components/meeting.vue'
import Comment from '~/components/comment.vue'
import { mapFields } from 'vuex-map-fields'
import { Watch } from "nuxt-property-decorator";
import VueRouter, { Route } from 'vue-router'
import QUERY_MEETING from "./query-meeting.gql"
interface WithRouteAndRouter /* can also extend Vue to make sure nothing is colliding */ {
  $route: Route,
  $router: VueRouter
}
const MeetingProps = Vue.extend({
   components: {
    Top,
    Comment,
    Meeting
  },
  data(){
    return {
      mId:this.$route.params.meeting
    }
  },
  name: 'MeetingView',
  //@ts-ignore
  apollo: {
        meeting: { 
          query: QUERY_MEETING,
        variables(){
          return {
            meeting: this.mId
          }
        }
      }
    }
})
@Component
export default class MeetingView extends MeetingProps implements WithRouteAndRouter {
    menuVisible= false
    dialog= false
    topdialog= false
    linkdialog= false
    title= ''
    content= ''
    description= ''
    select= ''
    items= []
    loading= false
    search= null
    submitComment () {
      this.dialog = false
      this.$store.dispatch('meetings/addComment', {
        title: this.title,
        content: this.content,
        commentable: this.m
      })
    }
    linkTop () {
      this.linkdialog = false
      this.$store.dispatch('meetings/linkTOP', {
        top: this.select,
        meeting: this.m
      })
    }
    submitTOP () {
      this.topdialog = false
      this.$store.dispatch('meetings/addTOP', {
        top: {
          title: this.title,
          description: this.description,
          organization: { id: this.$route.params.organization }
        },
        meeting: this.m
      })
    }
    querySelections () {
      this.loading = true
      // Simulated ajax query
      /* api.getdataTops({organization:this.$route.organization},(data)=>{
        this.items =data
        this.loading=false
      })
      */
    }
  @Watch('search')
    searcher (val:String|null) {
      val && this.querySelections()
    }
  created () {
    
  }
}
</script>
