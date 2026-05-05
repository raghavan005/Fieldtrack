import Loader from '@/Components/Loader';
import VisitDetailsModal from '@/Components/VisitDetailsModal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from 'react';

function StatCard({ label, value, gradient, icon }) {
    return (
        <div className="glass-card relative rounded-3xl overflow-hidden">
            <div className={`h-1 w-full ${gradient}`} />
            <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/40">{label}</p>
                    <p className="mt-1 text-3xl sm:text-4xl font-extrabold text-white leading-none">{value}</p>
                </div>
                <div className="h-12 w-12 rounded-2xl glass flex items-center justify-center">{icon}</div>
            </div>
        </div>
    );
}

function EmployeeMap({ apiKey, initialLocations }) {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef({});
    const [locations, setLocations] = useState(initialLocations);
    const [mapError, setMapError] = useState('');
    const [mapLoading, setMapLoading] = useState(true);

    useEffect(() => {
        if (!apiKey) { setMapError('Add GOOGLE_MAPS_API_KEY to your .env to enable the live map.'); setMapLoading(false); return; }
        if (window.google?.maps) { initMap(); return; }
        const scriptId = 'google-maps-script';
        if (document.getElementById(scriptId)) return;
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=__initGoogleMap`;
        script.async = true; script.defer = true;
        window.__initGoogleMap = () => { initMap(); delete window.__initGoogleMap; };
        script.onerror = () => { setMapError('Failed to load Google Maps.'); setMapLoading(false); };
        document.head.appendChild(script);
    }, [apiKey]);

    // Keep markers in sync when the page props refresh.
    useEffect(() => {
        setLocations(initialLocations);
        updateMarkers(initialLocations);
    }, [initialLocations, updateMarkers]);

    function initMap() {
        if (!mapRef.current || mapInstanceRef.current) return;
        const center = locations.length > 0 ? { lat: locations[0].lat, lng: locations[0].lng } : { lat: 20.5937, lng: 78.9629 };
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
            zoom: locations.length > 0 ? 12 : 5, center,
            mapTypeControl: false, streetViewControl: false, fullscreenControl: false,
            styles: [
                { elementType: 'geometry', stylers: [{ color: '#1a0500' }] },
                { elementType: 'labels.text.stroke', stylers: [{ color: '#1a0500' }] },
                { elementType: 'labels.text.fill', stylers: [{ color: '#8a6a5a' }] },
                { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#3a1000' }] },
                { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0d1117' }] },
                { featureType: 'poi', stylers: [{ visibility: 'off' }] },
                { featureType: 'transit', stylers: [{ visibility: 'off' }] },
            ],
        });
        setMapLoading(false);
        updateMarkers(locations);
    }

    const updateMarkers = useCallback((locs) => {
        if (!mapInstanceRef.current) return;
        const currentIds = new Set(locs.map((l) => l.id));
        Object.keys(markersRef.current).forEach((id) => {
            if (!currentIds.has(Number(id))) { markersRef.current[id].setMap(null); delete markersRef.current[id]; }
        });
        locs.forEach((loc) => {
            const position = { lat: loc.lat, lng: loc.lng };
            if (markersRef.current[loc.id]) {
                markersRef.current[loc.id].setPosition(position);
            } else {
                const marker = new window.google.maps.Marker({
                    position, map: mapInstanceRef.current, title: loc.name,
                    label: { text: loc.name.charAt(0).toUpperCase(), color: 'white', fontWeight: 'bold', fontSize: '13px' },
                    icon: { path: window.google.maps.SymbolPath.CIRCLE, scale: 20, fillColor: '#FA4032', fillOpacity: 1, strokeColor: 'rgba(254,243,226,0.6)', strokeWeight: 2.5 },
                });
                const infoWindow = new window.google.maps.InfoWindow({
                    content: `<div style="font-family:system-ui;padding:8px 12px;background:#1a0500;color:white;border-radius:8px;min-width:140px">
                        <strong style="color:#FEF3E2;font-size:13px">${loc.name}</strong><br/>
                        <span style="font-size:11px;color:rgba(255,255,255,0.4)">${loc.lat.toFixed(5)}, ${loc.lng.toFixed(5)}</span>
                    </div>`,
                });
                marker.addListener('click', () => infoWindow.open(mapInstanceRef.current, marker));
                markersRef.current[loc.id] = marker;
            }
        });
    }, []);

    if (mapError) {
        return (
            <div className="flex h-72 items-center justify-center rounded-2xl glass">
                <div className="text-center px-6">
                    <div className="mx-auto mb-3 h-12 w-12 rounded-2xl glass flex items-center justify-center">
                        <svg className="h-6 w-6 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                    </div>
                    <p className="text-sm text-white/35">{mapError}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            {mapLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl glass">
                    <Loader size="45" speed="2.5" color="#FF3737" />
                </div>
            )}
            <div ref={mapRef} className="h-72 w-full rounded-2xl overflow-hidden" />
            {!mapLoading && locations.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <p className="text-sm text-white/35 glass rounded-full px-4 py-2">No employees currently clocked in</p>
                </div>
            )}
        </div>
    );
}

function ClockedInList({ employees }) {
    if (!employees.length) {
        return (
            <div className="text-center py-10">
                <div className="mx-auto mb-3 h-12 w-12 rounded-2xl glass flex items-center justify-center">
                    <svg className="h-6 w-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <p className="text-sm text-white/30">No employees clocked in.</p>
            </div>
        );
    }
    return (
        <ul className="divide-y divide-white/5">
            {employees.map((emp) => (
                <li key={emp.id} className="flex items-center justify-between py-3.5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-red to-brand-coral text-white text-sm font-bold shadow-md">
                            {emp.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">{emp.name}</p>
                            <p className="text-xs text-white/35">{emp.email}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 border border-green-400/25 px-2.5 py-0.5 text-xs font-semibold text-green-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />Active
                        </span>
                        <p className="mt-0.5 text-xs text-white/30">
                            {new Date(emp.clocked_in_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
}

function CustomerVisitsTable({ visits }) {
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);
    const filtered = visits.filter(
        (v) => v.customer_name.toLowerCase().includes(search.toLowerCase()) || v.user?.name?.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div>
            <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-base font-bold text-white">Customer Visit History</h3>
                <input type="text" placeholder="Search customer or employee…" value={search} onChange={(e) => setSearch(e.target.value)}
                    className="glass-input rounded-xl px-4 py-2 text-sm text-gray-800 placeholder-gray-400 w-full sm:w-64" />
            </div>
            {filtered.length === 0 ? (
                <div className="text-center py-12">
                    <div className="mx-auto mb-3 h-12 w-12 rounded-2xl glass flex items-center justify-center">
                        <svg className="h-6 w-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <p className="text-sm text-white/30">No visits found.</p>
                </div>
            ) : (
                <>
                    {/* Mobile: card list + details popup */}
                    <div className="sm:hidden space-y-3">
                        {filtered.map((v) => (
                            <button
                                key={v.id}
                                type="button"
                                onClick={() => setSelected(v)}
                                className="w-full text-left glass rounded-2xl border border-white/10 px-4 py-3 hover:bg-white/10 transition"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-white truncate">{v.customer_name}</p>
                                        <p className="mt-0.5 text-xs text-white/45">
                                            {v.user?.name ?? '—'} • {new Date(v.created_at).toLocaleString()}
                                        </p>
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

                    {/* Desktop: cleaner table + details action */}
                    <div className="hidden sm:block overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="pb-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-white/35">Employee</th>
                                    <th className="pb-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-white/35">Customer</th>
                                    <th className="pb-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-white/35">Remarks</th>
                                    <th className="pb-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-white/35">Date &amp; Time</th>
                                    <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wide text-white/35">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filtered.map((v) => (
                                    <tr key={v.id} className="hover:bg-white/5 transition">
                                        <td className="py-3.5 pr-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-red/30 text-brand-cream text-xs font-bold">
                                                    {v.user?.name?.charAt(0).toUpperCase() ?? '?'}
                                                </div>
                                                <span className="font-medium text-white whitespace-nowrap">{v.user?.name ?? '—'}</span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 pr-4 font-semibold text-white whitespace-nowrap">{v.customer_name}</td>
                                        <td className="py-3.5 pr-4 text-white/45 max-w-md">
                                            <span className="block max-w-md truncate">{v.remarks || '—'}</span>
                                        </td>
                                        <td className="py-3.5 pr-4 text-white/35 whitespace-nowrap text-xs">{new Date(v.created_at).toLocaleString()}</td>
                                        <td className="py-3.5">
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

            <VisitDetailsModal
                show={!!selected}
                onClose={() => setSelected(null)}
                visit={selected}
                variant="manager"
            />
        </div>
    );
}

export default function ManagerDashboard({ clockedInEmployees, allEmployeeLocations, customerVisits, totalEmployees, clockedInCount, googleMapsApiKey }) {
    const { auth } = usePage().props;
    const todayVisits = customerVisits.filter((v) => new Date(v.created_at).toDateString() === new Date().toDateString()).length;

    // Auto-refresh critical live props (counts/list/locations) without a full reload.
    useEffect(() => {
        const interval = setInterval(() => {
            if (document.visibilityState !== 'visible') return;
            router.reload({
                only: ['clockedInEmployees', 'clockedInCount', 'allEmployeeLocations'],
                preserveScroll: true,
                preserveState: true,
            });
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl glass flex items-center justify-center">
                        <svg className="h-4 w-4 text-white/75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-white">Manager Dashboard</h2>
                        <p className="text-xs text-white/40">Welcome, {auth.user.name}</p>
                    </div>
                </div>
            }
        >
            <Head title="Manager Dashboard" />
            <div className="py-6 sm:py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-5">
                    {/* Stats */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <StatCard label="Total Employees" value={totalEmployees}
                            gradient="bg-gradient-to-r from-brand-red to-brand-coral"
                            icon={<svg className="h-5 w-5 text-white/55" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                        />
                        <StatCard label="Currently Clocked In" value={clockedInCount}
                            gradient="bg-gradient-to-r from-brand-coral to-brand-peach"
                            icon={<svg className="h-5 w-5 text-white/55" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        />
                        <StatCard label="Visits Today" value={todayVisits}
                            gradient="bg-gradient-to-r from-brand-peach to-brand-cream"
                            icon={<svg className="h-5 w-5 text-white/55" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                        />
                    </div>

                    {/* Map + Clocked-in */}
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                        <div className="lg:col-span-2 glass-card relative rounded-3xl overflow-hidden">
                            <div className="h-1 w-full bg-gradient-to-r from-brand-red to-brand-coral" />
                            <div className="p-5 sm:p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-base font-bold text-white">Live Employee Locations</h3>
                                    <span className="flex items-center gap-1.5 text-xs text-white/30">
                                        <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                                        Refreshes every 15s
                                    </span>
                                </div>
                                <EmployeeMap apiKey={googleMapsApiKey} initialLocations={allEmployeeLocations} />
                            </div>
                        </div>

                        <div className="glass-card relative rounded-3xl overflow-hidden">
                            <div className="h-1 w-full bg-gradient-to-r from-brand-coral to-brand-cream" />
                            <div className="p-5 sm:p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-base font-bold text-white">Clocked In</h3>
                                    <span className="glass rounded-full px-2.5 py-0.5 text-xs font-bold text-brand-coral">{clockedInCount}</span>
                                </div>
                                <ClockedInList employees={clockedInEmployees} />
                            </div>
                        </div>
                    </div>

                    {/* Visit history */}
                    <div className="glass-card relative rounded-3xl overflow-hidden">
                        <div className="h-1 w-full bg-gradient-to-r from-brand-red via-brand-coral to-brand-peach" />
                        <div className="p-5 sm:p-6">
                            <CustomerVisitsTable visits={customerVisits} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
