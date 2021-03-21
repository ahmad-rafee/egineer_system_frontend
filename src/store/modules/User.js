const state={
    profile:null
};
const getters = {
    profile:state=>state.profile
};
const actions={
    register({ commit }, data) {
        this.state.overlay= true;
        this.$axios.post('/add_new_user/', data).then((response) => {
            commit('setUser', response.data);
            this.$axios.defaults.headers.common['Authorization'] ="Bearer "+response.data.token.access_token; 
            this.state.overlay= false;
            let refresh_time= response.data.token.expires_in *1000;
            refresh_time -= parseInt(refresh_time/4);
            setTimeout(()=>{    
                this.dispatch('refresh');
            },refresh_time);
        }).catch(err => {
            this.state.overlay=false;
            console.log(err.data);
            console.log(err);
        });
    },
    get_profile({commit},data){
        this.state.overlay =true;
        this.$axios.get('/profile/'+data.id).then((response)=>{
            commit('setProfile',response.data);
            this.state.overlay=false;
        });
    }
}
const mutations = {
    setUser: (state, data) => {
        state.user = data.user;
        state.token = data.token;
    },
    setProfile:(state,data)=>{
        state.profile = data;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}
