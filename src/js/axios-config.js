import axios from 'axios';

// baseURL: 'https://f49a3285.ngrok.io',
var axiosInstance = axios.create({
    baseURL: 'https://api.ludonow.com',
    withCredentials: 'true'
});

module.exports = axiosInstance;