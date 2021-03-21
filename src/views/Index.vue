<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      :right="$vuetify.rtl"
      v-if="$store.state.auth.token"
    >
      <v-list flat>
        <v-list-item-group v-model="selected" active-class="primary--text">
          <template v-for="(item, index) in items">
            <v-list-item :key="item.text" link @click="navigate(item)">
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ $t(item.text) }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      :clipped-right="$vuetify.rtl"
      :clipped-left="!$vuetify.rtl"
      color="primary"
      dense
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="mr-12" style="'color:#222222">
        <v-btn text depressed to="/" dark color="#fff" style="font-size:1.5rem;">
            ATHERTIK
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-row align="center" style="max-width: 350px"> </v-row>

      <v-spacer></v-spacer>
      <v-btn color="#ffffff" dark @click="logout" v-if="$store.state.auth.user" icon title="تسجيل الخروج">
        <v-icon>
          fas fa-sign-out-alt
        </v-icon>
      </v-btn>

      <!-- <v-menu :right="$vuetify.rtl" nudge-bottom="40">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar size="40" color="#9d9d9d">
              <v-icon color="#ffffff">mdi-account</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card width="400" style="opacity: 0.95">
          <v-list-item to="/profile">
            <v-list-item-avatar
              ><v-avatar color="red" size="40">43</v-avatar></v-list-item-avatar
            >
            <v-list-item-content>
              <v-list-item-title>Ahmed Rafie</v-list-item-title>
              <v-list-item-subtitle>admin@admin.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          
          <v-divider></v-divider>
          <v-card-text>
            <v-switch
              label="RTL"
              dense
              @change="change_locale(!rtl)"
              :input-value="rtl"
            ></v-switch>
            <v-switch
              label="Dark"
              dense
              prepend-icon="fas fa-adjust"
              @change="change_theme(!dark)"
              :input-value="dark"
            ></v-switch>
          </v-card-text>
        </v-card>
      </v-menu> -->
      <!-- 
      <v-menu :right="$vuetify.rtl" nudge-bottom="40">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar size="40">
              <v-icon color="#ffffff">mdi-bell</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card width="400" style="opacity: 0.95">
          <v-list-item to="/profile">
            <v-list-item-avatar
              ><v-avatar color="red" size="40">43</v-avatar></v-list-item-avatar
            >
            <v-list-item-content>
              <v-list-item-title>Ahmed Rafie</v-list-item-title>
              <v-list-item-subtitle>admin@admin.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-card-text>
            <v-switch
              label="RTL"
              dense
              @change="change_locale(!rtl)"
              :input-value="rtl"
            ></v-switch>
            <v-switch
              label="Dark"
              dense
              prepend-icon="fas fa-adjust"
              @change="change_theme(!dark)"
              :input-value="dark"
            ></v-switch>
          </v-card-text>
        </v-card>
      </v-menu> -->
    </v-app-bar>

    <v-main>
      <v-container fluid class="bg fill-height">
        <v-snackbar v-model="alert.on" timeout="4000">
          {{ alert.text }}

          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
              إغلاق
            </v-btn>
          </template>
        </v-snackbar>
        <v-row justify="center" align="center">
          <keep-alive :include="/form/">
            <router-view></router-view>
          </keep-alive>
        </v-row>
      </v-container>
    </v-main>
    <v-overlay :value="$store.state.overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import routes from "../user_config/sidebar_routes";
export default {
  name: "Index",
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    items: [],
    items2: [
      { picture: 28, text: "Joseph" },
      { picture: 38, text: "Apple" },
      { picture: 48, text: "Xbox Ahoy" },
      { picture: 58, text: "Nokia" },
      { picture: 78, text: "MKBHD" },
    ],
    selected: false,
    snackbar:false
  }),
  created() {
    this.$vuetify.rtl = this.rtl;
    this.$vuetify.theme.dark = this.dark;
  },
  mounted() {
    this.items = routes[this.role];
  },
  computed: {
    bg() {
      return this.background
        ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        : undefined;
    },
    ...mapState({
      dark: (state) => state.theme.dark,
      rtl: (state) => state.rtl,
      swal_config: (state) => state.swal.config,
      swal_on: (state) => state.swal.on,
      role: (state) => state.auth.role,
      alert: (state) => state.alert,
      redirect:(state)=>state.redirect
    }),
  },
  methods: {
    change_locale(value) {
      this.$i18n.set(this.$vuetify.rtl ? "ar" : "en");
      this.$store.commit("changeLocale", value);
    },
    change_theme(value) {
      this.$store.commit("changeTheme", value);
    },
    navigate(item) {
      if (item.inactive) {
        this.$store.dispatch("swal", {
          title: "هذه الميزة قيد التطوير",
          icon: "warning",
          confirmButtonText: "حسنا",
          showCloseButton: true,
        });
      } else {
        this.$router.push(item.to);
      }
    },
    logout() {
      localStorage.clear();
      document.location = "/";
    },
  },
  watch: {
    swal_on: function (val) {
      if (val) {
        this.$swal(this.swal_config).then(() => {
          this.$store.dispatch("swalOff");
        });
      }
    },
    role: function (val) {
      this.items = routes[this.role];
    },
    redirect:function(val){
      this.$router.push({name:val});
    }
  },
};
</script>

<style lang="scss">
$main-color: #c0392b;
$second-color: #aaaaaa;
::selection {
  background: $second-color;
  color: #fff;
}

::-webkit-scrollbar {
  background: #363636;
  width: 7px;
}
::-webkit-scrollbar-thumb {
  -webkit-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  background: $second-color;
}
::-webkit-scrollbar-track {
  -webkit-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-border-radius: 30px;
}
::-webkit-scrollbar-thumb:hover {
  background: $second-color;
}
::-webkit-scrollbar-thumb:active {
  background: $second-color;
}

::-moz-scrollbar {
  background: #363636;
  width: 7px;
}
::-moz-scrollbar-thumb {
  -moz-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  background: $second-color;
}
::-moz-scrollbar-track {
  -moz-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
::-moz-scrollbar-thumb:hover {
  background: $second-color;
}
::-moz-scrollbar-thumb:active {
  background: $second-color;
}

::-o-scrollbar {
  background: #363636;
  width: 7px;
}
::-o-scrollbar-thumb {
  -o-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);

  background: $second-color;
}
::-o-scrollbar-track {
  -o-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -o-border-radius: 30px;
}
::-o-scrollbar-thumb:hover {
  background: $second-color;
}
::-o-scrollbar-thumb:active {
  background: $second-color;
}
.bg {
  background: #e9e9e9 !important;
}
</style>
