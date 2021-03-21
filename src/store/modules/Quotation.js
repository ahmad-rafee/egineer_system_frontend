import axios from 'axios';
const state ={
    post:{},
    posts:[],
    post_get:false
};
const getters = {
    posts:state=>state.posts,
};
const actions = {
    async add_quotation({commit},data){
        this.state.overlay=true;
        const response = await this.$axios.post('/add_price_offer/',data);
        this.state.overlay=false;
        // this.state.post_get=false;
        commit('setAll',response.data);
        this.dispatch("setAlert",{
            type:"success",
            text:"تمت العملية بنجاح "
        });
    },
    async store({commit},post){
        const response = await axios.post('/category/1/post',{post});
        commit('newPost',response.data);
    },
    async show({commit},post){
        const response = await this.$axios.get(`/category/${post.category}/post/${post.id}`);
        commit('post',response.data);
    }
}
const mutations = {
    setAll:(state,posts)=>state.posts = posts,
    newPost:(state,post)=>state.posts.push(post),
    post:(state,post)=>state.post=post
}
export default{
    state,
    getters,
    actions,
    mutations
}