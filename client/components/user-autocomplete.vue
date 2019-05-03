<template lang="pug">
v-autocomplete(@input="$emit('input',$event)" cache-items :value="value"  :loading="$apollo.queries.findUsers.loading" :items="findUsers" :search-input.sync="search"  hide-no-data hide-details :label="label" item-text="fullname" return-object)
</template>
<script lang="ts">
import Vue from 'vue'
import gql from 'graphql-tag';
export default Vue.extend({
    props:['label','value'],
    data(){
        return {
            search:this.value?this.value.fullname||"":"",
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
                    text:this.search||this.value.fullname//hack need to return something
                }
            }
        }
    }
})
</script>
