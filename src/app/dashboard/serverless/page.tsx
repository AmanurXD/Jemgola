'use client';

import { motion } from 'framer-motion';
import { Zap, Search, Plus, MoreHorizontal, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { seedEndpoints } from '@/data/seed';

const statusColors: Record<string, string> = {
    deploying: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    scaling: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    idle: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30',
    failed: 'bg-red-500/10 text-red-400 border-red-500/30',
};

export default function ServerlessPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-2xl font-bold">Serverless</h1><p className="text-sm text-zinc-400">Deploy and manage auto-scaling inference endpoints</p></div>
                <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"><Plus className="w-4 h-4" /> Deploy Endpoint</button>
            </div>

            <div className="bg-card border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead><tr className="border-b border-white/5">
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3">Name</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3">Status</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden md:table-cell">GPU</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden lg:table-cell">Requests/min</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden lg:table-cell">Avg Latency</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden md:table-cell">Workers</th>
                        <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">Actions</th>
                    </tr></thead>
                    <tbody>
                        {seedEndpoints.map((ep, i) => (
                            <motion.tr key={ep.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                                className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="px-5 py-4"><div className="flex items-center gap-3"><Zap className="w-4 h-4 text-zinc-500" /><div><p className="text-sm font-medium">{ep.name}</p><p className="text-xs text-zinc-600">{ep.containerImage}</p></div></div></td>
                                <td className="px-5 py-4"><span className={cn("text-[11px] px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5", statusColors[ep.status])}>{ep.status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}{ep.status}</span></td>
                                <td className="px-5 py-4 text-sm text-zinc-400 hidden md:table-cell">{ep.gpuType}</td>
                                <td className="px-5 py-4 text-sm text-zinc-400 hidden lg:table-cell">{ep.requestsPerMin.toLocaleString()}</td>
                                <td className="px-5 py-4 text-sm text-zinc-400 hidden lg:table-cell">{ep.avgLatencyMs}ms</td>
                                <td className="px-5 py-4 text-sm text-zinc-400 hidden md:table-cell">{ep.activeWorkers}/{ep.maxWorkers}</td>
                                <td className="px-5 py-4 text-right"><button className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500"><MoreHorizontal className="w-4 h-4" /></button></td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
