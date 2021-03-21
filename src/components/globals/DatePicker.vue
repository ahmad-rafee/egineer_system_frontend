<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template
      v-slot:activator="{
        on,
        attrs,
      }"
    >
      <v-text-field
        v-model="date"
        :label="label"
        prepend-inner-icon="fas fa-calendar"
        v-bind="attrs"
        readonly
        v-on="on"
        outlined
        rounded
        dense
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      @input="menu = false;updateDate(date)"
      :locale="$root.locale"
     
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
    props:['model','label'],
    data(){
      return{
        menu:false,
        date:null
      }
    },
    mounted(){
        if(this.$props.model){
            this.model = this.$props.model;
        }
        if(this.$props.label){
            this.label = this.$props.label;
        }
    },
    methods:{
      updateDate(date){
        this.$emit('input',date);
      }
    }
};
</script>

<style>
</style>