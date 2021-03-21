<template>
    <router-view id="main_view"></router-view>
</template>

<script>
export default {
  name: "App",
mounted(){
  this.$vuetify.lang.current = 'fr'
}
};
</script>
<style  scoped>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@600&display=swap');
#main_view{
  font-family: 'Cairo', sans-serif;
  font-size: 25x;
  font-weight: bold;
}
</style>
