'use client';

import { motion } from 'framer-motion';
import { HardDrive, Plus, MoreHorizontal } from 'lucide-react';
import { cn, formatDuration } from '@/lib/utils';

const nodes = [
    { id: 'node-1', status: 'healthy' as const, gpu: 'NVIDIA H100 SXM', region: 'US East', cpu: 42, memory: 58, gpuUtil: 78, uptimeSeconds: 864000, pods: 3 },
    { id: 'node-2', status: 'healthy' as const, gpu: 'NVIDIA A100 80GB', region: 'US West', cpu: 35, memory: 45, gpuUtil: 65, uptimeSeconds: 432000, pods: 2 },
    { id: 'node-3', status: 'degraded' as const, gpu: 'NVIDIA RTX 4090', region: 'EU West', cpu: 88, memory: 92, gpuUtil: 95, uptimeSeconds: 172800, pods: 4 },
    { id: 'node-4', status: 'offline' as const, gpu: 'NVIDIA L40S', region: 'EU Central', cpu: 0, memory: 0, gpuUtil: 0, uptimeSeconds: 0, pods: 0 },
    { id: 'node-5', status: 'healthy' as const, gpu: 'NVIDIA RTX 4090', region: 'US East', cpu: 55, memory: 62, gpuUtil: 71, uptimeSeconds: 604800, pods: 2 },
];

const statusConfig: Record<string, { color: string; dot: string }> = {
    healthy: { color: 'text-emerald-400', dot: 'bg-emerald-400' },
    degraded: { color: 'text-amber-400', dot: 'bg-amber-400' },
    offline: { color: 'text-red-400', dot: 'bg-red-400' },
    provisioning: { color: 'text-blue-400', dot: 'bg-blue-400' },
    draining: { color: 'text-amber-400', dot: 'bg-amber-400' },
};

function UtilBar({ value, color }: { value: number; color: string }) {
    return (
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.8 }}
                className={cn("h-full rounded-full", value > 80 ? 'bg-red-500' : value > 60 ? 'bg-amber-500' : `bg-${color}-500`)}
                style={{ backgroundColor: value > 80 ? '#ef4444' : value > 60 ? '#f59e0b' : '#7c3aed' }}
            />
        </div>
    );
}

export default function NodesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-2xl font-bold">Nodes</h1><p className="text-sm text-zinc-400">Manage GPU compute nodes</p></div>
                <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"><Plus className="w-4 h-4" /> Add Node</button>
            </div>

            <div className="bg-card border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead><tr className="border-b border-white/5">
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3">Node</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3">Status</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden md:table-cell">GPU</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden lg:table-cell">CPU</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden lg:table-cell">Memory</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden lg:table-cell">GPU Util</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden md:table-cell">Uptime</th>
                        <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">Actions</th>
                    </tr></thead>
                    <tbody>
                        {nodes.map((n, i) => {
                            const sc = statusConfig[n.status];
                            return (
                                <motion.tr key={n.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="px-5 py-4"><div className="flex items-center gap-3"><HardDrive className="w-4 h-4 text-zinc-500" /><div><p className="text-sm font-medium">{n.id}</p><p className="text-xs text-zinc-600">{n.region} • {n.pods} pods</p></div></div></td>
                                    <td className="px-5 py-4"><span className={cn("inline-flex items-center gap-1.5 text-[11px] capitalize", sc.color)}><span className={cn("w-1.5 h-1.5 rounded-full", sc.dot)} />{n.status}</span></td>
                                    <td className="px-5 py-4 text-sm text-zinc-400 hidden md:table-cell">{n.gpu}</td>
                                    <td className="px-5 py-4 hidden lg:table-cell"><div className="w-20"><UtilBar value={n.cpu} color="purple" /><span className="text-[10px] text-zinc-500 mt-0.5 block">{n.cpu}%</span></div></td>
                                    <td className="px-5 py-4 hidden lg:table-cell"><div className="w-20"><UtilBar value={n.memory} color="blue" /><span className="text-[10px] text-zinc-500 mt-0.5 block">{n.memory}%</span></div></td>
                                    <td className="px-5 py-4 hidden lg:table-cell"><div className="w-20"><UtilBar value={n.gpuUtil} color="cyan" /><span className="text-[10px] text-zinc-500 mt-0.5 block">{n.gpuUtil}%</span></div></td>
                                    <td className="px-5 py-4 text-sm text-zinc-400 hidden md:table-cell">{n.uptimeSeconds > 0 ? formatDuration(n.uptimeSeconds) : '—'}</td>
                                    <td className="px-5 py-4 text-right"><button className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500"><MoreHorizontal className="w-4 h-4" /></button></td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
