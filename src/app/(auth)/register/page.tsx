'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Loader2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [agreed, setAgreed] = useState(false);

    const passwordChecks = [
        { label: 'At least 8 characters', pass: form.password.length >= 8 },
        { label: 'Contains a number', pass: /\d/.test(form.password) },
        { label: 'Contains uppercase', pass: /[A-Z]/.test(form.password) },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!form.name || !form.email || !form.password || !form.confirm) {
            setError('Please fill in all fields');
            return;
        }
        if (form.password !== form.confirm) {
            setError('Passwords do not match');
            return;
        }
        if (!passwordChecks.every(c => c.pass)) {
            setError('Password does not meet requirements');
            return;
        }
        if (!agreed) {
            setError('Please agree to the Terms of Service');
            return;
        }

        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1500));
        localStorage.setItem('jg_session', JSON.stringify({ email: form.email, token: 'sess_' + Date.now(), isNew: true }));
        router.push('/onboarding');
    };

    const update = (field: string, value: string) => setForm(p => ({ ...p, [field]: value }));

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-bold mb-1">Create your account</h2>
            <p className="text-zinc-400 text-sm mb-8">Start deploying GPU workloads in minutes</p>

            {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-6">
                    {error}
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm text-zinc-400 mb-1.5 block">Full name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Alex Chen"
                            className="w-full bg-card border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm text-zinc-400 mb-1.5 block">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@company.com"
                            className="w-full bg-card border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm text-zinc-400 mb-1.5 block">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={e => update('password', e.target.value)} placeholder="••••••••"
                            className="w-full bg-card border border-white/10 rounded-lg pl-10 pr-10 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {form.password && (
                        <div className="mt-2 space-y-1">
                            {passwordChecks.map(c => (
                                <div key={c.label} className="flex items-center gap-2">
                                    <div className={cn("w-3.5 h-3.5 rounded-full flex items-center justify-center", c.pass ? 'bg-emerald-500/20' : 'bg-white/5')}>
                                        {c.pass && <Check className="w-2.5 h-2.5 text-emerald-400" />}
                                    </div>
                                    <span className={cn("text-xs", c.pass ? 'text-emerald-400' : 'text-zinc-500')}>{c.label}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <label className="text-sm text-zinc-400 mb-1.5 block">Confirm password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input type="password" value={form.confirm} onChange={e => update('confirm', e.target.value)} placeholder="••••••••"
                            className="w-full bg-card border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all"
                        />
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <input type="checkbox" id="terms" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-white/10 bg-card text-purple-500 focus:ring-purple-500/25"
                    />
                    <label htmlFor="terms" className="text-xs text-zinc-400">
                        I agree to the <a href="#" className="text-purple-400 hover:underline">Terms of Service</a> and <a href="#" className="text-purple-400 hover:underline">Privacy Policy</a>
                    </label>
                </div>

                <button type="submit" disabled={isLoading}
                    className={cn("w-full bg-primary hover:bg-primary/90 text-white py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2", isLoading && "opacity-70 cursor-not-allowed")}
                >
                    {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account...</> : 'Create account'}
                </button>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
                <div className="relative flex justify-center"><span className="bg-background px-3 text-xs text-zinc-600">or continue with</span></div>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {[{ name: 'Google', icon: '🔍' }, { name: 'GitHub', icon: '🐙' }, { name: 'GitLab', icon: '🦊' }].map(p => (
                    <button key={p.name} className="flex items-center justify-center gap-2 border border-white/10 rounded-lg py-2.5 text-sm hover:bg-white/5 transition-colors">
                        <span>{p.icon}</span>
                        <span className="hidden sm:inline text-zinc-400">{p.name}</span>
                    </button>
                ))}
            </div>

            <p className="text-center text-sm text-zinc-500 mt-8">
                Already have an account? <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium">Sign in</Link>
            </p>
        </motion.div>
    );
}
