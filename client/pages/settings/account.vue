<template lang="pug">
div
  v-card
    v-img(:src="pic?pic:''" height="200px")
      v-spacer
      v-btn(fab=true icon=true @click="upload")
        v-icon file_upload
      input(type="file" ref="image" name="image" :accept="'.png'" @change="onFilePicked")
    v-card-title(primary-title=true)
      v-layout(row=true)
        v-flex(xs8=true)
          v-text-field(label="Anzeigename" v-model="fullname" required=true)
        v-flex(xs4=true)
          v-text-field(label="Loginname" :value="name" disabled=true)
        div
    v-card-actions
      v-spacer
      v-btn(flat=true color="primary" @click="save") Speichern
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import { mapFields } from 'vuex-map-fields'
const SettingsAccountProps = Vue.extend({
  computed: mapFields({
    pic: 'user.attributes.pic',
    name: 'user.attributes.name',
    fullname: 'user.attributes.fullname'
  })
})

@Component({
  name: 'SettingsAccount'
})
export default class SettingsAccount extends SettingsAccountProps {
  mounted () {
    //done by layout
  }
  upload () {
    // @ts-ignore
    this.$refs.image.click()
  }
  upic: String = ''
  onFilePicked (event:any) {
    const files = event.target.files || event.dataTransfer.files
    if (files && files[0]) {
      let filename = files[0].name
      if (filename && filename.lastIndexOf('.') <= 0) {
        return // return alert('Please add a valid image!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.pic = fileReader.result
        console.log(this.pic)
      })
      fileReader.readAsDataURL(files[0])
    }
  }
  save () {
    //trying network
    fetch("/api/users/me", {
      method: 'PATCH', // or 'PUT'
      body: JSON.stringify({data:{attributes: {
            pic: this.pic,
            name: this.name,
            fullname: this.fullname
          },
          id: 'me',
          type: 'user'}}),
      headers:{
        "content-type":"application/vnd.api+json"
      },
      credentials: "same-origin"
    })
  }
}
</script>
<style scoped>
    input[type=file] {
        position: absolute;
        left: -99999px;
    }
</style>