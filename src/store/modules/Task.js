let resource = 'add_contract';
// let parent = 'tenant';
import store from '../index';
import Vue from 'vue';
const state = {
    one: {},
    all: [],
    working:[],
    reminded:[],
    current:[],
    headers: [],
    task_files:[],
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
    working: state => state.working,
    reminded: state => state.reminded,
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
    async getRemindedTasks({ commit }, search) {
        let path = `/get_reminded_tasks_for_all_employees/`;
        const response = await this.$axios.get(path, { params: { page: state.meta.current_page, search } }); commit('setMeta', response.data.meta);
        commit('pushReminded', response.data);
        commit('loadedPosts');
    },
    async show({ commit }, one) {
        
        let path = `/get_task_details/${one}`;
        const response = await this.$axios.get(path);
        commit('setOne', response.data);
    },
    async store({ commit }, data) {
        try {
            
            let path = `/add_project_task/`;
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
    async get_by_project({ commit }, project){
        let path = `/get_project_tasks/${project}`;
        const response = await this.$axios.get(path);
        commit('pushData', response.data);
        commit('loadedPosts');
    },
    async get_by_employee({ commit }, project){
        let path = `/get_tasks_by_employee_id/${project}`;
        const response = await this.$axios.get(path);
        commit('pushData', response.data);
        commit('loadedPosts');
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
    async confirmTask({commit},data){
        let path = `/confirm_task/${data.PK}`;
        const response = await this.$axios.get(path);
        this.dispatch("setAlert",{
            type:"success",
            text:"تمت العملية بنجاح "
        });
    },
    async getTasksDoneByEmployee({commit},id,role){
        let path = `/get_tasks_done_by_employee/${id}`;
        const response = await this.$axios.get(path);
        commit('pushData', response.data,role);
        commit('loadedPosts'); 
    },
    async getCurrentTasksForEmployee({commit},id){
        let path = `/get_current_tasks_for_employee/${id}`;
        const response = await this.$axios.get(path);
        commit('pushCurrent', response.data);
        commit('loadedPosts'); 
    },
    async getTaskFiles({commit},id){
        let path = `/get_task_files/${id}`;
        const response = await this.$axios.get(path);
        commit('pushTaskFiles', response.data);
        commit('loadedPosts'); 
    },
}
const mutations = {
    setAll: (state, all) => state.all = all,
    pushData: (state, data,role) => state.all = role=='Engineer'?data.filter(i=>i.ConfirmedBySuperVisor == false):data,
    pushReminded: (state, data) => state.reminded = data,
    pushCurrent: (state, data) => state.current = data,
    pushWorking: (state, data) => state.working = data,
    pushTaskFiles: (state, data) => state.task_files = data,
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