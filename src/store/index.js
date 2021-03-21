import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules';
Vue.use(Vuex)
import Vuetify from '../plugins/vuetify';
export default new Vuex.Store({
  state: {
    overlay: false,
    theme: {
      dark: false,
    },
    rtl: true,
    swal: {
      on: false,
      config: {},
    },
    alert: {
      text: "",
      type: "success",
      on: false
    },
    redirect:""
  },
  mutations: {
    changeLocale(state, value) {
      state.rtl = value;
      Vuetify.framework.rtl = value;
    },
    changeTheme(state, value) {
      state.theme.dark = value;
      Vuetify.framework.theme.dark = value;
    },
    setSwalConfig(state, config) {
      state.swal.config = config;
    },
    setSwalOn(state) {
      state.swal.on = true;
    },
    setSwalOff(state) {
      state.swal.on = false;
    },
    setAlert(state, alert) {
      state.alert.text = alert.text;
      state.alert.type = alert.type;
      state.alert.on = true;
    },
    clearAlert(state) {
      state.alert.on = false;
    },
    setRedirect(state,url) {
     state.redirect =  url;
    }
  },
  actions: {
    swal({ commit }, config) {
      commit('setSwalConfig', config);
      commit('setSwalOn');
    },
    swalOff({ commit }) {
      commit('setSwalOff');
    },
    setAlert({ commit }, alert) {
      commit('setAlert', alert);
    },
    clearAlert({ commit }) {
      commit('clearAlert');
    },
    setRedirect({ commit }, url) {
      commit('setRedirect', url)
    }
  },
  modules: {
    ...modules
  }
})
