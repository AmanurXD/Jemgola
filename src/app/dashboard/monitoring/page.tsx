'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, PageHeader, Badge } from '@/components/ui';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const tooltipStyle = {
    background: 'var(--color-surface-2)',
    border: '1px solid var(--color-border-strong)',
    borderRadius: '8px',
    fontSize: 12,
    boxShadow: 'var(--shadow-md)',
};

const gauges = [
    { label: 'GPU Utilization', value: 78, color: 'var(--color-primary)' },
    { label: 'CPU Usage', value: 45, color: 'var(--color-info)' },
    { label: 'Memory', value: 62, color: '#36b5a0' },
    { label: 'Network', value: 28, color: 'var(--color-warning)' },
];

const chartData = Array.from({ length: 30 }, (_, i) => ({
    minute: `${i}m`,
    gpu: Math.max(40, Math.min(100, 70 + Math.sin(i / 4) * 15 + (Math.random() - 0.5) * 10)),
    cpu: Math.max(20, Math.min(80, 45 + Math.cos(i / 5) * 12 + (Math.random() - 0.5) * 8)),
    memory: Math.max(30, Math.min(85, 60 + Math.sin(i / 6) * 8 + (Math.random() - 0.5) * 6)),
}));

const alerts = [
    { id: '1', severity: 'warning', message: 'Node node-3 GPU utilization above 90%', time: '5m ago' },
    { id: '2', severity: 'error', message: 'Pod data-pipeline-worker failed health check', time: '23m ago' },
    { id: '3', severity: 'info', message: 'Auto-scaling triggered for cluster dev-training', time: '1h ago' },
];

function GaugeCard({ label, value, color }: { label: string; value: number; color: string }) {
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const progress = (value / 100) * circumference;

    return (
        <Card padding="md" className="flex flex-col items-center">
            <svg width="88" height="88" viewBox="0 0 88 88" className="mb-2">
                <circle cx="44" cy="44" r={radius} fill="none" stroke="var(--color-surface-3)" strokeWidth="6" />
                <motion.circle
                    cx="44" cy="44" r={radius} fill="none"
                    stroke={color} strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={circumference} strokeDashoffset={circumference}
                    animate={{ strokeDashoffset: circumference - progress }}
                    transition={{ duration: 1, delay: 0.2 }}
                    transform="rotate(-90 44 44)"
                />
                <text x="44" y="44" textAnchor="middle" dy="0.35em" className="fill-heading text-lg font-semibold">{value}%</text>
            </svg>
            <span className="text-xs text-muted-foreground">{label}</span>
        </Card>
    );
}

export default function MonitoringPage() {
    return (
        <div className="space-y-5">
            <PageHeader title="Monitoring" description="Real-time resource utilization and alerts" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {gauges.map(g => <GaugeCard key={g.label} {...g} />)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <Card className="lg:col-span-2" padding="md">
                    <CardHeader><CardTitle>Resource Utilization (30m)</CardTitle></CardHeader>
                    <div className="h-52">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="gradGpu" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.15} /><stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} /></linearGradient>
                                    <linearGradient id="gradCpu" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--color-info)" stopOpacity={0.15} /><stop offset="95%" stopColor="var(--color-info)" stopOpacity={0} /></linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                                <XAxis dataKey="minute" stroke="var(--color-muted-foreground)" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--color-muted-foreground)" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} domain={[0, 100]} />
                                <Tooltip contentStyle={tooltipStyle} />
                                <Area type="monotone" dataKey="gpu" stroke="var(--color-primary)" fill="url(#gradGpu)" strokeWidth={1.5} name="GPU %" />
                                <Area type="monotone" dataKey="cpu" stroke="var(--color-info)" fill="url(#gradCpu)" strokeWidth={1.5} name="CPU %" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card padding="md">
                    <CardHeader><CardTitle>Active Alerts</CardTitle></CardHeader>
                    <div className="space-y-3">
                        {alerts.map(a => (
                            <div key={a.id} className="flex items-start gap-3 p-2.5 rounded-lg bg-surface-0 border border-border-subtle">
                                {a.severity === 'error' ? <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" /> :
                                    a.severity === 'warning' ? <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" /> :
                                        <CheckCircle className="w-4 h-4 text-info shrink-0 mt-0.5" />}
                                <div className="min-w-0">
                                    <p className="text-[13px] text-heading">{a.message}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
