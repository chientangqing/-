import axios from 'axios';

const http=axios.create({
    baseURL:'http://localhost:3000',
    timeout:10000
})
http.defaults.withCredentials = true

http.interceptors.request.use(config=>{
    return config;
}, err => {
    console.log(err)
})
http.interceptors.response.use(data=>{
   
    return data.data
}, err => {
    console.log(err)
})
export default http;
