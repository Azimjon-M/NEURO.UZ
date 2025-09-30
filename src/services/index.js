// services/index.js
import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 20000,
});

// Har doim .data qaytaradi
AxiosInstance.interceptors.response.use(
    (res) => res.data,
    (err) => Promise.reject(err)
);

export default AxiosInstance;
