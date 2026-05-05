import InputError from '@/Components/InputError';
import Loader from '@/Components/Loader';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'employee',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            {/* Header */}
            <div className="mb-7">
                <h1 className="text-2xl font-extrabold text-white">Create account</h1>
                <p className="text-sm text-white/50 mt-1">Join FieldTrack today</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                {/* Full Name */}
                <div>
                    <label className="block text-sm font-semibold text-white/80 mb-1.5">
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        autoFocus
                        className="glass-input w-full rounded-xl px-4 py-2.5 text-sm"
                        placeholder="John Doe"
                        required
                    />
                    <InputError message={errors.name} className="mt-1.5 text-brand-cream" />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-white/80 mb-1.5">
                        Email
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="glass-input w-full rounded-xl px-4 py-2.5 text-sm"
                        placeholder="you@example.com"
                        required
                    />
                    <InputError message={errors.email} className="mt-1.5 text-brand-cream" />
                </div>

                {/* Role */}
                <div>
                    <label className="block text-sm font-semibold text-white/80 mb-1.5">
                        Role
                    </label>
                    <select
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                        className="glass-input w-full rounded-xl px-4 py-2.5 text-sm"
                        required
                    >
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                    </select>
                    <InputError message={errors.role} className="mt-1.5 text-brand-cream" />
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
                        className="glass-input w-full rounded-xl px-4 py-2.5 text-sm"
                        placeholder="••••••••"
                        required
                    />
                    <InputError message={errors.password} className="mt-1.5 text-brand-cream" />
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-semibold text-white/80 mb-1.5">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className="glass-input w-full rounded-xl px-4 py-2.5 text-sm"
                        placeholder="••••••••"
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-1.5 text-brand-cream" />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-xl bg-gradient-to-r from-brand-red to-brand-coral py-3 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60 transition shadow-lg flex items-center justify-center gap-3 mt-2"
                >
                    {processing
                        ? <><Loader size="22" speed="2.5" color="white" /><span>Creating account…</span></>
                        : 'Create Account'
                    }
                </button>

                <p className="text-center text-sm text-white/45 pt-1">
                    Already registered?{' '}
                    <Link
                        href={route('login')}
                        className="text-brand-peach hover:text-brand-cream font-semibold underline underline-offset-2 transition"
                    >
                        Sign in
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
