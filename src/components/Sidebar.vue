<template>
  <div  v-if="!$store.state.overlay" >
    <!-- <v-list-item-title fixed>
    <top-trinding class="sidebar_menu" ></top-trinding>
  </v-list-item-title>
  <v-list-item-title>
    <last-categories class="sidebar_menu"></last-categories>
  </v-list-item-title> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Photos", icon: "mdi-image" },
        { title: "About", icon: "mdi-help-box" },
      ],
      right: null,
    };
  },
};
</script>
<style lang="css">
   .sidebar_menu{
       margin-bottom: 10px;
   } 
</style>