<template>
    <v-row  align="center" justify="center"  v-if="!$store.state.overlay">
      
    </v-row>
</template>
<script>

import  { mapActions,mapGetters } from 'vuex';
export default {
    name:'main',
    methods:{
        ...mapActions(['all_posts'])
    },
    data(){
        return{
            
        }
    },
    mounted(){
        this.all_posts();
    },
    computed:{
        ...mapGetters(['posts']),
    }
}
</script>