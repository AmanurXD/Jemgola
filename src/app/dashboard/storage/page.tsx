'use client';

import { motion } from 'framer-motion';
import { Database, Plus, MoreHorizontal, Link2 } from 'lucide-react';
import { cn, formatBytes, formatDate } from '@/lib/utils';
import { seedVolumes } from '@/data/seed';

const statusColors: Record<string, string> = { creating: 'text-blue-400', available: 'text-emerald-400', attached: 'text-purple-400', detaching: 'text-amber-400', deleting: 'text-red-400' };

export default function StoragePage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-2xl font-bold">Storage</h1><p className="text-sm text-zinc-400">Manage persistent network volumes</p></div>
                <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"><Plus className="w-4 h-4" /> Create Volume</button>
            </div>

            <div className="bg-card border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead><tr className="border-b border-white/5">
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3">Volume</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3">Status</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden md:table-cell">Size</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden lg:table-cell">Used</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden md:table-cell">Attached To</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden lg:table-cell">Region</th>
                        <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">Actions</th>
                    </tr></thead>
                    <tbody>
                        {seedVolumes.map((vol, i) => (
                            <motion.tr key={vol.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                                className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="px-5 py-4"><div className="flex items-center gap-3"><Database className="w-4 h-4 text-zinc-500" /><div><p className="text-sm font-medium">{vol.name}</p><p className="text-xs text-zinc-600">{vol.filesystemType}</p></div></div></td>
                                <td className="px-5 py-4"><span className={cn("text-[11px] capitalize", statusColors[vol.status])}>{vol.status}</span></td>
                                <td className="px-5 py-4 text-sm text-zinc-400 hidden md:table-cell">{vol.sizeGb} GB</td>
                                <td className="px-5 py-4 hidden lg:table-cell">
                                    <div className="w-20">
                                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full rounded-full bg-purple-500" style={{ width: `${(vol.usedGb / vol.sizeGb) * 100}%` }} />
                                        </div>
                                        <span className="text-[10px] text-zinc-500 mt-0.5 block">{vol.usedGb}/{vol.sizeGb} GB</span>
                                    </div>
                                </td>
                                <td className="px-5 py-4 text-sm hidden md:table-cell">
                                    {vol.attachedPodName ? (
                                        <span className="inline-flex items-center gap-1 text-purple-400 text-xs"><Link2 className="w-3 h-3" />{vol.attachedPodName}</span>
                                    ) : <span className="text-zinc-600 text-xs">Not attached</span>}
                                </td>
                                <td className="px-5 py-4 text-sm text-zinc-400 hidden lg:table-cell">{vol.region}</td>
                                <td className="px-5 py-4 text-right"><button className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500"><MoreHorizontal className="w-4 h-4" /></button></td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
