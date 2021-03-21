
const state = {
    user: null,
    token: null,
    role:null,
    errors:null
};
const getters = {
    all: state => state.posts
};
const actions = {
    login({ commit }, data) {
        this.state.overlay= true;
        this.$axios.post('/login/', data).then((response) => {
            
            let token = response.data.Token;
            let role = response.data.Role;
            // commit('setUser', data);
            let user = {
                id:response.data.ID,
                name:response.data.Name,
                role
            };
            commit('setToken',token);
            commit('setRole',role);
            commit('setUser',user);
            this.state.overlay= false;
            localStorage.user_data = JSON.stringify({
                token,role,user
            });
            // let refresh_time= data.token.expires_in *1000;
            // refresh_time -= parseInt(refresh_time/4);
            // setTimeout(()=>{    
            //     this.dispatch('refresh');
            // // },refresh_time);
            // document.location="/";
        }).catch(err => {
            this.state.overlay=false;
            commit('setErrors',err.response.data);
        });
    },
    me({ commit }) {
        this.$axios.get('/auth/me').then((response) => {
            commit('setUser', response.data);    
        }).catch(err => {
            console.log(err);
        });
    },
    refresh({ commit }) {
        console.log("refreshing .. ");
        this.$axios.post('/auth/refresh').then((response) => {
            commit('setToken', response.data);
            let refresh_time= response.data.token.expires_in *1000;
            refresh_time -= parseInt(refresh_time/4);
            setTimeout(()=>{    
                this.dispatch('refresh');
            },refresh_time);    
        }).catch(err => {
            console.log(err);
        });
    },
    load({commit},data){
        this.$axios.defaults.headers.common['Authorization'] ="Token "+data.token; 
        commit('setToken',data.token);
        commit('setRole',data.role);
        commit('setUser',data.user);
    },
    async logout({commit}){
        await this.$axios.post("/auth/logout");
        // commit('removeUser');
        commit('removeToken');
        commit('changeLoggedInStatus');
        localStorage.clear();
    }
}
const mutations = {
    setUser: (state, data) => {
        state.user = data;
        state.loggedIn=true;
    },
    setToken: (state,data)=>{
        state.token = data
    },
    setErrors: (state,data)=>{
        state.errors = data;
    },
    changeLoggedInStatus:(state)=>state.loggedIn = false,
    removeToken:(state)=>state.token = null,
    removeUser:(state)=>state.user = null,
    setRole:(state,role)=>state.role = role
}
export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}