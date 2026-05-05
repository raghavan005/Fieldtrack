import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import Loader from '@/Components/Loader';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <GuestLayout>
            <Head title="Sign In" />

            {/* Header */}
            <div className="mb-7">
                <h1 className="text-2xl font-extrabold text-white">Welcome back</h1>
                <p className="text-sm text-white/50 mt-1">Sign in to your FieldTrack account</p>
            </div>

            {status && (
                <div className="mb-4 rounded-xl bg-green-500/20 border border-green-400/30 px-4 py-3 text-sm font-medium text-green-300">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-white/80 mb-1.5">
                        Email
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        autoComplete="username"
                        autoFocus
                        className="glass-input w-full rounded-xl px-4 py-2.5 text-sm"
                        placeholder="you@example.com"
                    />
                    <InputError message={errors.email} className="mt-1.5 text-brand-cream" />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-semibold text-white/80 mb-1.5">
                        Password
                    </label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete="current-password"
                        className="glass-input w-full rounded-xl px-4 py-2.5 text-sm"
                        placeholder="••••••••"
                    />
                    <InputError message={errors.password} className="mt-1.5 text-brand-cream" />
                </div>

                {/* Remember + forgot */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="border-white/30 bg-white/10"
                        />
                        <span className="text-sm text-white/60">Remember me</span>
                    </label>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-brand-peach hover:text-brand-cream underline underline-offset-2 transition"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-xl bg-gradient-to-r from-brand-red to-brand-coral py-3 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60 transition shadow-lg flex items-center justify-center gap-3"
                >
                    {processing
                        ? <><Loader size="22" speed="2.5" color="white" /><span>Signing in…</span></>
                        : 'Sign In'
                    }
                </button>

                <p className="text-center text-sm text-white/45 pt-1">
                    No account?{' '}
                    <Link
                        href={route('register')}
                        className="text-brand-peach hover:text-brand-cream font-semibold underline underline-offset-2 transition"
                    >
                        Register here
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
