import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#1a0500] via-[#3a1000] to-[#6a2000] flex items-center justify-center">

            {/* Orbs */}
            <div className="orb w-[600px] h-[600px] bg-brand-red top-[-150px] left-[-150px]" />
            <div className="orb w-[450px] h-[450px] bg-brand-coral bottom-[-100px] right-[-100px]" />
            <div className="orb w-[250px] h-[250px] bg-brand-peach top-[55%] left-[55%]" style={{ opacity: 0.18 }} />

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-12">

                {/* Left panel */}
                <div className="hidden lg:flex flex-col flex-1 text-white">
                    <Link href="/" className="flex items-center gap-3 mb-10">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-red to-brand-coral flex items-center justify-center shadow-lg">
                            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-extrabold tracking-tight">FieldTrack</span>
                    </Link>

                    <h2 className="text-4xl font-extrabold leading-tight mb-4">
                        Your field team,<br />
                        <span className="bg-gradient-to-r from-brand-coral to-brand-cream bg-clip-text text-transparent">
                            always connected.
                        </span>
                    </h2>
                    <p className="text-white/45 text-base leading-relaxed max-w-sm">
                        Real-time GPS tracking, attendance management, and customer visit logs — built for modern field teams.
                    </p>

                    <div className="mt-10 grid grid-cols-2 gap-3 max-w-xs">
                        {[
                            { icon: <ClockIcon />, label: 'Clock In / Out' },
                            { icon: <MapPinIcon />, label: 'Live Location' },
                            { icon: <MapIcon />, label: 'Map View' },
                            { icon: <ClipboardIcon />, label: 'Visit History' },
                        ].map((f) => (
                            <div key={f.label} className="glass rounded-xl px-4 py-3 flex items-center gap-2.5">
                                <span className="text-brand-peach">{f.icon}</span>
                                <span className="text-xs text-white/65 font-medium">{f.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form panel */}
                <div className="w-full max-w-md flex-shrink-0">
                    <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-red to-brand-coral flex items-center justify-center">
                            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-extrabold text-white tracking-tight">FieldTrack</span>
                    </div>

                    <div className="glass-card relative rounded-3xl px-8 py-9">
                        {children}
                    </div>

                    <p className="mt-5 text-center text-xs text-white/20">
                        {new Date().getFullYear()} FieldTrack
                    </p>
                </div>
            </div>
        </div>
    );
}

function ClockIcon() {
    return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}
function MapPinIcon() {
    return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}
function MapIcon() {
    return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
    );
}
function ClipboardIcon() {
    return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
    );
}
