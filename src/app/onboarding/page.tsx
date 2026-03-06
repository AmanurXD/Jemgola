'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, Building, CreditCard, Rocket, ChevronRight, ChevronLeft,
    Check, Cpu, Globe, Users, Briefcase, ArrowRight, Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
    { title: 'Welcome', icon: Sparkles },
    { title: 'Workspace', icon: Building },
    { title: 'Payment', icon: CreditCard },
    { title: 'Deploy', icon: Rocket },
];

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [workspace, setWorkspace] = useState({ name: '', type: 'personal' as string, region: 'US East' });
    const [isLoading, setIsLoading] = useState(false);

    const next = () => {
        if (step < 3) setStep(step + 1);
        else {
            setIsLoading(true);
            setTimeout(() => router.push('/dashboard/overview'), 1500);
        }
    };
    const prev = () => { if (step > 0) setStep(step - 1); };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                        <Cpu className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="font-bold">JemGola</span>
                </div>
                <span className="text-xs text-zinc-500">Step {step + 1} of {steps.length}</span>
            </div>

            {/* Progress Bar */}
            <div className="px-6 pt-4">
                <div className="max-w-2xl mx-auto flex items-center gap-2">
                    {steps.map((s, i) => (
                        <div key={i} className="flex-1 flex items-center gap-2">
                            <div className={cn("shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                                i < step ? 'bg-purple-500 text-white' : i === step ? 'bg-purple-500/20 text-purple-400 ring-2 ring-purple-500/50' : 'bg-white/5 text-zinc-600'
                            )}>
                                {i < step ? <Check className="w-4 h-4" /> : i + 1}
                            </div>
                            {i < steps.length - 1 && <div className={cn("flex-1 h-0.5 rounded", i < step ? 'bg-purple-500' : 'bg-white/5')} />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-xl">
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div key="welcome" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center">
                                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20 flex items-center justify-center mx-auto mb-8">
                                    <Sparkles className="w-10 h-10 text-purple-400" />
                                </motion.div>
                                <h2 className="text-3xl font-bold mb-3">Welcome to JemGola</h2>
                                <p className="text-zinc-400 mb-8 max-w-md mx-auto">Let&apos;s set up your cloud GPU workspace in just a few steps. You&apos;ll be deploying in minutes.</p>
                                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                                    {[{ icon: Cpu, label: 'GPU Pods' }, { icon: Rocket, label: 'Serverless' }, { icon: Users, label: 'Collaborate' }].map(f => (
                                        <div key={f.label} className="bg-card border border-white/5 rounded-xl p-4 text-center">
                                            <f.icon className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                                            <span className="text-xs text-zinc-400">{f.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 1 && (
                            <motion.div key="workspace" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h2 className="text-2xl font-bold mb-2">Create your workspace</h2>
                                <p className="text-zinc-400 text-sm mb-8">Your workspace is where your team manages GPU resources.</p>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-zinc-400 mb-1.5 block">Workspace name</label>
                                        <input type="text" value={workspace.name} onChange={e => setWorkspace({ ...workspace, name: e.target.value })} placeholder="Acme AI Labs"
                                            className="w-full bg-card border border-white/10 rounded-lg px-4 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all"
                                        />
                                        {workspace.name && <p className="mt-1.5 text-xs text-zinc-500">Slug: {workspace.name.toLowerCase().replace(/\s+/g, '-')}</p>}
                                    </div>
                                    <div>
                                        <label className="text-sm text-zinc-400 mb-1.5 block">Workspace type</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[{ type: 'personal', icon: Users, label: 'Personal' }, { type: 'team', icon: Briefcase, label: 'Team' }, { type: 'enterprise', icon: Building, label: 'Enterprise' }].map(t => (
                                                <button key={t.type} onClick={() => setWorkspace({ ...workspace, type: t.type })}
                                                    className={cn("border rounded-lg p-4 text-center transition-all",
                                                        workspace.type === t.type ? 'border-purple-500/50 bg-purple-500/10' : 'border-white/5 hover:border-white/10'
                                                    )}
                                                >
                                                    <t.icon className={cn("w-5 h-5 mx-auto mb-2", workspace.type === t.type ? 'text-purple-400' : 'text-zinc-500')} />
                                                    <span className="text-sm">{t.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-zinc-400 mb-1.5 block">Region</label>
                                        <select value={workspace.region} onChange={e => setWorkspace({ ...workspace, region: e.target.value })}
                                            className="w-full bg-card border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all"
                                        >
                                            {['US East', 'US West', 'EU West', 'EU Central', 'Asia Pacific'].map(r => <option key={r} value={r}>{r}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h2 className="text-2xl font-bold mb-2">Add a payment method</h2>
                                <p className="text-zinc-400 text-sm mb-8">Required for GPU deployments. You won&apos;t be charged until you deploy resources.</p>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-zinc-400 mb-1.5 block">Card number</label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                            <input type="text" placeholder="4242 4242 4242 4242" maxLength={19}
                                                className="w-full bg-card border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-zinc-400 mb-1.5 block">Expiry</label>
                                            <input type="text" placeholder="MM / YY" maxLength={7}
                                                className="w-full bg-card border border-white/10 rounded-lg px-4 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-zinc-400 mb-1.5 block">CVC</label>
                                            <input type="text" placeholder="123" maxLength={4}
                                                className="w-full bg-card border border-white/10 rounded-lg px-4 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => next()} className="mt-4 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                                    Skip for now →
                                </button>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="deploy" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center">
                                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/20 flex items-center justify-center mx-auto mb-8">
                                    <Rocket className="w-10 h-10 text-emerald-400" />
                                </motion.div>
                                <h2 className="text-3xl font-bold mb-3">You&apos;re all set!</h2>
                                <p className="text-zinc-400 mb-8 max-w-md mx-auto">Your workspace is ready. Deploy your first GPU pod or explore the platform.</p>
                                <div className="bg-card border border-white/5 rounded-xl p-6 max-w-sm mx-auto text-left">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                            <Cpu className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Recommended: RTX 4090</p>
                                            <p className="text-xs text-zinc-500">24GB VRAM • $0.74/hr</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-zinc-400 mb-4">Great for getting started with inference, fine-tuning, and development workloads.</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">Available</span>
                                        <span className="text-xs text-zinc-500">US East</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/5">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <button onClick={prev} disabled={step === 0}
                        className={cn("inline-flex items-center gap-1.5 text-sm transition-colors", step === 0 ? 'text-zinc-700 cursor-not-allowed' : 'text-zinc-400 hover:text-white')}
                    >
                        <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button onClick={next} disabled={isLoading}
                        className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all"
                    >
                        {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Setting up...</> : step === 3 ? <><span>Go to Dashboard</span><ArrowRight className="w-4 h-4" /></> : <><span>Continue</span><ChevronRight className="w-4 h-4" /></>}
                    </button>
                </div>
            </div>
        </div>
    );
}
