'use client';

import { motion } from 'framer-motion';
import { Server, Clock, Coins, TrendingUp, TrendingDown, Cpu, Zap, Brain, Database, Plus, ArrowUpRight } from 'lucide-react';
import { cn, formatCurrency, formatRelativeTime } from '@/lib/utils';
import { seedPods, seedMonthlySpend, seedRecentActivity, seedCreditBalance, seedUsageBreakdown } from '@/data/seed';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

const stats = [
    { label: 'Active Pods', value: seedPods.filter(p => p.status === 'running').length.toString(), change: '+2', up: true, icon: Server, color: 'purple' },
    { label: 'GPU Hours Used', value: '284h', change: '+12%', up: true, icon: Clock, color: 'blue' },
    { label: 'Credit Balance', value: formatCurrency(seedCreditBalance), change: '-$178', up: false, icon: Coins, color: 'emerald' },
    { label: 'Monthly Spend', value: formatCurrency(seedUsageBreakdown.totalCost), change: '+27%', up: true, icon: TrendingUp, color: 'amber' },
];

const chartData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    gpu: Math.max(20, Math.min(95, 65 + Math.sin(i / 3) * 25 + (Math.random() - 0.5) * 15)),
}));

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { Server, Brain, Database, Zap, Network: Cpu };

export default function OverviewPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-sm text-zinc-400">Welcome back, Alex. Here&apos;s your infrastructure overview.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className="bg-card border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-zinc-500">{s.label}</span>
                            <s.icon className="w-4 h-4 text-zinc-600" />
                        </div>
                        <p className="text-2xl font-bold mb-1">{s.value}</p>
                        <div className={cn("text-xs flex items-center gap-1", s.up ? 'text-emerald-400' : 'text-red-400')}>
                            {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {s.change} from last month
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Chart + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="lg:col-span-2 bg-card border border-white/5 rounded-xl p-5"
                >
                    <h3 className="text-sm font-medium mb-4">GPU Utilization (24h)</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="gpuGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                                <XAxis dataKey="hour" stroke="#52525b" tick={{ fontSize: 11 }} tickLine={false} />
                                <YAxis stroke="#52525b" tick={{ fontSize: 11 }} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
                                <Tooltip contentStyle={{ background: '#18181b', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: 12 }} labelStyle={{ color: '#a1a1aa' }} />
                                <Area type="monotone" dataKey="gpu" stroke="#7c3aed" fill="url(#gpuGrad)" strokeWidth={2} name="GPU %" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="bg-card border border-white/5 rounded-xl p-5"
                >
                    <h3 className="text-sm font-medium mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {seedRecentActivity.map(a => {
                            const Icon = iconMap[a.icon] || Server;
                            return (
                                <div key={a.id} className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <Icon className="w-3.5 h-3.5 text-purple-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm">{a.action}</p>
                                        <p className="text-xs text-zinc-500">{a.resource} • {formatRelativeTime(a.timestamp)}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>

            {/* Quick Actions + Active Pods */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="bg-card border border-white/5 rounded-xl p-5"
                >
                    <h3 className="text-sm font-medium mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { label: 'Deploy Pod', icon: Server, href: '/dashboard/pods' },
                            { label: 'Create Cluster', icon: Cpu, href: '/dashboard/clusters' },
                            { label: 'Upload Dataset', icon: Database, href: '/dashboard/finetuning' },
                            { label: 'Top Up Credits', icon: Coins, href: '/dashboard/credits' },
                        ].map(a => (
                            <Link key={a.label} href={a.href}
                                className="flex items-center gap-2.5 bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                    <a.icon className="w-4 h-4 text-purple-400" />
                                </div>
                                <span className="text-sm">{a.label}</span>
                                <ArrowUpRight className="w-3 h-3 text-zinc-600 ml-auto group-hover:text-zinc-400 transition-colors" />
                            </Link>
                        ))}
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="bg-card border border-white/5 rounded-xl p-5"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium">Active Pods</h3>
                        <Link href="/dashboard/pods" className="text-xs text-purple-400 hover:text-purple-300">View all</Link>
                    </div>
                    <div className="space-y-3">
                        {seedPods.filter(p => p.status === 'running').slice(0, 4).map(pod => (
                            <div key={pod.id} className="flex items-center justify-between py-2">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium truncate">{pod.name}</p>
                                        <p className="text-xs text-zinc-500">{pod.gpuName}</p>
                                    </div>
                                </div>
                                <span className="text-xs text-zinc-500 shrink-0">{formatCurrency(pod.costAccrued)}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
