// LS yordamchi: hamma joyda bir xil kalit/format
const KEY = 'support_chat_session';

export function getChatSessionLS() {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return null;
        const data = JSON.parse(raw);
        // kutilgan maydonlar: { id, token, user: { full_name, age, gender, phone }, ... }
        if (data && data.id && data.token) return data;
        return null;
    } catch {
        return null;
    }
}

export function setChatSessionLS(payload) {
    try {
        localStorage.setItem(KEY, JSON.stringify(payload));
    } catch (err) {
        console.log(err);
    }
}

export function clearChatSessionLS() {
    try {
        localStorage.removeItem(KEY);
    } catch (err) {
        console.log(err);
    }
}
