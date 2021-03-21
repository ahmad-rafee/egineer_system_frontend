<template>
      <v-card height="400">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title> 
              <v-icon size="20">fas fa-tag</v-icon>
              Last Categories </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item v-for="item in items" :key="item.title">
          <v-list-item-content>
            <div>
                #Palestine_News
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
  </v-card>
</template>
<script>
export default {
    name:'last-categories',
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