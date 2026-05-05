import Modal from '@/Components/Modal';

function formatDateTime(value) {
    try { return new Date(value).toLocaleString(); } catch { return '—'; }
}

function FieldRow({ label, value }) {
    return (
        <div className="flex items-start justify-between gap-4 py-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/35">{label}</p>
            <p className="text-sm text-white/75 text-right break-words max-w-[70%]">{value ?? '—'}</p>
        </div>
    );
}

export default function VisitDetailsModal({ show, onClose, visit, variant = 'employee' }) {
    const isManager = variant === 'manager';
    const coords = visit?.lat && visit?.lng ? `${Number(visit.lat).toFixed(5)}, ${Number(visit.lng).toFixed(5)}` : null;
    const mapHref = coords ? `https://www.google.com/maps?q=${visit.lat},${visit.lng}` : null;

    return (
        <Modal
            show={show}
            onClose={onClose}
            maxWidth="lg"
            panelClassName="bg-transparent shadow-none"
            overlayClassName="bg-black/60 backdrop-blur-sm"
        >
            <div className="glass-card border border-white/15 rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between gap-3">
                    <div>
                        <p className="text-sm font-bold text-white">Visit details</p>
                        <p className="text-xs text-white/45">{formatDateTime(visit?.created_at)}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl p-2 text-white/55 hover:text-white hover:bg-white/10 transition"
                        aria-label="Close"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="px-5 py-4 divide-y divide-white/10">
                    {isManager && (
                        <FieldRow label="Employee" value={visit?.user?.name ?? '—'} />
                    )}
                    <FieldRow label="Customer" value={visit?.customer_name ?? '—'} />
                    <FieldRow label="Remarks" value={visit?.remarks || '—'} />
                    <FieldRow label="Time" value={formatDateTime(visit?.created_at)} />
                    <FieldRow label="Coordinates" value={coords ?? '—'} />
                </div>

                <div className="px-5 py-4 flex items-center justify-end gap-2">
                    {mapHref && (
                        <a
                            href={mapHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl glass px-4 py-2 text-sm font-semibold text-brand-cream hover:bg-white/15 transition"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Open in Maps
                        </a>
                    )}
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/15 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
}

