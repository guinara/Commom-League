import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';


const http = axios.create({
    baseURL: 'https://api.commonleague.online/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json', // Define que o corpo enviado será em JSON
        
    },
});

http.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = sessionStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response && error.response.status === 403) {

        }
        return Promise.reject(error);
    }
);

export default http;
