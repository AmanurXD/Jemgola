'use client';

import { motion } from 'framer-motion';
import { Network, Plus, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { seedClusters } from '@/data/seed';
import Link from 'next/link';

const statusColors: Record<string, string> = { creating: 'bg-blue-500/10 text-blue-400', active: 'bg-emerald-500/10 text-emerald-400', scaling: 'bg-amber-500/10 text-amber-400', degraded: 'bg-red-500/10 text-red-400', deleting: 'bg-red-500/10 text-red-400' };

export default function ClustersPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-2xl font-bold">Clusters</h1><p className="text-sm text-zinc-400">Manage multi-node GPU clusters</p></div>
                <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"><Plus className="w-4 h-4" /> Create Cluster</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {seedClusters.map((cls, i) => (
                    <motion.div key={cls.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className="bg-card border border-white/5 rounded-xl p-5 hover:border-purple-500/20 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className={cn("text-[11px] px-2.5 py-1 rounded-full", statusColors[cls.status])}>{cls.status}</span>
                            <span className="text-xs text-zinc-500 capitalize">{cls.scalingPolicy}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                            <Network className="w-4 h-4 text-purple-400" />
                            <h3 className="font-semibold text-sm">{cls.name}</h3>
                        </div>
                        <p className="text-xs text-zinc-500 mb-4">{cls.gpuType} • {cls.region}</p>
                        <div className="grid grid-cols-3 gap-3 text-center mb-4">
                            <div className="bg-white/5 rounded-lg p-2"><p className="text-lg font-bold">{cls.nodes.length}</p><p className="text-[10px] text-zinc-500">Nodes</p></div>
                            <div className="bg-white/5 rounded-lg p-2"><p className="text-lg font-bold">{cls.nodes.length}</p><p className="text-[10px] text-zinc-500">GPUs</p></div>
                            <div className="bg-white/5 rounded-lg p-2"><p className="text-lg font-bold">{cls.totalVram}</p><p className="text-[10px] text-zinc-500">GB VRAM</p></div>
                        </div>
                        {cls.nodes.length > 0 && (
                            <div className="space-y-1.5 mb-4">
                                {cls.nodes.slice(0, 3).map(node => (
                                    <div key={node.id} className="flex items-center gap-2">
                                        <div className={cn("w-2 h-2 rounded-full", node.status === 'healthy' ? 'bg-emerald-400' : node.status === 'degraded' ? 'bg-amber-400' : 'bg-red-400')} />
                                        <span className="text-xs text-zinc-400 flex-1">{node.id}</span>
                                        <span className="text-xs text-zinc-500">{Math.round(node.gpuUtilization)}%</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <Link href={`/dashboard/clusters/${cls.id}`} className="w-full flex items-center justify-center gap-2 bg-white/5 rounded-lg py-2 text-xs text-zinc-400 hover:bg-white/10 hover:text-white transition-colors">
                            <Settings2 className="w-3 h-3" /> Manage
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
