'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Search, Plus, Play, Square, RotateCw, Trash2, MoreHorizontal, ExternalLink } from 'lucide-react';
import { cn, formatCurrency, formatDuration, formatRelativeTime } from '@/lib/utils';
import { seedPods } from '@/data/seed';
import type { PodStatus } from '@/domain/models';
import Link from 'next/link';

const statusConfig: Record<PodStatus, { color: string; label: string; pulse?: boolean }> = {
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

export default function PodsPage() {
    const [pods, setPods] = useState(seedPods.filter(p => p.status !== 'deleted'));
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [actionMenu, setActionMenu] = useState<string | null>(null);

    const filtered = pods.filter(p => {
        if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
        if (statusFilter !== 'all' && p.status !== statusFilter) return false;
        return true;
    });

    const handleAction = (podId: string, action: string) => {
        setActionMenu(null);
        const transitions: Record<string, PodStatus> = { start: 'starting', stop: 'stopping', restart: 'restarting', delete: 'deleting' };
        const finalStates: Record<string, PodStatus> = { start: 'running', stop: 'stopped', restart: 'running' };

        setPods(pods.map(p => p.id === podId ? { ...p, status: transitions[action] || p.status } : p));

        if (action === 'delete') {
            setTimeout(() => setPods(prev => prev.filter(p => p.id !== podId)), 1500);
        } else if (finalStates[action]) {
            setTimeout(() => setPods(prev => prev.map(p => p.id === podId ? { ...p, status: finalStates[action] } : p)), 2000);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Pods</h1>
                    <p className="text-sm text-zinc-400">Manage your GPU pod instances</p>
                </div>
                <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                    <Plus className="w-4 h-4" /> Create Pod
                </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search pods..."
                        className="w-full bg-card border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 transition-all" />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {['all', 'running', 'stopped', 'failed', 'creating'].map(s => (
                        <button key={s} onClick={() => setStatusFilter(s)}
                            className={cn("px-3 py-2 rounded-lg text-xs font-medium transition-all capitalize", statusFilter === s ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'bg-card border border-white/5 text-zinc-400 hover:text-white')}
                        >{s}</button>
                    ))}
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-20">
                    <Server className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No pods found</h3>
                    <p className="text-sm text-zinc-500 mb-4">Deploy your first GPU pod to get started.</p>
                    <button className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm">
                        <Plus className="w-4 h-4" /> Create Pod
                    </button>
                </div>
            ) : (
                <div className="bg-card border border-white/5 rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3">Name</th>
                                <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3">Status</th>
                                <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden lg:table-cell">GPU</th>
                                <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden md:table-cell">Region</th>
                                <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden lg:table-cell">Uptime</th>
                                <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3">Cost</th>
                                <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((pod, i) => {
                                const sc = statusConfig[pod.status];
                                return (
                                    <motion.tr key={pod.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                                        className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors cursor-pointer"
                                    >
                                        <td className="px-5 py-4">
                                            <Link href={`/dashboard/pods/${pod.id}`} className="flex items-center gap-3">
                                                <Server className="w-4 h-4 text-zinc-500" />
                                                <div>
                                                    <p className="text-sm font-medium">{pod.name}</p>
                                                    <p className="text-xs text-zinc-600">{pod.config.containerImage}</p>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={cn("inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border", sc.color)}>
                                                {sc.pulse && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
                                                {sc.label}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-zinc-400 hidden lg:table-cell">{pod.gpuName}</td>
                                        <td className="px-5 py-4 text-sm text-zinc-400 hidden md:table-cell">{pod.region}</td>
                                        <td className="px-5 py-4 text-sm text-zinc-400 hidden lg:table-cell">{pod.uptimeSeconds > 0 ? formatDuration(pod.uptimeSeconds) : '—'}</td>
                                        <td className="px-5 py-4 text-sm font-medium">{pod.costAccrued > 0 ? formatCurrency(pod.costAccrued) : '—'}</td>
                                        <td className="px-5 py-4 text-right">
                                            <div className="relative inline-block">
                                                <button onClick={(e) => { e.stopPropagation(); setActionMenu(actionMenu === pod.id ? null : pod.id); }}
                                                    className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-colors">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                                {actionMenu === pod.id && (
                                                    <>
                                                        <div className="fixed inset-0 z-40" onClick={() => setActionMenu(null)} />
                                                        <div className="absolute right-0 top-8 z-50 bg-card border border-white/10 rounded-lg shadow-xl w-40 py-1">
                                                            {pod.status === 'stopped' && <button onClick={() => handleAction(pod.id, 'start')} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-300 hover:bg-white/5"><Play className="w-3 h-3" /> Start</button>}
                                                            {pod.status === 'running' && (
                                                                <>
                                                                    <button onClick={() => handleAction(pod.id, 'stop')} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-300 hover:bg-white/5"><Square className="w-3 h-3" /> Stop</button>
                                                                    <button onClick={() => handleAction(pod.id, 'restart')} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-300 hover:bg-white/5"><RotateCw className="w-3 h-3" /> Restart</button>
                                                                </>
                                                            )}
                                                            <Link href={`/dashboard/pods/${pod.id}`} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-300 hover:bg-white/5"><ExternalLink className="w-3 h-3" /> View Details</Link>
                                                            <div className="border-t border-white/5 my-1" />
                                                            <button onClick={() => handleAction(pod.id, 'delete')} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/5"><Trash2 className="w-3 h-3" /> Delete</button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
