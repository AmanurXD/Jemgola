'use client';

import { use, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Server, Play, Square, RotateCw, Trash2, Copy } from 'lucide-react';
import { cn, formatCurrency, formatDuration, formatDateTime } from '@/lib/utils';
import { seedPods, seedLogs } from '@/data/seed';
import { Card, CardHeader, CardTitle, Button, StatusBadge, Tabs } from '@/components/ui';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import type { PodStatus } from '@/domain/models';

const tooltipStyle = {
    background: 'var(--color-surface-2)',
    border: '1px solid var(--color-border-strong)',
    borderRadius: '8px',
    fontSize: 12,
    boxShadow: 'var(--shadow-md)',
};

const metricsData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    gpu: Math.max(10, Math.min(100, 70 + Math.sin(i / 3) * 20 + (Math.random() - 0.5) * 10)),
    cpu: Math.max(5, Math.min(100, 40 + Math.cos(i / 4) * 15 + (Math.random() - 0.5) * 10)),
    memory: Math.max(20, Math.min(100, 55 + Math.sin(i / 5) * 10 + (Math.random() - 0.5) * 8)),
}));

const tabList = ['Overview', 'Logs', 'Metrics', 'Settings'];

export default function PodDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const pod = seedPods.find(p => p.id === resolvedParams.id) || seedPods[0];
    const [activeTab, setActiveTab] = useState('Overview');
    const [status, setStatus] = useState<PodStatus>(pod.status);

    const podLogs = seedLogs.filter(l => l.source === pod.name || l.sourceType === 'pod').slice(0, 8);

    const handleAction = (action: string) => {
        const transitions: Record<string, PodStatus> = { start: 'starting', stop: 'stopping', restart: 'restarting' };
        const finalStates: Record<string, PodStatus> = { start: 'running', stop: 'stopped', restart: 'running' };
        setStatus(transitions[action] || status);
        if (finalStates[action]) setTimeout(() => setStatus(finalStates[action]), 2000);
    };

    const severityConfig: Record<string, string> = {
        error: 'bg-destructive/8 text-destructive border-destructive/20',
        warning: 'bg-warning/8 text-warning border-warning/20',
        info: 'bg-info/8 text-info border-info/20',
        debug: 'bg-surface-2 text-muted-foreground border-border',
    };

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <Link href="/dashboard/pods" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-2 transition-colors">
                        <ArrowLeft className="w-3 h-3" /> Back to Pods
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-surface-2 flex items-center justify-center">
                            <Server className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-heading tracking-tight">{pod.name}</h1>
                            <p className="text-xs text-muted-foreground font-mono">{pod.config.containerImage}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <StatusBadge status={status} />
                    <div className="flex gap-1.5">
                        {status === 'stopped' && <Button size="sm" variant="secondary" icon={<Play />} onClick={() => handleAction('start')}>Start</Button>}
                        {status === 'running' && (
                            <>
                                <Button size="sm" variant="secondary" icon={<Square />} onClick={() => handleAction('stop')}>Stop</Button>
                                <Button size="sm" variant="secondary" icon={<RotateCw />} onClick={() => handleAction('restart')}>Restart</Button>
                            </>
                        )}
                        <Button size="sm" variant="danger" icon={<Trash2 />}>Delete</Button>
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                    { label: 'GPU', value: pod.gpuName },
                    { label: 'Region', value: pod.region },
                    { label: 'Uptime', value: pod.uptimeSeconds > 0 ? formatDuration(pod.uptimeSeconds) : '—' },
                    { label: 'Cost', value: pod.costAccrued > 0 ? formatCurrency(pod.costAccrued) : '—' },
                ].map(s => (
                    <Card key={s.label} padding="sm">
                        <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium mb-1">{s.label}</p>
                        <p className="text-[14px] font-semibold text-heading">{s.value}</p>
                    </Card>
                ))}
            </div>

            <Tabs tabs={tabList} active={activeTab} onChange={setActiveTab} layoutId="pod-tab" />

            {activeTab === 'Overview' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <Card padding="md">
                        <CardHeader><CardTitle>Container Config</CardTitle></CardHeader>
                        <div className="space-y-2.5 text-[13px]">
                            {[
                                ['Image', pod.config.containerImage],
                                ['GPU Count', pod.config.gpuCount],
                                ['CPU Limit', `${pod.config.cpuLimit} cores`],
                                ['Memory', `${pod.config.memoryLimit} GB`],
                                ['Ports', pod.config.ports.join(', ')],
                            ].map(([k, v]) => (
                                <div key={k as string} className="flex justify-between">
                                    <span className="text-muted-foreground">{k}</span>
                                    <span className="text-heading font-mono text-xs">{v}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                    <Card padding="md">
                        <CardHeader><CardTitle>Environment Variables</CardTitle></CardHeader>
                        <div className="space-y-1.5">
                            {Object.entries(pod.config.envVars).map(([k, v]) => (
                                <div key={k} className="flex items-center gap-2 bg-surface-0 rounded-md px-3 py-2">
                                    <span className="text-xs text-primary font-mono">{k}</span>
                                    <span className="text-muted-foreground/40">=</span>
                                    <span className="text-xs text-secondary-foreground font-mono flex-1 truncate">{v}</span>
                                    <button className="text-muted-foreground hover:text-foreground transition-colors"><Copy className="w-3 h-3" /></button>
                                </div>
                            ))}
                            {Object.keys(pod.config.envVars).length === 0 && <p className="text-xs text-muted-foreground">No environment variables set</p>}
                        </div>
                    </Card>
                    <Card padding="md">
                        <CardHeader><CardTitle>Endpoints</CardTitle></CardHeader>
                        <div className="space-y-1.5">
                            {pod.config.ports.map(port => (
                                <div key={port} className="flex items-center justify-between bg-surface-0 rounded-md px-3 py-2">
                                    <span className="text-xs text-muted-foreground font-mono">https://{pod.id}.jemgola.run:{port}</span>
                                    <button className="text-muted-foreground hover:text-foreground transition-colors"><Copy className="w-3 h-3" /></button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </motion.div>
            )}

            {activeTab === 'Logs' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-surface-0 border border-border rounded-xl overflow-hidden font-mono text-xs">
                    {podLogs.map(log => (
                        <div key={log.id} className="flex items-start gap-3 px-4 py-2.5 border-b border-border-subtle last:border-0 hover:bg-surface-1/50 transition-colors">
                            <span className="text-muted-foreground/50 shrink-0 w-16 tabular-nums">{formatDateTime(log.timestamp).split(',').pop()?.trim()}</span>
                            <span className={cn("text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded border shrink-0 w-14 text-center", severityConfig[log.severity] || severityConfig.debug)}>
                                {log.severity}
                            </span>
                            <span className="text-secondary-foreground">{log.message}</span>
                        </div>
                    ))}
                </motion.div>
            )}

            {activeTab === 'Metrics' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    {[
                        { label: 'GPU Utilization', key: 'gpu', color: 'var(--color-primary)' },
                        { label: 'CPU Usage', key: 'cpu', color: 'var(--color-info)' },
                        { label: 'Memory Usage', key: 'memory', color: '#36b5a0' },
                    ].map(chart => (
                        <Card key={chart.key} padding="md">
                            <CardHeader><CardTitle>{chart.label}</CardTitle></CardHeader>
                            <div className="h-36">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={metricsData}>
                                        <defs><linearGradient id={`grad-${chart.key}`} x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={chart.color} stopOpacity={0.15} /><stop offset="95%" stopColor={chart.color} stopOpacity={0} /></linearGradient></defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                                        <XAxis dataKey="time" stroke="var(--color-muted-foreground)" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                                        <YAxis stroke="var(--color-muted-foreground)" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} domain={[0, 100]} />
                                        <Tooltip contentStyle={tooltipStyle} />
                                        <Area type="monotone" dataKey={chart.key} stroke={chart.color} fill={`url(#grad-${chart.key})`} strokeWidth={1.5} name="%" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    ))}
                </motion.div>
            )}

            {activeTab === 'Settings' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Card padding="lg" className="max-w-lg">
                        <CardHeader><CardTitle>Pod Settings</CardTitle></CardHeader>
                        <div className="space-y-3">
                            <div><label className="text-xs text-muted-foreground mb-1.5 block">Container Image</label><input type="text" defaultValue={pod.config.containerImage} className="w-full bg-surface-0 border border-border-strong rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/40 font-mono transition-all" /></div>
                            <div><label className="text-xs text-muted-foreground mb-1.5 block">CPU Limit</label><input type="number" defaultValue={pod.config.cpuLimit} className="w-full bg-surface-0 border border-border-strong rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/40 transition-all" /></div>
                            <div><label className="text-xs text-muted-foreground mb-1.5 block">Memory (GB)</label><input type="number" defaultValue={pod.config.memoryLimit} className="w-full bg-surface-0 border border-border-strong rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/40 transition-all" /></div>
                            <Button>Save Changes</Button>
                        </div>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
