import Dropdown from '@/Components/Dropdown';
import FlashToasts from '@/Components/FlashToasts';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const isManager = user?.role === 'manager';
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="relative w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-[#1a0500] via-[#3a1000] to-[#6a2000]">

            <FlashToasts />

            {/* Fixed orbs — behind everything */}
            <div className="orb w-[700px] h-[700px] bg-brand-red top-[-250px] left-[-250px]" />
            <div className="orb w-[550px] h-[550px] bg-brand-coral bottom-[-200px] right-[-200px]" />

            {/* Nav */}
            <nav className="relative z-20 glass-dark border-b border-white/10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">

                        <div className="flex items-center gap-8">
                            <Link href="/" className="flex items-center gap-2.5">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-red to-brand-coral flex items-center justify-center shadow-md">
                                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <span className="text-white font-bold text-lg tracking-tight">FieldTrack</span>
                            </Link>
                            <div className="hidden sm:flex">
                                <Link
                                    href={isManager ? route('manager.dashboard') : route('employee.dashboard')}
                                    className="rounded-lg px-3 py-2 text-sm font-medium text-white/65 hover:text-white hover:bg-white/10 transition"
                                >
                                    Dashboard
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:flex items-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="glass flex items-center gap-2.5 rounded-full px-3 py-1.5 text-sm font-medium text-white hover:bg-white/15 transition">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-red to-brand-coral text-white text-xs font-bold shadow">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-white/85">{user?.name}</span>
                                        <span className="rounded-full bg-white/12 px-2 py-0.5 text-xs capitalize text-white/60">
                                            {user?.role}
                                        </span>
                                        <svg className="h-3.5 w-3.5 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        <button
                            onClick={() => setMobileOpen((s) => !s)}
                            className="sm:hidden rounded-lg p-2 text-white/65 hover:text-white hover:bg-white/10 transition"
                        >
                            <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                {mobileOpen
                                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                }
                            </svg>
                        </button>
                    </div>
                </div>

                {mobileOpen && (
                    <div className="sm:hidden border-t border-white/10 px-4 pb-4 pt-3 space-y-1">
                        <ResponsiveNavLink href={isManager ? route('manager.dashboard') : route('employee.dashboard')} className="text-white/80">
                            Dashboard
                        </ResponsiveNavLink>
                        <div className="border-t border-white/10 pt-3 mt-2">
                            <p className="text-sm font-medium text-white">{user?.name}</p>
                            <p className="text-xs text-white/40">{user?.email}</p>
                            <div className="mt-2 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')} className="text-white/70">Profile</ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route('logout')} as="button" className="text-white/70">Log Out</ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Page header (content, not a second topbar) */}
            {header && (
                <div className="relative z-10">
                    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </div>
            )}

            <main className="relative z-10 w-full">{children}</main>
        </div>
    );
}
