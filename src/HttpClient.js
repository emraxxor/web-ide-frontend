import axios from 'axios';

const instance = axios.create({
    //baseURL: 'http://localhost:8090/'
    proxy : {
        host: 'localhost',
        port: 8090
    }
});

export const HttpRestClient = instance

export default instance;