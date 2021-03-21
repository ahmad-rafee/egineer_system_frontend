import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from './plugins/axios';
import vuexI18n from 'vuex-i18n';
import translationsEn from './translations/translationsEn';
import translationsAr from './translations/translationsAr';
import global_components from './plugins/global_components';
import vue_sweeralert2 from './plugins/vue_sweetalert2';

Vue.config.productionTip = false
store.$axios=axios;
Vue.use(vuexI18n.plugin,store,{
  moduleName: 'i18n',
  translateFilterName: 't',
});
Vue.i18n.add('en', translationsEn);
Vue.i18n.add('ar', translationsAr);
Vue.i18n.set('ar');
new Vue({
  router,
  store,
  vuetify,
  global_components,
  render: h => h(App),
  breakpoint: {
    thresholds: {
      xs: 340,
      sm: 540,
      md: 800,
      lg: 1280,
    },
    scrollBarWidth: 24,
  },
}).$mount('#app')
if(localStorage.user_data){
  store.dispatch('auth/load',JSON.parse(localStorage.user_data));
}

