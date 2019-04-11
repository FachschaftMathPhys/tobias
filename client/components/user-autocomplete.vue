<template lang="pug">
v-autocomplete(@input="$emit('input',$event)" value="value" item-value="id" :loading="$apollo.queries.findUsers.loading" :items="findUsers" :search-input.sync="search"  hide-no-data hide-details :label="label" item-text="fullname")
</template>
<script lang="ts">
import Vue from 'vue'
import gql from 'graphql-tag';
export default Vue.extend({
    props:['label','value'],
    data(){
        return {
            search:"",
            user_id:""
        }
    },
    //@ts-ignore
    apollo:{
        findUsers:{
            query:gql`
            query($text:String) {
                findUsers(text:$text){
                    image
                    username
                    fullname
                    id
                }
            }
            `,
            variables(){
                return {
                    text:this.search
                }
            }
        }
    }
})
</script>
