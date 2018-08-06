<template lang="slm">
v-dialog :value="visible" persistent=true max-width="500px"
  v-card
    v-card-title
      .headline TOP erstellen
    v-card-text
        v-container grid-list-md=true
          v-layout wrap=true
          v-flex xs12=true
            v-text-field label="Titel" required=true v-model="top.title"
          v-flex xs12=true
            v-text-field label="Beschreibung" required=true v-model="top.description" multi-line=true
    v-card-actions
      v-spacer
      v-btn color="accent" flat=true @click.native='$emit("abort")' Abbrechen
      v-btn color="accent" flat=true @click.native='$emit("save", top)' Speichern

</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
const TopCreateDialogProps = Vue.extend({
  props: ['visible', 'mail', 'organization']
})
@Component({
  name: 'TopCreateDialog'
})
export default class TopCreateDialog extends TopCreateDialogProps {
  data () {
    return {
      top: {
        description: this.mail.attributes.body,
        title: this.mail.attributes.subject,
        submitter: this.mail.attributes.fromname,
        organization: this.organization
      }
    }
  }
}
</script>