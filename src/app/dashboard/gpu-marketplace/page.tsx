'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Search, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { seedGpus } from '@/data/seed';

export default function GpuMarketplacePage() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const availabilityColors: Record<string, string> = { available: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', limited: 'bg-amber-500/10 text-amber-400 border-amber-500/30', sold_out: 'bg-red-500/10 text-red-400 border-red-500/30' };
    const availabilityLabels: Record<string, string> = { available: 'Available', limited: 'Limited', sold_out: 'Sold Out' };

    const filtered = seedGpus.filter(g => {
        if (search && !g.name.toLowerCase().includes(search.toLowerCase())) return false;
        if (category !== 'all' && g.category !== category) return false;
        return true;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">GPU Marketplace</h1>
                    <p className="text-sm text-zinc-400">Browse and deploy enterprise GPUs on demand</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search GPUs..."
                        className="w-full bg-card border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 transition-all" />
                </div>
                <div className="flex gap-2">
                    {[{ value: 'all', label: 'All' }, { value: 'data_center', label: 'Data Center' }, { value: 'professional', label: 'Professional' }, { value: 'consumer', label: 'Consumer' }].map(c => (
                        <button key={c.value} onClick={() => setCategory(c.value)}
                            className={cn("px-3 py-2 rounded-lg text-xs font-medium transition-all", category === c.value ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'bg-card border border-white/5 text-zinc-400 hover:text-white')}
                        >{c.label}</button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((gpu, i) => (
                    <motion.div key={gpu.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className="bg-card border border-white/5 rounded-xl p-5 hover:border-purple-500/20 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-medium text-zinc-500">{gpu.architecture}</span>
                            <span className={cn('text-[10px] px-2 py-0.5 rounded-full border', availabilityColors[gpu.availability])}>{availabilityLabels[gpu.availability]}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                            <Cpu className="w-4 h-4 text-purple-400" />
                            <h3 className="font-semibold">{gpu.name}</h3>
                        </div>
                        <p className="text-xs text-zinc-500 mb-4">{gpu.manufacturer} • {gpu.category.replace('_', ' ')}</p>
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs mb-4">
                            <div><span className="text-zinc-500">VRAM</span><p className="text-zinc-300 font-medium">{gpu.vram} GB</p></div>
                            <div><span className="text-zinc-500">Bandwidth</span><p className="text-zinc-300 font-medium">{gpu.memoryBandwidth.toLocaleString()} GB/s</p></div>
                            <div><span className="text-zinc-500">CUDA Cores</span><p className="text-zinc-300 font-medium">{gpu.cudaCores.toLocaleString()}</p></div>
                            <div><span className="text-zinc-500">Tensor Cores</span><p className="text-zinc-300 font-medium">{gpu.tensorCores}</p></div>
                            <div><span className="text-zinc-500">TDP</span><p className="text-zinc-300 font-medium">{gpu.tdp}W</p></div>
                            <div><span className="text-zinc-500">Region</span><p className="text-zinc-300 font-medium">{gpu.region}</p></div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <span className="text-xl font-bold text-purple-400">${gpu.pricePerHour}<span className="text-xs font-normal text-zinc-500">/hr</span></span>
                            <button className={cn("text-xs px-4 py-2 rounded-lg font-medium transition-all", gpu.availability === 'sold_out' ? 'bg-white/5 text-zinc-600 cursor-not-allowed' : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20')}>
                                {gpu.availability === 'sold_out' ? 'Unavailable' : 'Deploy'}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
