let resource = 'add_contract';
// let parent = 'tenant';
import store from '../index';
import Vue from 'vue';
const state = {
    one: null,
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
        
        let path = `/get_all_contracts/`;
        const response = await this.$axios.get(path);
        //  commit('setMeta', response.data.meta);
        commit('pushData', response.data);
        // commit('setLinks', response.data.links);
        // if (response.data.length > 0)
        //     commit('setHeaders', Object.keys(response.data[0]).concat(['actions']).map(i => {
        //         return {
        //             value: i,
        //             text: Vue.i18n.translate(i)
        //         };
        //     }));
        commit('loadedPosts');
    },
    async get_confirmed_contracts({ commit }, search) {
        
        let path = `/get_confirmed_contracts/`;
        const response = await this.$axios.get(path);
        //  commit('setMeta', response.data.meta);
        commit('pushData', response.data);
        // commit('setLinks', response.data.links);
        // if (response.data.length > 0)
        //     commit('setHeaders', Object.keys(response.data[0]).concat(['actions']).map(i => {
        //         return {
        //             value: i,
        //             text: Vue.i18n.translate(i)
        //         };
        //     }));
        commit('loadedPosts');
    },
    async show({ commit }, one) {
        let path = `/get_contract_details/${one}`;
        const response = await this.$axios.get(path);
        commit('setOne', response.data);
    },
    async store({ commit }, data) {
        try {
            
            let path = `/contract/add/`;
            const response = await this.$axios.post(path, data);
            // commit('setOne', response.data);
            commit('setOne', response.data.Status);
           this.dispatch("setAlert",{
                type:"success",
                text:"تمت العملية بنجاح "
            });
            this.dispatch("setRedirect","contract.index");
        } catch (error) {
            this.dispatch("setAlert",{
                type:"error",
                text:"يرجى مراجعة المعلومات المدخلة "
            });
        }
    },
    async update({ commit }, data) {
        try {
            
            let path = `/contract/update/`;
            const response = await this.$axios.post(path, data);
           this.dispatch("setAlert",{
                type:"success",
                text:"تمت العملية بنجاح "
            });
            this.dispatch("setRedirect","contract.index");
        } catch (error) {
            this.dispatch("setAlert",{
                type:"error",
                text:"يرجى مراجعة المعلومات المدخلة "
            });
        }
    },
    async delete({ commit }, data) {
        const response = await this.$axios.delete(`/delete_contract/${data}`);
        this.dispatch("setAlert",{
            type:"success",
            text:"تمت العملية بنجاح "
        });
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
    async confirmContract({ commit },contract){
        let response = await this.$axios.post(`/admin_confirm_contract/${contract.PK}`);
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