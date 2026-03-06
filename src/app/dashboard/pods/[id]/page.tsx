'use client';

import { use } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Server, Play, Square, RotateCw, Trash2, Terminal, Activity, Settings, Eye, Copy } from 'lucide-react';
import { cn, formatCurrency, formatDuration, formatDateTime } from '@/lib/utils';
import { seedPods, seedLogs } from '@/data/seed';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import type { PodStatus } from '@/domain/models';

const statusConfig: Record<string, { color: string; label: string; pulse?: boolean }> = {
    creating: { color: 'bg-blue-500/10 text-blue-400 border-blue-500/30', label: 'Creating' },
    provisioning: { color: 'bg-blue-500/10 text-blue-400 border-blue-500/30', label: 'Provisioning' },
    starting: { color: 'bg-amber-500/10 text-amber-400 border-amber-500/30', label: 'Starting' },
    running: { color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', label: 'Running', pulse: true },
    stopping: { color: 'bg-amber-500/10 text-amber-400 border-amber-500/30', label: 'Stopping' },
    stopped: { color: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30', label: 'Stopped' },
    failed: { color: 'bg-red-500/10 text-red-400 border-red-500/30', label: 'Failed' },
    restarting: { color: 'bg-amber-500/10 text-amber-400 border-amber-500/30', label: 'Restarting' },
    deleting: { color: 'bg-red-500/10 text-red-400 border-red-500/30', label: 'Deleting' },
    deleted: { color: 'bg-zinc-500/10 text-zinc-500 border-zinc-500/30', label: 'Deleted' },
};

const metricsData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    gpu: Math.max(10, Math.min(100, 70 + Math.sin(i / 3) * 20 + (Math.random() - 0.5) * 10)),
    cpu: Math.max(5, Math.min(100, 40 + Math.cos(i / 4) * 15 + (Math.random() - 0.5) * 10)),
    memory: Math.max(20, Math.min(100, 55 + Math.sin(i / 5) * 10 + (Math.random() - 0.5) * 8)),
}));

const tabs = ['Overview', 'Logs', 'Metrics', 'Settings'];

export default function PodDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const pod = seedPods.find(p => p.id === resolvedParams.id) || seedPods[0];
    const [activeTab, setActiveTab] = useState('Overview');
    const [status, setStatus] = useState<PodStatus>(pod.status);
    const sc = statusConfig[status];

    const podLogs = seedLogs.filter(l => l.source === pod.name || l.sourceType === 'pod').slice(0, 8);

    const handleAction = (action: string) => {
        const transitions: Record<string, PodStatus> = { start: 'starting', stop: 'stopping', restart: 'restarting' };
        const finalStates: Record<string, PodStatus> = { start: 'running', stop: 'stopped', restart: 'running' };
        setStatus(transitions[action] || status);
        if (finalStates[action]) {
            setTimeout(() => setStatus(finalStates[action]), 2000);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <Link href="/dashboard/pods" className="text-xs text-zinc-500 hover:text-zinc-300 inline-flex items-center gap-1 mb-2">
                        <ArrowLeft className="w-3 h-3" /> Back to Pods
                    </Link>
                    <div className="flex items-center gap-3">
                        <Server className="w-6 h-6 text-purple-400" />
                        <div>
                            <h1 className="text-2xl font-bold">{pod.name}</h1>
                            <p className="text-sm text-zinc-400">{pod.config.containerImage}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className={cn("inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border", sc.color)}>
                        {sc.pulse && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
                        {sc.label}
                    </span>
                    <div className="flex gap-2">
                        {status === 'stopped' && <button onClick={() => handleAction('start')} className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg text-xs hover:bg-emerald-500/20 transition-colors"><Play className="w-3 h-3" /> Start</button>}
                        {status === 'running' && (
                            <>
                                <button onClick={() => handleAction('stop')} className="inline-flex items-center gap-1.5 bg-white/5 text-zinc-300 px-3 py-1.5 rounded-lg text-xs hover:bg-white/10 transition-colors"><Square className="w-3 h-3" /> Stop</button>
                                <button onClick={() => handleAction('restart')} className="inline-flex items-center gap-1.5 bg-white/5 text-zinc-300 px-3 py-1.5 rounded-lg text-xs hover:bg-white/10 transition-colors"><RotateCw className="w-3 h-3" /> Restart</button>
                            </>
                        )}
                        <button className="inline-flex items-center gap-1.5 bg-red-500/10 text-red-400 px-3 py-1.5 rounded-lg text-xs hover:bg-red-500/20 transition-colors"><Trash2 className="w-3 h-3" /> Delete</button>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'GPU', value: pod.gpuName },
                    { label: 'Region', value: pod.region },
                    { label: 'Uptime', value: pod.uptimeSeconds > 0 ? formatDuration(pod.uptimeSeconds) : '—' },
                    { label: 'Cost', value: pod.costAccrued > 0 ? formatCurrency(pod.costAccrued) : '—' },
                ].map(s => (
                    <div key={s.label} className="bg-card border border-white/5 rounded-xl p-4">
                        <p className="text-xs text-zinc-500 mb-1">{s.label}</p>
                        <p className="text-sm font-bold">{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-white/5">
                {tabs.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={cn("px-4 py-2.5 text-sm transition-all relative", activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300')}
                    >
                        {tab}
                        {activeTab === tab && <motion.div layoutId="pod-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'Overview' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-card border border-white/5 rounded-xl p-5">
                        <h3 className="text-sm font-medium mb-4">Container Config</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between"><span className="text-zinc-400">Image</span><span className="font-mono text-xs">{pod.config.containerImage}</span></div>
                            <div className="flex justify-between"><span className="text-zinc-400">GPU Count</span><span>{pod.config.gpuCount}</span></div>
                            <div className="flex justify-between"><span className="text-zinc-400">CPU Limit</span><span>{pod.config.cpuLimit} cores</span></div>
                            <div className="flex justify-between"><span className="text-zinc-400">Memory</span><span>{pod.config.memoryLimit} GB</span></div>
                            <div className="flex justify-between"><span className="text-zinc-400">Ports</span><span>{pod.config.ports.join(', ')}</span></div>
                        </div>
                    </div>
                    <div className="bg-card border border-white/5 rounded-xl p-5">
                        <h3 className="text-sm font-medium mb-4">Environment Variables</h3>
                        <div className="space-y-2">
                            {Object.entries(pod.config.envVars).map(([k, v]) => (
                                <div key={k} className="flex items-center gap-2 bg-zinc-950 rounded-lg px-3 py-2">
                                    <span className="text-xs text-cyan-400 font-mono">{k}</span>
                                    <span className="text-xs text-zinc-500">=</span>
                                    <span className="text-xs text-zinc-300 font-mono flex-1 truncate">{v}</span>
                                    <button className="text-zinc-600 hover:text-zinc-400"><Copy className="w-3 h-3" /></button>
                                </div>
                            ))}
                            {Object.keys(pod.config.envVars).length === 0 && <p className="text-xs text-zinc-600">No environment variables set</p>}
                        </div>
                    </div>
                    <div className="bg-card border border-white/5 rounded-xl p-5">
                        <h3 className="text-sm font-medium mb-4">Endpoints</h3>
                        <div className="space-y-2">
                            {pod.config.ports.map(port => (
                                <div key={port} className="flex items-center justify-between bg-zinc-950 rounded-lg px-3 py-2">
                                    <span className="text-xs text-zinc-400 font-mono">https://{pod.id}.jemgola.run:{port}</span>
                                    <button className="text-zinc-600 hover:text-zinc-400"><Copy className="w-3 h-3" /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            {activeTab === 'Logs' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="bg-zinc-950 border border-white/5 rounded-xl overflow-hidden font-mono text-sm"
                >
                    {podLogs.map((log, i) => (
                        <div key={log.id} className="flex items-start gap-3 px-4 py-2.5 border-b border-white/[0.03] hover:bg-white/[0.02]">
                            <span className="text-xs text-zinc-600 shrink-0 w-20">{formatDateTime(log.timestamp).split(',').pop()?.trim()}</span>
                            <span className={cn("text-[10px] uppercase font-bold px-1.5 py-0.5 rounded shrink-0 w-14 text-center",
                                log.severity === 'error' ? 'bg-red-500/10 text-red-400' : log.severity === 'warning' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                            )}>{log.severity}</span>
                            <span className="text-xs text-zinc-300">{log.message}</span>
                        </div>
                    ))}
                </motion.div>
            )}

            {activeTab === 'Metrics' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    {[
                        { label: 'GPU Utilization', key: 'gpu', color: '#7c3aed' },
                        { label: 'CPU Usage', key: 'cpu', color: '#3b82f6' },
                        { label: 'Memory Usage', key: 'memory', color: '#06b6d4' },
                    ].map(chart => (
                        <div key={chart.key} className="bg-card border border-white/5 rounded-xl p-5">
                            <h3 className="text-sm font-medium mb-4">{chart.label}</h3>
                            <div className="h-40">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={metricsData}>
                                        <defs><linearGradient id={`grad-${chart.key}`} x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={chart.color} stopOpacity={0.3} /><stop offset="95%" stopColor={chart.color} stopOpacity={0} /></linearGradient></defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                                        <XAxis dataKey="time" stroke="#52525b" tick={{ fontSize: 10 }} tickLine={false} />
                                        <YAxis stroke="#52525b" tick={{ fontSize: 10 }} tickLine={false} domain={[0, 100]} />
                                        <Tooltip contentStyle={{ background: '#18181b', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: 12 }} />
                                        <Area type="monotone" dataKey={chart.key} stroke={chart.color} fill={`url(#grad-${chart.key})`} strokeWidth={2} name="%" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    ))}
                </motion.div>
            )}

            {activeTab === 'Settings' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-white/5 rounded-xl p-6 space-y-4 max-w-lg">
                    <h3 className="text-sm font-medium mb-4">Pod Settings</h3>
                    <div><label className="text-xs text-zinc-400 mb-1.5 block">Container Image</label><input type="text" defaultValue={pod.config.containerImage} className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500/50 transition-all font-mono" /></div>
                    <div><label className="text-xs text-zinc-400 mb-1.5 block">CPU Limit</label><input type="number" defaultValue={pod.config.cpuLimit} className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500/50 transition-all" /></div>
                    <div><label className="text-xs text-zinc-400 mb-1.5 block">Memory (GB)</label><input type="number" defaultValue={pod.config.memoryLimit} className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500/50 transition-all" /></div>
                    <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm transition-all">Save Changes</button>
                </motion.div>
            )}
        </div>
    );
}
