'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [remember, setRemember] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        // Simulate auth
        await new Promise(r => setTimeout(r, 1500));

        if (email === 'demo@jemgola.dev' || email.includes('@')) {
            localStorage.setItem('jg_session', JSON.stringify({ email, token: 'sess_' + Date.now() }));
            router.push('/dashboard/overview');
        } else {
            setError('Invalid email or password');
            setIsLoading(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-bold mb-1">Welcome back</h2>
            <p className="text-zinc-400 text-sm mb-8">Sign in to your JemGola account</p>

            {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-6">
                    {error}
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm text-zinc-400 mb-1.5 block">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="email" value={email} onChange={e => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            className="w-full bg-card border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="text-sm text-zinc-400">Password</label>
                        <Link href="/forgot-password" className="text-xs text-purple-400 hover:text-purple-300">Forgot password?</Link>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-card border border-white/10 rounded-lg pl-10 pr-10 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input type="checkbox" id="remember" checked={remember} onChange={e => setRemember(e.target.checked)}
                        className="w-4 h-4 rounded border-white/10 bg-card text-purple-500 focus:ring-purple-500/25"
                    />
                    <label htmlFor="remember" className="text-sm text-zinc-400">Remember me</label>
                </div>

                <button type="submit" disabled={isLoading}
                    className={cn("w-full bg-primary hover:bg-primary/90 text-white py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2", isLoading && "opacity-70 cursor-not-allowed")}
                >
                    {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : 'Sign in'}
                </button>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
                <div className="relative flex justify-center"><span className="bg-background px-3 text-xs text-zinc-600">or continue with</span></div>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {[
                    { name: 'Google', icon: '🔍' },
                    { name: 'GitHub', icon: '🐙' },
                    { name: 'GitLab', icon: '🦊' },
                ].map(provider => (
                    <button key={provider.name} onClick={() => { setIsLoading(true); setTimeout(() => { localStorage.setItem('jg_session', JSON.stringify({ email: 'user@oauth.dev', token: 'sess_' + Date.now() })); router.push('/dashboard/overview'); }, 1000); }}
                        className="flex items-center justify-center gap-2 border border-white/10 rounded-lg py-2.5 text-sm hover:bg-white/5 transition-colors"
                    >
                        <span>{provider.icon}</span>
                        <span className="hidden sm:inline text-zinc-400">{provider.name}</span>
                    </button>
                ))}
            </div>

            <p className="text-center text-sm text-zinc-500 mt-8">
                Don&apos;t have an account? <Link href="/register" className="text-purple-400 hover:text-purple-300 font-medium">Sign up</Link>
            </p>
        </motion.div>
    );
}
