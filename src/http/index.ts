import axios from "axios";

const http = axios.create({
    baseURL: 'https://ec2-15-228-202-112.sa-east-1.compute.amazonaws.com:8080/',
    headers: {
        Accept: 'application/json',
      
    }
});

http.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

http.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response && error.response.status === 403) {
        // Remove o token do cache
       // sessionStorage.removeItem('token');
    }
    return Promise.reject(error);
});

export default http;
