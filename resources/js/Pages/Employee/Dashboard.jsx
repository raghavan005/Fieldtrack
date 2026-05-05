import Loader from '@/Components/Loader';
import VisitDetailsModal from '@/Components/VisitDetailsModal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) { reject(new Error('Geolocation is not supported by your browser.')); return; }
        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000 });
    });
}

function AttendanceCard({ activeAttendance }) {
    const [loading, setLoading] = useState(false);
    const [geoError, setGeoError] = useState('');
    const isClockedIn = !!activeAttendance;

    async function handleClockIn() {
        setGeoError(''); setLoading(true);
        try {
            const pos = await getCurrentPosition();
            router.post(route('employee.attendance.clock-in'), { lat: pos.coords.latitude, lng: pos.coords.longitude }, { onFinish: () => setLoading(false) });
        } catch (err) { setGeoError(err.message || 'Could not get location.'); setLoading(false); }
    }

    async function handleClockOut() {
        setGeoError(''); setLoading(true);
        router.post(route('employee.attendance.clock-out'), {}, { onFinish: () => setLoading(false) });
    }

    return (
        <div className="glass-card relative rounded-3xl overflow-hidden">
            <div className={`h-1 w-full ${isClockedIn ? 'bg-gradient-to-r from-green-400 to-emerald-400' : 'bg-gradient-to-r from-white/15 to-white/5'}`} />
            <div className="p-5 sm:p-7">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3 className="text-base font-bold text-white">Attendance</h3>
                        <p className="text-xs text-white/40 mt-0.5">Today's status</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${isClockedIn ? 'bg-green-500/15 border-green-400/30 text-green-300' : 'bg-white/8 border-white/12 text-white/45'}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${isClockedIn ? 'bg-green-400 animate-pulse' : 'bg-white/25'}`} />
                        {isClockedIn ? 'Clocked In' : 'Not Clocked In'}
                    </span>
                </div>

                {isClockedIn && (
                    <p className="text-sm text-white/45 mb-5">
                        Since <span className="font-semibold text-brand-cream">{new Date(activeAttendance.clock_in_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </p>
                )}

                {geoError && <div className="mb-4 glass rounded-xl px-4 py-2.5 text-sm text-red-300">{geoError}</div>}

                {!isClockedIn ? (
                    <button onClick={handleClockIn} disabled={loading}
                        className="w-full rounded-2xl bg-gradient-to-r from-brand-red to-brand-coral py-3.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50 transition shadow-lg flex items-center justify-center gap-3">
                        {loading ? <><Loader size="20" speed="2.5" color="white" />Getting location…</> : 'Clock In'}
                    </button>
                ) : (
                    <button onClick={handleClockOut} disabled={loading}
                        className="w-full rounded-2xl bg-gradient-to-r from-brand-coral to-brand-peach py-3.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50 transition shadow-lg flex items-center justify-center gap-3">
                        {loading ? <><Loader size="20" speed="2.5" color="white" />Processing…</> : 'Clock Out'}
                    </button>
                )}
            </div>
        </div>
    );
}

function CustomerVisitForm() {
    const [form, setForm] = useState({ customer_name: '', remarks: '' });
    const [loading, setLoading] = useState(false);
    const [geoError, setGeoError] = useState('');
    const [errors, setErrors] = useState({});

    async function handleSubmit(e) {
        e.preventDefault(); setGeoError(''); setErrors({}); setLoading(true);
        try {
            const pos = await getCurrentPosition();
            router.post(route('employee.customer-visits.store'),
                { customer_name: form.customer_name, remarks: form.remarks, lat: pos.coords.latitude, lng: pos.coords.longitude },
                { onSuccess: () => setForm({ customer_name: '', remarks: '' }), onError: (errs) => setErrors(errs), onFinish: () => setLoading(false) }
            );
        } catch (err) { setGeoError(err.message || 'Could not get location.'); setLoading(false); }
    }

    return (
        <div className="glass-card relative rounded-3xl overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-brand-coral to-brand-cream" />
            <div className="p-5 sm:p-7">
                <div className="mb-5">
                    <h3 className="text-base font-bold text-white">Log Customer Visit</h3>
                    <p className="text-xs text-white/40 mt-0.5">Location captured automatically on submit</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-white/55 mb-1.5 uppercase tracking-wide">
                            Customer Name <span className="text-brand-coral">*</span>
                        </label>
                        <input type="text" value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                            className="glass-input w-full rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400"
                            placeholder="Enter customer name" required />
                        {errors.customer_name && <p className="mt-1 text-xs text-red-400">{errors.customer_name}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-white/55 mb-1.5 uppercase tracking-wide">Remarks</label>
                        <textarea value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} rows={3}
                            className="glass-input w-full rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 resize-none"
                            placeholder="Notes about the visit…" />
                        {errors.remarks && <p className="mt-1 text-xs text-red-400">{errors.remarks}</p>}
                    </div>
                    {geoError && <div className="glass rounded-xl px-4 py-2.5 text-sm text-red-300">{geoError}</div>}
                    <button type="submit" disabled={loading}
                        className="w-full rounded-2xl bg-gradient-to-r from-brand-red to-brand-coral py-3.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50 transition shadow-lg flex items-center justify-center gap-3">
                        {loading ? <><Loader size="20" speed="2.5" color="white" />Capturing location…</> : 'Submit Visit'}
                    </button>
                </form>
            </div>
        </div>
    );
}

function RecentVisits({ visits }) {
    const [selected, setSelected] = useState(null);
    return (
        <div className="glass-card relative rounded-3xl overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-brand-red via-brand-coral to-brand-peach" />
            <div className="p-5 sm:p-7">
                <div className="flex items-center justify-between gap-3 mb-5">
                    <h3 className="text-base font-bold text-white">Recent Visits</h3>
                    <p className="text-xs text-white/35">{visits.length} total</p>
                </div>
                {visits.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="mx-auto mb-3 h-12 w-12 rounded-2xl glass flex items-center justify-center">
                            <svg className="h-6 w-6 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <p className="text-sm text-white/30">No visits recorded yet.</p>
                    </div>
                ) : (
                    <>
                        {/* Mobile: clean cards + popup details */}
                        <div className="sm:hidden space-y-3">
                            {visits.map((v) => (
                                <button
                                    key={v.id}
                                    type="button"
                                    onClick={() => setSelected(v)}
                                    className="w-full text-left glass rounded-2xl border border-white/10 px-4 py-3 hover:bg-white/10 transition"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-white truncate">{v.customer_name}</p>
                                            <p className="mt-0.5 text-xs text-white/40">{new Date(v.created_at).toLocaleString()}</p>
                                        </div>
                                        <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/65">
                                            View
                                        </span>
                                    </div>
                                    <p className="mt-2 text-sm text-white/55 overflow-hidden max-h-10">
                                        {v.remarks || 'No remarks'}
                                    </p>
                                </button>
                            ))}
                        </div>

                        {/* Desktop: clearer table + View action */}
                        <div className="hidden sm:block overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="pb-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-white/35">Customer</th>
                                        <th className="pb-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-white/35">Remarks</th>
                                        <th className="pb-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-white/35">Time</th>
                                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wide text-white/35">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {visits.map((v) => (
                                        <tr key={v.id} className="hover:bg-white/5 transition">
                                            <td className="py-3 pr-4 font-semibold text-white whitespace-nowrap">{v.customer_name}</td>
                                            <td className="py-3 pr-4 text-white/50 max-w-md">
                                                <span className="block max-w-md truncate">{v.remarks || '—'}</span>
                                            </td>
                                            <td className="py-3 pr-4 text-white/35 whitespace-nowrap text-xs">{new Date(v.created_at).toLocaleString()}</td>
                                            <td className="py-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelected(v)}
                                                    className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-semibold text-brand-cream hover:bg-white/15 transition"
                                                >
                                                    Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>

            <VisitDetailsModal
                show={!!selected}
                onClose={() => setSelected(null)}
                visit={selected}
                variant="employee"
            />
        </div>
    );
}

export default function EmployeeDashboard({ activeAttendance, recentVisits }) {
    const { auth } = usePage().props;
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl glass flex items-center justify-center">
                        <svg className="h-4 w-4 text-white/75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-white">Employee Dashboard</h2>
                        <p className="text-xs text-white/40">Welcome back, {auth.user.name}</p>
                    </div>
                </div>
            }
        >
            <Head title="Employee Dashboard" />
            <div className="py-6 sm:py-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-5">
                    <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                        <AttendanceCard activeAttendance={activeAttendance} />
                        <CustomerVisitForm />
                    </div>
                    <RecentVisits visits={recentVisits} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
