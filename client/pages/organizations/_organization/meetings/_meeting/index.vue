<template lang="slm">
div
  v-container grid-list-md=true v-if="m"
    v-layout row=true wrap=true
      v-flex sm6=true
        Meeting  :meeting="m"
      v-flex sm6=true
        v-card
          v-card-title class="headline" Sonstige Informationen
          v-card-text
            v-list two-line=true subheader=true
              v-list-tile avatar=true
                v-list-tile-content
                  v-list-tile-title
                    | {{m.attributes.date}}
                  v-list-tile-sub-title Date
              v-list-tile avatar=true
                v-list-tile-content
                  v-list-tile-title
                    | {{m.attributes.clerk}}
                  v-list-tile-sub-title Protokollant
              v-list-tile avatar=true
                v-list-tile-content
                  v-list-tile-title
                    | {{m.attributes.begin}}
                  v-list-tile-sub-title Beginn
              v-list-tile avatar=true
                v-list-tile-content
                  v-list-tile-title
                    | {{m.attributes.end}}
                  v-list-tile-sub-title Ende
    v-speed-dial bottom=true right=true direction="top" fixed=true open-on-hover=true
      v-btn slot="activator" color="blue darken-2" dark=true fab=true hover=true
        v-icon menu
        v-icon close
      v-tooltip left=true
        v-btn fab=true dark=true small=true color="green" slot="activator" :href='"data:text/plainbase64,"+m.attributes.download' download="einladung.tex"
          v-icon file_download
        span Herunterladen
      v-tooltip left=true
        v-btn fab=true dark=true small=true color="green" slot="activator" :to='{name:"organizations-organization-meetings-meeting-edit",params:{organization:$route.params.organization,meeting:$route.params.meeting}}'
          v-icon edit
        span Bearbeiten
      v-tooltip left=true
        v-btn fab=true dark=true small=true color="indigo" slot="activator" @click.native.stop="topdialog = true"
          v-icon note_add
        span TOP hinzufügen
      v-tooltip left=true
        v-btn fab=true dark=true small=true color="indigo" slot="activator" @click.native.stop="linkdialog = true"
          v-icon link
        span TOP verlinken
      v-tooltip left=true
        v-btn fab=true dark=true small=true color="indigo" slot="activator" @click.native.stop="dialog = true"
          v-icon chat
        span Kommentar hinzufügen
    v-container grid-list-md=true
      v-layout row=true wrap=true
        v-flex md6=true
          h3 Aktuelle Tops
          div v-for="action in m.actions"
            v-flex xs12=true
              Top :top="action.top"
        v-flex md6=true v-if="m.relationships"
          h3 Aktuelle Kommentare (zur Zeit deaktiviert)
          v-expansion-panel popout=true
            v-expansion-panel-content hide-actions=true v-if="m.relationships.comments" v-for="(comment, i) in m.relationships.comments" :key="i"
              v-layout align-center=true row=true spacer=true slot="header"
                v-flex xs4=true sm2=true md1=true
                  v-avatar size="36px" slot="activator"
                    img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" alt="comment.author" v-if="comment.avatar"
                    v-icon color="orange" account_circle
                v-flex sm5=true md3=true hidden-xs-only=true
                  strong v-html="comment.author"
                v-flex no-wrap=true xs5=true sm3=true
                  strong v-html="comment.title"
                v-flex class="grey--text" ellipsis=true hidden-sm-and-down=true v-if="comment.excerpt"
                  | &mdash
                  | {{ content.excerpt }}
              v-card
                v-divider
                v-card-text v-text="comment.content"
            v-dialog v-model="dialog" persistent=true max-width="400"
              v-card
                v-card-title class="headline" Kommentar hinzufügen
                v-card-text
                  v-form  ref="form"
                    v-text-field label="Titel" v-model="title" required=true
                    v-text-field label="Inhalt" v-model="content" multi-line=true
                v-card-actions
                  v-spacer
                  v-btn color="green darken-1" flat=true @click.native="dialog = false" Abbrechen
                  v-btn color="green darken-1" flat=true @click="submitComment" Hinzufügen
            v-dialog v-model="topdialog" persistent=true max-width="400"
              v-card
                v-card-title class="headline" TOP hinzufügen
                v-card-text
                  v-form  ref="form"
                    v-text-field label="Titel" v-model="title" required=true
                    v-text-field label="Beschreibung" v-model="description" multi-line=true
                v-card-actions
                  v-spacer
                  v-btn color="green darken-1" flat=true @click.native="dialog = false" Abbrechen
                  v-btn color="green darken-1" flat=true @click="submitTOP" Hinzufügen
            v-dialog v-model="linkdialog" persistent=true max-width="400"
              v-card
                v-card-title class="headline" Bestehenden TOP hinzufügen
                v-card-text
                  v-container fluid=true
                    v-layout
                      v-flex
                        v-select label="Name des TOPs" autocomplete=true :loading="loading" cache-items=true required=true :items="items" :search-input.sync="search" v-model="select" item-text="title" item-value="id" return-object=true
                v-card-actions
                  v-spacer
                  v-btn color="green darken-1" flat=true @click.native="linkdialog = false" Abbrechen
                  v-btn color="green darken-1" flat=true @click="linkTop" Hinzufügen
  v-container v-else=true
    p.text-xs-center
      v-progress-circular color="accent" indeterminant=true
</template>
<script lang="ts">
import Top from '~/components/top.vue'
import Meeting from '~/components/meeting.vue'
import Comment from '~/components/comment.vue'
import { mapFields } from 'vuex-map-fields'
export default {
  name: 'Meetings',
  data: () => ({
    menuVisible: false,
    dialog: false,
    topdialog: false,
    linkdialog: false,
    title: '',
    content: '',
    description: '',
    select: '',
    items: [],
    loading: false,
    search: null
  }),
  components: {
    Top,
    Comment,
    Meeting
  },
  methods: {
    submitComment () {
      this.dialog = false
      this.$store.dispatch('meetings/addComment', {
        title: this.title,
        content: this.content,
        commentable: this.m
      })
    },
    linkTop () {
      this.linkdialog = false
      this.$store.dispatch('meetings/linkTOP', {
        top: this.select,
        meeting: this.m
      })
    },
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
    },
    querySelections (v) {
      this.loading = true
      // Simulated ajax query
      /* api.getTops({organization:this.$route.organization},(data)=>{
        this.items =data
        this.loading=false
      })
      */
    }
  },
  watch: {
    search (val) {
      val && this.querySelections(val)
    }
  },
  computed: mapFields({
    m: 'meeting'
  }),
  created () {
    this.$store.dispatch('fetchOne', {
      model: 'meeting',
      id: this.$route.params.meeting
    })
  }
}
</script>