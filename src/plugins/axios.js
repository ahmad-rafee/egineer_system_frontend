import axios from 'axios';
const baseURL = 'http://172.86.75.235:8000/';
export default axios.create({
    baseURL,
    headers:{
        'Content-Type':'application/json',
    }
});
// export default $axios;