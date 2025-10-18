// src/utils/supportBadge.js
const KEY = 'neuro_support_unread';
const CH_NAME = 'neuro_support_channel';

let bc = null;
try {
    bc = new BroadcastChannel(CH_NAME);
} catch {
    bc = null;
}

export function getUnread() {
    return Number(localStorage.getItem(KEY) || '0') > 0;
}

export function setUnread(flag) {
    const v = flag ? '1' : '0';
    localStorage.setItem(KEY, v);
    if (bc) bc.postMessage({ type: 'unread', value: v });
    // storage event boshqa tablarda ishlaydi; shu tabda ham eshitish uchun custom event
    window.dispatchEvent(
        new CustomEvent('neuro-support-unread', { detail: v })
    );
}

export function incUnread() {
    const cur = Number(localStorage.getItem(KEY) || '0');
    setUnread((cur > 0 ? cur : 0) + 1);
}

export function clearUnread() {
    setUnread(0);
}

export function subscribeUnread(cb) {
    const onStorage = (e) => {
        if (e.key === KEY) cb(Number(e.newValue || '0') > 0);
    };
    const onCustom = (e) => {
        cb(Number(e.detail || '0') > 0);
    };
    const onBC = (msg) => {
        if (msg?.data?.type === 'unread') {
            cb(Number(msg.data.value || '0') > 0);
        }
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('neuro-support-unread', onCustom);
    if (bc) bc.addEventListener('message', onBC);

    // initial
    cb(getUnread());

    return () => {
        window.removeEventListener('storage', onStorage);
        window.removeEventListener('neuro-support-unread', onCustom);
        if (bc) bc.removeEventListener('message', onBC);
    };
}
