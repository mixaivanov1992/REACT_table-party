import axios from 'axios';

export const API_URL = 'http://localhost:4001/api';
// export const API_URL = 'http://176.119.158.168:4001/api';
const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    // eslint-disable-next-line
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

export default $api;
