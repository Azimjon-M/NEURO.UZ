// src/components/BolimDetailModal.jsx
import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo,
} from 'react';
import { X } from 'lucide-react';
import useSupportChat from '@/hooks/useSupportChat';
import SupportChatAuthModal from '@/components/SupportChatAuthModal';
import { Languages } from '@/context/LanguageContext';

const T = {
    uz: {
        close: 'Yopish',
        fio: 'F.I.O',
        position: 'Lavozim',
        receptionTime: 'Qabul vaqti',
        enroll: 'Qabulga yozilish',
        chats: 'Sizning yozishmalaringiz',
        status: 'Holat',
        online: '● online',
        queued: 'navbatda…',
        notStarted: 'Chat boshlanmagan.',
        noMessages: 'Hozircha xabar yo‘q',
        inputPh: 'Xabar yozing...',
        send: 'Yuborish',
        signInLead: 'Chatda yozish uchun:',
        signIn: 'Kirish',
        reqAdmission: "Qabulga so'rov",
        iPronoun: 'Men',
        age: 'Yoshim',
        gender: 'Jinsim',
        phone: 'Raqamim',
        male: 'Erkak',
        female: 'Ayol',
        imgAlt: 'Detail rasm',
    },
    ru: {
        close: 'Закрыть',
        fio: 'Ф.И.О',
        position: 'Должность',
        receptionTime: 'Время приёма',
        enroll: 'Записаться на приём',
        chats: 'Ваши переписки',
        status: 'Статус',
        online: '● онлайн',
        queued: 'в очереди…',
        notStarted: 'Чат не начат.',
        noMessages: 'Пока нет сообщений',
        inputPh: 'Напишите сообщение...',
        send: 'Отправить',
        signInLead: 'Чтобы написать в чат:',
        signIn: 'Войти',
        reqAdmission: 'Запрос на прием',
        iPronoun: 'Я',
        age: 'Возраст',
        gender: 'Пол',
        phone: 'Мой номер',
        male: 'Мужчина',
        female: 'Женщина',
        imgAlt: 'Изображение',
    },
    en: {
        close: 'Close',
        fio: 'Full name',
        position: 'Position',
        receptionTime: 'Reception time',
        enroll: 'Request appointment',
        chats: 'Your conversations',
        status: 'Status',
        online: '● online',
        queued: 'queued…',
        notStarted: 'Chat not started.',
        noMessages: 'No messages yet',
        inputPh: 'Type a message...',
        send: 'Send',
        signInLead: 'To write in chat:',
        signIn: 'Sign in',
        reqAdmission: 'Request for admission',
        iPronoun: 'I',
        age: 'Age',
        gender: 'Gender',
        phone: 'Phone',
        male: 'Male',
        female: 'Female',
        imgAlt: 'Detail image',
    },
};

const LOCALE = { uz: 'uz-UZ', ru: 'ru-RU', en: 'en-US' };

export default function BolimDetailModal({
    open,
    onClose,
    data,
    isQabul = false,
}) {
    const { language } = Languages();
    const t = T[language] ?? T.uz;

    // autoResume default: true — localStorage’dan tiklaydi
    const { sessionId, token, status, messages, startChat, sendMessage } =
        useSupportChat({ debug: true });

    const [text, setText] = useState('');
    const [loginOpen, setLoginOpen] = useState(false);
    const listRef = useRef(null);
    const autoSentRef = useRef(false);

    const onlineText = useMemo(() => {
        if (status === 'open') return t.online;
        if (status === 'queued') return t.queued;
        return status || '—';
    }, [status, t]);

    const locFullName = useMemo(
        () => data?.[language]?.full_name ?? data?.uz?.full_name ?? '',
        [data, language]
    );
    const locPosition = useMemo(
        () => data?.[language]?.position ?? data?.uz?.position ?? '',
        [data, language]
    );
    const locReception = useMemo(
        () => data?.[language]?.reception ?? data?.uz?.reception ?? '',
        [data, language]
    );

    const handleSend = (e) => {
        e?.preventDefault?.();
        const txt = text.trim();
        if (!txt) return;

        if (!(sessionId && token)) {
            setLoginOpen(true);
            return;
        }
        try {
            sendMessage(txt);
            setText('');
        } catch (err) {
            console.log(err);
        }
    };

    const handleLoginSubmit = async (form) => {
        try {
            await startChat({
                full_name: form.full_name,
                age: form.age ? Number(form.age) : null,
                gender: form.gender,
                phone: form.phone,
            });
            setLoginOpen(false);
            setTimeout(
                () => document.getElementById('chat-input')?.focus(),
                50
            );
        } catch (err) {
            console.log(err);
        }
    };

    const onReception = useCallback(() => {
        const user_full_name = localStorage.getItem('user_full_name');
        const user_age = localStorage.getItem('user_age');
        const user_gender = localStorage.getItem('user_gender');
        const user_phone = localStorage.getItem('user_phone');

        if (user_full_name && user_age && user_gender && user_phone) {
            const genderLabel = user_gender === 'male' ? t.male : t.female;
            const msg =
                `${t.iPronoun}: ${user_full_name},\n` +
                `${t.age}: ${user_age},\n` +
                `${t.gender}: ${genderLabel},\n` +
                `${t.phone}: ${user_phone}.`;

            if (!(sessionId && token)) {
                setLoginOpen(true);
                return;
            }
            try {
                sendMessage(msg);
                setText('');
            } catch (err) {
                console.log(err);
            }
        } else {
            setLoginOpen(true);
        }
    }, [sessionId, token, sendMessage, t]);

    // Scroll to bottom when messages or open changes
    useEffect(() => {
        try {
            if (open && listRef.current) {
                listRef.current.scrollTop = listRef.current.scrollHeight;
            }
        } catch (err) {
            console.log(err);
        }
    }, [open, messages.length]);

    // 🔁 Avtomatik qabul so‘rovi: faqat bir marta
    useEffect(() => {
        if (open && isQabul && !autoSentRef.current) {
            autoSentRef.current = true;
            onReception();
        }
    }, [open, isQabul, onReception]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4"
            role="dialog"
            aria-modal="true"
            onClick={onClose}
        >
            <div
                className="w-full sm:max-w-2xl bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl shadow-xl ring-1 ring-slate-200/70 dark:ring-slate-700/60 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/60 dark:border-slate-700/60">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100">
                        {locFullName}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-red-100 dark:hover:bg-slate-800 transition cursor-pointer"
                        aria-label={t.close}
                    >
                        <X className="w-5 h-5 text-red-600 dark:text-slate-300" />
                    </button>
                </div>

                {/* Body: rasm + info + Qabulga yozilish */}
                <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="md:col-span-1">
                        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                            {data?.photo_url ? (
                                <img
                                    src={data.photo_url}
                                    alt={t.imgAlt}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full grid place-items-center text-slate-400 dark:text-slate-300">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-12 h-12"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <circle cx="12" cy="8" r="4" />
                                        <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:col-span-2 flex flex-col">
                        <ul className="space-y-2 text-sm leading-relaxed">
                            {locFullName && (
                                <li>
                                    <span className="font-semibold">
                                        {t.fio}:{' '}
                                    </span>
                                    <span>{locFullName}</span>
                                </li>
                            )}
                            {locPosition && (
                                <li>
                                    <span className="font-semibold">
                                        {t.position}:{' '}
                                    </span>
                                    <span>{locPosition}</span>
                                </li>
                            )}
                            {locReception && (
                                <li>
                                    <span className="font-semibold">
                                        {t.receptionTime}:{' '}
                                    </span>
                                    <span>{locReception}</span>
                                </li>
                            )}
                        </ul>

                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={onReception}
                                className="cursor-pointer px-4 py-2 rounded-xl font-semibold bg-[#2464AE] text-white hover:opacity-95 active:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2464AE]"
                            >
                                {t.enroll}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Chat */}
                <div className="px-5 pb-10">
                    <div className="rounded-2xl border border-slate-200/70 dark:border-slate-700/60 overflow-hidden">
                        <div className="px-4 py-2 bg-slate-100/70 dark:bg-slate-800/60 flex items-center justify-between">
                            <div className="text-sm font-semibold">
                                {t.chats}
                            </div>
                            <div className="text-xs text-slate-500">
                                <b>{t.status}:</b> {onlineText}
                            </div>
                        </div>

                        <div
                            className="h-60 md:h-72 overflow-y-auto p-4 space-y-2 bg-white dark:bg-slate-900"
                            ref={listRef}
                        >
                            {sessionId && token ? (
                                messages.length ? (
                                    messages.map((m) => {
                                        const mine = m.sender === 'client';
                                        const ts = new Date(
                                            m.created_at
                                        ).toLocaleString(
                                            LOCALE[language] || 'uz-UZ',
                                            {
                                                dateStyle: 'short',
                                                timeStyle: 'short',
                                            }
                                        );
                                        return (
                                            <div
                                                key={
                                                    m.id ||
                                                    m.created_at + Math.random()
                                                }
                                                className={`flex ${
                                                    mine
                                                        ? 'justify-end'
                                                        : 'justify-start'
                                                }`}
                                            >
                                                <div
                                                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                                                        mine
                                                            ? 'bg-[#2464AE] text-white rounded-br-sm'
                                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-sm'
                                                    }`}
                                                >
                                                    <div>{m.text}</div>
                                                    <div
                                                        className={`mt-1 text-[10px] opacity-70 ${
                                                            mine
                                                                ? 'text-white'
                                                                : 'text-slate-500 dark:text-slate-400'
                                                        }`}
                                                    >
                                                        {ts}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                                        {t.noMessages}
                                    </div>
                                )
                            ) : (
                                <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                                    {t.notStarted}
                                </div>
                            )}
                        </div>

                        <form
                            onSubmit={handleSend}
                            className="relative p-3 bg-slate-50/60 dark:bg-slate-800/40 flex items-center gap-2"
                        >
                            <input
                                id="chat-input"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
                                placeholder={t.inputPh}
                                disabled={!(sessionId && token)}
                            />
                            <button
                                type="submit"
                                className="cursor-pointer inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-[#2464AE] text-white font-semibold hover:opacity-95 active:opacity-90 transition"
                                disabled={!(sessionId && token)}
                            >
                                {t.send}
                            </button>

                            {!(sessionId && token) && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/75 dark:bg-slate-900/75 backdrop-blur-sm">
                                    <div className="text-sm text-slate-700 dark:text-slate-200">
                                        {t.signInLead}{' '}
                                        <button
                                            type="button"
                                            className="cursor-pointer text-[#2464AE] dark:text-blue-300 underline font-semibold"
                                            onClick={() => setLoginOpen(true)}
                                        >
                                            {t.signIn}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            {/* Kirish modal */}
            <SupportChatAuthModal
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
                onSubmit={handleLoginSubmit}
            />
        </div>
    );
}
