import axios from 'axios';

export const API_URL = process.env.name === 'prod' ? 'http://table-party.site:4001/api' : 'http://localhost:4001/api';

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
