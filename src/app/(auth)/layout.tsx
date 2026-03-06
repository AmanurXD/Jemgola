'use client';

import Link from 'next/link';
import { Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex">
            {/* Branding Panel */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-card overflow-hidden items-center justify-center">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
                </div>
                <div className="relative z-10 max-w-md text-center px-8">
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-8">
                            <Cpu className="w-8 h-8 text-white" />
                        </div>
                    </motion.div>
                    <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-3xl font-bold mb-4">
                        <span className="gradient-text">Cloud GPU</span> Infrastructure
                    </motion.h1>
                    <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-zinc-400 leading-relaxed">
                        Deploy pods, run serverless inference, fine-tune models, and scale clusters — all on enterprise-grade GPU infrastructure.
                    </motion.p>
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 grid grid-cols-3 gap-4">
                        {[{ label: '99.9%', desc: 'Uptime SLA' }, { label: '<100ms', desc: 'Latency' }, { label: '10k+', desc: 'GPUs' }].map(s => (
                            <div key={s.label} className="bg-white/5 rounded-xl p-3">
                                <p className="text-lg font-bold text-purple-400">{s.label}</p>
                                <p className="text-xs text-zinc-500">{s.desc}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Form Panel */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                            <Cpu className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold">JemGola</span>
                    </Link>
                    {children}
                </div>
            </div>
        </div>
    );
}
