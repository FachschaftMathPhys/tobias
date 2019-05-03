<template lang="pug">
v-chip(v-if="user")
    v-avatar
        img(v-if="user.image" :src="`http://localhost:4001/attachments/${user.image}`")
        v-icon(color="orange" dark=true x-large=true v-else) account_circle
    span {{user.fullname}}
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props:["user"]
})
</script>
