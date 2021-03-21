import { kebabCase } from 'lodash';
import Vue from 'vue';
const context = require.context('../components/globals', true, /\.(vue)$/i);
context.keys().map(i=>{
    if(i!='./index.js')
    Vue.component(kebabCase(i.split(".")[1]),context(i).default);
});
export default Vue;