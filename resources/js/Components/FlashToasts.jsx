import { usePage } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';

function Toast({ tone, title, message, onClose }) {
    const toneStyles = tone === 'success'
        ? { dot: 'bg-emerald-400', border: 'border-emerald-400/25', title: 'text-emerald-200' }
        : { dot: 'bg-rose-400', border: 'border-rose-400/25', title: 'text-rose-200' };

    return (
        <div className={`glass-card ${toneStyles.border} border rounded-2xl px-4 py-3 shadow-xl`}>
            <div className="flex items-start gap-3">
                <span className={`mt-1.5 h-2 w-2 rounded-full ${toneStyles.dot} flex-shrink-0`} />
                <div className="min-w-0 flex-1">
                    <p className={`text-sm font-semibold ${toneStyles.title}`}>{title}</p>
                    <p className="mt-0.5 text-sm text-white/60 break-words">{message}</p>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg p-1 text-white/45 hover:text-white/80 hover:bg-white/10 transition"
                    aria-label="Dismiss notification"
                >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default function FlashToasts() {
    const { flash } = usePage().props;
    const payload = useMemo(() => ({
        success: flash?.success ?? null,
        error: flash?.error ?? null,
    }), [flash?.success, flash?.error]);

    const lastShownRef = useRef({ success: null, error: null });
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const nextSuccess = payload.success && payload.success !== lastShownRef.current.success;
        const nextError = payload.error && payload.error !== lastShownRef.current.error;
        if (!nextSuccess && !nextError) return;

        const tone = nextSuccess ? 'success' : 'error';
        const message = nextSuccess ? payload.success : payload.error;

        lastShownRef.current = { ...lastShownRef.current, [tone]: message };
        setToast({
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            tone,
            title: tone === 'success' ? 'Success' : 'Something went wrong',
            message,
        });
    }, [payload]);

    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 4200);
        return () => clearTimeout(t);
    }, [toast?.id]);

    if (!toast) return null;

    return (
        <div className="fixed z-50 top-4 right-4 left-4 sm:left-auto sm:w-[380px]">
            <Toast
                tone={toast.tone}
                title={toast.title}
                message={toast.message}
                onClose={() => setToast(null)}
            />
        </div>
    );
}

