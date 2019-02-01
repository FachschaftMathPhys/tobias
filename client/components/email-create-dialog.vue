<template lang="pug">
v-dialog :value="visible" persistent=true max-width="500px"
  v-card
    v-card-title
      .headline Email antworten
    v-card-text
        v-container grid-list-md=true
          v-layout wrap=true
          v-flex xs12=true
            v-text-field label="Emailadresse" required=true v-model="email.address"
          v-flex xs12=true
            v-text-field label="Titel" required=true v-model="email.subject"
          v-flex xs12=true
            v-textarea label="Nachricht" required=true v-model="email.body"
    v-card-actions
      v-spacer
      v-btn color="accent" flat=true @click.native='$emit("abort")' Abbrechen
      v-btn color="accent" flat=true @click.native='$emit("save", email)' Senden

</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
const EmailCreateDialogProps = Vue.extend({
  props: ['visible', 'mail', 'organization']
})
@Component({
  name: 'EmailCreateDialog'
})
export default class EmailCreateDialog extends EmailCreateDialogProps {
  data () {
    return {
      email: {
        body: 'Du hast geschrieben:\n' + this.mail.attributes.body,
        subject: 'RE:' + this.mail.attributes.subject,
        address: this.mail.attributes.fromaddress,
        mail: this.mail
      }
    }
  }
}
</script>