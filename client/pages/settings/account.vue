<template lang="pug">
div
  v-card
    v-img(:src="`http://localhost:4001/attachments/${me.image}`" height="200px")
      v-spacer
      v-btn(fab=true icon=true @click="upload")
        v-icon file_upload
      input(type="file" ref="image" name="image" :accept="'.png'" @change="onFilePicked")
    v-card-title(primary-title=true)
      v-layout(row=true)
        v-flex(xs8=true)
          v-text-field(label="Anzeigename" v-model="me.fullname" required=true)
        v-flex(xs4=true)
          v-text-field(label="Loginname" :value="me.username" disabled=true)
        div
    v-card-actions
      v-spacer
      v-btn(flat=true color="primary" @click="save") Speichern
</template>
<script lang="ts">
import Vue from "vue";
import Component from "nuxt-class-component";
import { mapFields } from "vuex-map-fields";
import gql from "graphql-tag"
const SettingsAccountProps = Vue.extend({
  //@ts-ignore
  apollo: {
      me: gql`{
        me {
          image,
          fullname,
          username,
          id
        }
      }`
    }
});

@Component({
  name: "SettingsAccount"
})
export default class SettingsAccount extends SettingsAccountProps {
  mounted() {
    //done by layout
  }
  upload() {
    // @ts-ignore
    this.$refs.image.click();
  }
  upic: String = "";
  onFilePicked(event: any) {
    const files = event.target.files || event.dataTransfer.files;
    if (files && files[0]) {
      let filename = files[0].name;
      if (filename && filename.lastIndexOf(".") <= 0) {
        return; // return alert('Please add a valid image!')
      }
      const fileReader = new FileReader();
      this.$apollo.mutate({
      mutation: gql`
        mutation($file: Upload!) {
          uploadProfilePicture(file: $file){
            username
            fullname
            image
          }
        }
      `,
      variables: {
        file: files[0]
      },
      update: (store, { data: { uploadProfilePicture } }) => {
       // Read the data from our cache for this query.
        const data = store.readQuery({ query: gql`{
        me {
          image,
          fullname,
          username,
          id
        }
      }`})
        data.me.image = uploadProfilePicture.image
        console.log(data)
        // Write our data back to the cache.
        store.writeQuery({ query: gql`{
        me {
          image,
          fullname,
          username,
          id
        }
      }`, data })
      }
    });
    }
  }
  save() {
    this.$apollo.mutate({
      mutation: gql`
        mutation($fullname: String!) {
          updateCurrentUser(fullname: $fullname){
            username
            fullname
            image
          }
        }
      `,
      variables: {
        fullname: this.me.fullname
      },
      update: (store, { data: { updateCurrentUser } }) => {
       // Read the data from our cache for this query.
        const data = store.readQuery({ query: gql`{
        me {
          image,
          fullname,
          username,
          id
        }
      }`})
        data.me.fullname = updateCurrentUser.fullname
        console.log(data)
        // Write our data back to the cache.
        store.writeQuery({ query: gql`{
        me {
          image,
          fullname,
          username,
          id
        }
      }`, data })
      }
    });
   
  }
}
</script>
<style scoped>
input[type="file"] {
  position: absolute;
  left: -99999px;
}
</style>