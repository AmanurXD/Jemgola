'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) { setError('Please enter your email'); return; }
        setError('');
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1500));
        setIsSent(true);
        setIsLoading(false);
    };

    if (isSent) {
        return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Check your email</h2>
                <p className="text-zinc-400 text-sm mb-8">We&apos;ve sent a password reset link to <span className="text-white font-medium">{email}</span></p>
                <Link href="/login" className="text-sm text-purple-400 hover:text-purple-300 inline-flex items-center gap-1">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to login
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-bold mb-1">Reset password</h2>
            <p className="text-zinc-400 text-sm mb-8">Enter your email and we&apos;ll send you a reset link</p>

            {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-6">
                    {error}
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm text-zinc-400 mb-1.5 block">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com"
                            className="w-full bg-card border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all"
                        />
                    </div>
                </div>

                <button type="submit" disabled={isLoading}
                    className={cn("w-full bg-primary hover:bg-primary/90 text-white py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2", isLoading && "opacity-70 cursor-not-allowed")}
                >
                    {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : 'Send reset link'}
                </button>
            </form>

            <p className="text-center text-sm text-zinc-500 mt-8">
                <Link href="/login" className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-1">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to login
                </Link>
            </p>
        </motion.div>
    );
}
