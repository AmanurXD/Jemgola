'use client';

import { Server, Clock, Coins, TrendingUp, TrendingDown, Cpu, Zap, Brain, Database, ArrowUpRight } from 'lucide-react';
import { cn, formatCurrency, formatRelativeTime } from '@/lib/utils';
import { seedPods, seedRecentActivity, seedCreditBalance, seedUsageBreakdown } from '@/data/seed';
import { Card, CardHeader, CardTitle, PageHeader, StatCard } from '@/components/ui';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

const stats = [
    { label: 'Active Pods', value: seedPods.filter(p => p.status === 'running').length.toString(), change: '+2 from last month', trend: 'up' as const, icon: <Server /> },
    { label: 'GPU Hours', value: '284h', change: '+12% from last month', trend: 'up' as const, icon: <Clock /> },
    { label: 'Credit Balance', value: formatCurrency(seedCreditBalance), change: '-$178 this billing period', trend: 'down' as const, icon: <Coins /> },
    { label: 'Monthly Spend', value: formatCurrency(seedUsageBreakdown.totalCost), change: '+27% from last month', trend: 'up' as const, icon: <TrendingUp /> },
];

const chartData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    gpu: Math.max(20, Math.min(95, 65 + Math.sin(i / 3) * 25 + (Math.random() - 0.5) * 15)),
}));

const tooltipStyle = {
    background: 'var(--color-surface-2)',
    border: '1px solid var(--color-border-strong)',
    borderRadius: '8px',
    fontSize: 12,
    boxShadow: 'var(--shadow-md)',
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { Server, Brain, Database, Zap, Network: Cpu };

export default function OverviewPage() {
    return (
        <div className="space-y-6">
            <PageHeader title="Dashboard" description="Welcome back, Alex. Here's your infrastructure overview." />

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <StatCard key={s.label} label={s.label} value={s.value} change={s.change} trend={s.trend} icon={s.icon} delay={i * 0.05} />
                ))}
            </div>

            {/* Chart + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <Card className="lg:col-span-2" padding="md">
                    <CardHeader><CardTitle>GPU Utilization (24h)</CardTitle></CardHeader>
                    <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="gpuGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                                <XAxis dataKey="hour" stroke="var(--color-muted-foreground)" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--color-muted-foreground)" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
                                <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: 'var(--color-muted-foreground)' }} />
                                <Area type="monotone" dataKey="gpu" stroke="var(--color-primary)" fill="url(#gpuGrad)" strokeWidth={1.5} name="GPU %" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card padding="md">
                    <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
                    <div className="space-y-3.5">
                        {seedRecentActivity.map(a => {
                            const Icon = iconMap[a.icon] || Server;
                            return (
                                <div key={a.id} className="flex items-start gap-3">
                                    <div className="w-7 h-7 rounded-md bg-surface-2 flex items-center justify-center shrink-0 mt-0.5">
                                        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[13px] text-heading">{a.action}</p>
                                        <p className="text-xs text-muted-foreground">{a.resource} · {formatRelativeTime(a.timestamp)}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </div>

            {/* Quick Actions + Active Pods */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <Card padding="md">
                    <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
                    <div className="grid grid-cols-2 gap-2.5">
                        {[
                            { label: 'Deploy Pod', icon: Server, href: '/dashboard/pods' },
                            { label: 'Create Cluster', icon: Cpu, href: '/dashboard/clusters' },
                            { label: 'Upload Dataset', icon: Database, href: '/dashboard/finetuning' },
                            { label: 'Top Up Credits', icon: Coins, href: '/dashboard/credits' },
                        ].map(a => (
                            <Link key={a.label} href={a.href}
                                className="flex items-center gap-2.5 bg-surface-0 border border-border rounded-lg p-3 hover:border-border-strong hover:bg-surface-1 transition-all duration-150 group"
                            >
                                <div className="w-7 h-7 rounded-md bg-surface-2 flex items-center justify-center group-hover:bg-surface-3 transition-colors">
                                    <a.icon className="w-3.5 h-3.5 text-muted-foreground" />
                                </div>
                                <span className="text-[13px] text-secondary-foreground">{a.label}</span>
                                <ArrowUpRight className="w-3 h-3 text-muted-foreground/40 ml-auto group-hover:text-muted-foreground transition-colors" />
                            </Link>
                        ))}
                    </div>
                </Card>

                <Card padding="md">
                    <CardHeader action={<Link href="/dashboard/pods" className="text-xs text-primary hover:text-primary/80 font-medium">View all</Link>}>
                        <CardTitle>Active Pods</CardTitle>
                    </CardHeader>
                    <div className="space-y-1">
                        {seedPods.filter(p => p.status === 'running').slice(0, 4).map(pod => (
                            <div key={pod.id} className="flex items-center justify-between py-2.5 px-2 -mx-2 rounded-md hover:bg-surface-0 transition-colors">
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" />
                                    <div className="min-w-0">
                                        <p className="text-[13px] font-medium text-heading truncate">{pod.name}</p>
                                        <p className="text-xs text-muted-foreground">{pod.gpuName}</p>
                                    </div>
                                </div>
                                <span className="text-xs text-muted-foreground tabular-nums shrink-0">{formatCurrency(pod.costAccrued)}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
