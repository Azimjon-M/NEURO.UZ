import axios from 'axios';

// .env: VITE_SUPPORT_API=http://10.0.0.43:8000/api/v1/support
const BASE = (import.meta.env.VITE_SUPPORT_API || '').replace(/\/$/, '');

export const http = axios.create({
    baseURL: BASE,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    withCredentials: true, // agent uchun kerak bo'lishi mumkin
});

export function startSupportChat(payload) {
    return http.post('/chats/start/', payload);
}

export function getSupportChatHistory(sessionId, token) {
    return http.get(`/chats/${sessionId}/history/`, { params: { token } });
}
