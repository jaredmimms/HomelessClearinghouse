export const axios = require('axios').create({
    // baseURL: process.env.VUE_APP_API_URL ?? 'http://127.0.0.1:5000',
    baseURL: 'http://127.0.0.1:5000',
    responseType: 'json',
    withCredentials: true
});