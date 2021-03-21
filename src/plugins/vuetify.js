import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@fortawesome/fontawesome-free/css/all.css'
import fr from 'vuetify/src/locale/ar.ts'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'fa',
  },
  theme: {
    themes: {
      dark: {
        primary: '#1e90ff',
        secondary: '#1e90ff',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
      light: {
        primary: '#1e90ff'
      }
    },
  },
  lang: {
    locales: { fr },
    current: 'fr',
  },
});
