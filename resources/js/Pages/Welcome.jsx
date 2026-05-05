import { Head, Link } from '@inertiajs/react';
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="FieldTrack" />

            <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#1a0500] via-[#3a1000] to-[#6a2000] flex flex-col">

                {/* Orbs */}
                <div className="orb w-[700px] h-[700px] bg-brand-red top-[-200px] left-[-200px]" />
                <div className="orb w-[500px] h-[500px] bg-brand-coral bottom-[-150px] right-[-150px]" />
                <div className="orb w-[300px] h-[300px] bg-brand-peach top-[35%] left-[40%]" style={{ opacity: 0.18 }} />

                {/* Nav */}
                <nav className="relative z-10 flex items-center justify-between px-8 py-6">
                    <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-red to-brand-coral flex items-center justify-center shadow-lg">
                            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <span className="text-white font-bold text-xl tracking-tight">FieldTrack</span>
                    </div>
                    {auth.user && (
                        <Link href={route('dashboard')} className="glass rounded-full px-4 py-2 text-sm text-white/80 hover:text-white transition">
                            Go to Dashboard
                        </Link>
                    )}
                </nav>

                {/* Hero — two column on lg */}
                <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 px-8 py-8 max-w-7xl mx-auto w-full">

                    {/* Left — text + cards */}
                    <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm text-white/70">
                            <span className="h-2 w-2 rounded-full bg-brand-coral animate-pulse" />
                            Real-time field employee tracking
                        </div>

                        <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.05] tracking-tight">
                            Track your team,{' '}
                            <span className="bg-gradient-to-r from-brand-coral to-brand-cream bg-clip-text text-transparent">
                                anywhere.
                            </span>
                        </h1>

                        <p className="mt-5 text-base text-white/45 max-w-md leading-relaxed">
                            Clock-ins, customer visits, and live GPS — all in one place for managers and field employees.
                        </p>

                        {/* Login cards */}
                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
                            <Link
                                href={route('login')}
                                className="glass-card relative rounded-2xl p-6 text-left group hover:scale-[1.02] transition-all duration-300"
                            >
                                <div className="mb-4 h-10 w-10 rounded-xl bg-gradient-to-br from-brand-red/30 to-brand-coral/30 border border-white/15 flex items-center justify-center">
                                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h2 className="text-base font-bold text-white">Manager</h2>
                                <p className="mt-1 text-xs text-white/45 leading-relaxed">Live map, team stats and visit history</p>
                                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-brand-cream group-hover:gap-3 transition-all">
                                    Login as Manager
                                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>

                            <Link
                                href={route('login')}
                                className="glass-card relative rounded-2xl p-6 text-left group hover:scale-[1.02] transition-all duration-300"
                            >
                                <div className="mb-4 h-10 w-10 rounded-xl bg-gradient-to-br from-brand-cream/20 to-brand-peach/30 border border-white/15 flex items-center justify-center">
                                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-base font-bold text-white">Employee</h2>
                                <p className="mt-1 text-xs text-white/45 leading-relaxed">Clock in/out and log customer visits</p>
                                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-brand-cream group-hover:gap-3 transition-all">
                                    Login as Employee
                                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>
                        </div>

                        <p className="mt-6 text-sm text-white/30">
                            No account?{' '}
                            <Link href={route('register')} className="text-brand-cream/70 hover:text-brand-cream underline underline-offset-2 transition">
                                Register here
                            </Link>
                        </p>
                    </div>

                    {/* Right — Lottie animation */}
                    <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md xl:max-w-lg">
                        <div className="glass-card relative rounded-3xl p-4 overflow-hidden">
                            {/* Glow behind animation */}
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 to-brand-coral/5 rounded-3xl" />
                            <DotLottiePlayer
                                src="/global-delivery.json"
                                loop
                                autoplay
                                style={{ width: '100%', height: 'auto' }}
                            />
                            {/* Stats overlay at bottom */}
                            <div className="relative z-10 mt-2 grid grid-cols-3 gap-2 pb-2">
                                {[
                                    { label: 'Live Tracking', value: 'GPS' },
                                    { label: 'Clock In/Out', value: '24/7' },
                                    { label: 'Visit Logs', value: 'Auto' },
                                ].map((s) => (
                                    <div key={s.label} className="glass rounded-xl px-3 py-2 text-center">
                                        <p className="text-xs font-bold text-brand-cream">{s.value}</p>
                                        <p className="text-[10px] text-white/40 mt-0.5">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="relative z-10 py-4 text-center text-xs text-white/20">
                    {new Date().getFullYear()} FieldTrack
                </footer>
            </div>
        </>
    );
}
