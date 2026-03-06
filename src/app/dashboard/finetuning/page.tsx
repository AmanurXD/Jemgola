'use client';

import { motion } from 'framer-motion';
import { Brain, Plus, MoreHorizontal } from 'lucide-react';
import { cn, formatCurrency, formatDuration } from '@/lib/utils';
import { seedJobs } from '@/data/seed';
import Link from 'next/link';

const statusColors: Record<string, string> = { queued: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30', preparing: 'bg-blue-500/10 text-blue-400 border-blue-500/30', training: 'bg-purple-500/10 text-purple-400 border-purple-500/30', completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', failed: 'bg-red-500/10 text-red-400 border-red-500/30', cancelled: 'bg-zinc-500/10 text-zinc-500 border-zinc-500/30' };

export default function FinetuningPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-2xl font-bold">Finetuning</h1><p className="text-sm text-zinc-400">Train and fine-tune machine learning models</p></div>
                <Link href="/dashboard/finetuning/new" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"><Plus className="w-4 h-4" /> New Job</Link>
            </div>

            <div className="bg-card border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead><tr className="border-b border-white/5">
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3">Job Name</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3">Status</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden md:table-cell">Model</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden lg:table-cell">Progress</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden md:table-cell">GPU</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden lg:table-cell">Duration</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3">Cost</th>
                        <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">Actions</th>
                    </tr></thead>
                    <tbody>
                        {seedJobs.map((job, i) => (
                            <motion.tr key={job.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                                className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors cursor-pointer"
                            >
                                <td className="px-5 py-4">
                                    <Link href={`/dashboard/finetuning/${job.id}`} className="flex items-center gap-3">
                                        <Brain className="w-4 h-4 text-zinc-500" />
                                        <div><p className="text-sm font-medium">{job.name}</p><p className="text-xs text-zinc-600">{job.datasetName} ({job.datasetRows.toLocaleString()} rows)</p></div>
                                    </Link>
                                </td>
                                <td className="px-5 py-4"><span className={cn("text-[11px] px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5", statusColors[job.status])}>{job.status === 'training' && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}{job.status}</span></td>
                                <td className="px-5 py-4 text-sm text-zinc-400 hidden md:table-cell">{job.baseModel.split('/').pop()}</td>
                                <td className="px-5 py-4 hidden lg:table-cell">
                                    <div className="w-24">
                                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full rounded-full bg-purple-500 transition-all" style={{ width: `${job.progress}%` }} /></div>
                                        <span className="text-[10px] text-zinc-500 mt-0.5 block">{job.progress}% • Epoch {job.currentEpoch}/{job.totalEpochs}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-4 text-sm text-zinc-400 hidden md:table-cell">{job.gpuType}</td>
                                <td className="px-5 py-4 text-sm text-zinc-400 hidden lg:table-cell">{job.durationSeconds > 0 ? formatDuration(job.durationSeconds) : '—'}</td>
                                <td className="px-5 py-4 text-sm font-medium">{job.costAccrued > 0 ? formatCurrency(job.costAccrued) : '—'}</td>
                                <td className="px-5 py-4 text-right"><button className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500"><MoreHorizontal className="w-4 h-4" /></button></td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
