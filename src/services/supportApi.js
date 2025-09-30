import axios from 'axios';

const BASE = import.meta.env.VITE_SUPPORT_API; // mas: http://10.0.0.75:8000/api/v1/support
if (!BASE) console.log('VITE_SUPPORT_API yo‘q! .env ni tekshiring.');

const supportApi = axios.create({
    baseURL: BASE,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    withCredentials: false,
});

export default supportApi;
