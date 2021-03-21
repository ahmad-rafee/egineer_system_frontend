let resource = 'add_contract';
// let parent = 'tenant';
import store from '../index';
import Vue from 'vue';
const state = {
    one: {},
    all: [],
    headers: [],
    meta: {
        current_page: 1
    },
    links: {},
    loaded: false,
    errors: {},
    error:{},
    store_done: false,
    update_done:false,
    headers: [],
};
const getters = {
    all: state => state.all,
    one: state => state.one,
    headers: state => state.headers

};
const actions = {
    async index({ commit }, search) {
        
        let path = `/get_all_contracts`;
        const response = await this.$axios.get(path, { params: { page: state.meta.current_page, search } }); commit('setMeta', response.data.meta);
        commit('pushData', response.data);
        commit('loadedPosts');
    },
    async show({ commit }, one) {
        
        let path = `/${resource}`;
        if (user.role == 'tenant') {
            path = `/${parent}/${user.info.id}${path}`;
        }
        const response = await this.$axios.get(path);
        commit('setOne', response.data);
    },
    async store({ commit }, data) {
        try {
            let path = `/add_payment/`;
            const response = await this.$axios.post(path, data);
           this.dispatch("setAlert",{
                type:"success",
                text:"تمت العملية بنجاح "
            });
        } catch (error) {
            this.dispatch("setAlert",{
                type:"error",
                text:"يرجى مراجعة المعلومات المدخلة "
            });
        }
    },
    async update({ commit }, data) {
        try {
            commit('setOne',data);
            const response = await this.$axios.put(`/${resource}/${data.id}/update`, this.state.one);
            commit('setOne', response.data);
        } catch (error) {
            console.log('err');
        }
    },
    async delete({ commit }, data) {
        const response = await this.$axios.delete(`/${resource}/${data.id}`, data);
        commit('setOne', response.data);
    },
    changeCurrentPage({ commit }, current_page) {
        commit('setCurrentPage', current_page);
    },
    flipPage({ commit, dispatch }) {
        commit('goNext');
        dispatch('index');
    },
    clearStoreEvent({ commit }) {
        commit('clearStoreEvent');
        commit('clearErrors');
    },
    async get_by_contract({ commit },contract_id){
        let response = await this.$axios.get(`/get_payments_of_contract/${contract_id}`);
        commit('pushData', response.data);
        commit('loadedPosts');
    },
    async confirmPayment({commit},id){
        let response = await this.$axios.get(`/confirm_payment/${id}`);
        this.dispatch("setAlert",{
            type:"success",
            text:"تمت العملية بنجاح "
        });

    }
}
const mutations = {
    setAll: (state, all) => state.all = all,
    pushData: (state, data) => state.all = data,
    setOne: (state, one) => state.one = one,
    setMeta: (state, meta) => state.meta = meta,
    goNext: (state) => state.meta.current_page += 1,
    setLinks: (state, links) => state.links = links,
    loadedPosts: (state) => state.loaded = true,
    setHeaders: (state, headers) => state.headers = headers,
    setErrors: (state, errors) => state.errors = errors,
    setStoreEvent: (state) => {
        state.store_done = true;
        this.dispatch("setAlert",{
            type:"success",
            text:"تمت العملية بنجاح "
        });
    },
    clearStoreEvent: (state) => state.store_done = false,
    clearErrors: (state) => state.errors = {}
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}