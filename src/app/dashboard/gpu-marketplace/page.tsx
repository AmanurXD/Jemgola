'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { seedGpus } from '@/data/seed';
import { Card, PageHeader, Input, FilterChips, StatusBadge, Button } from '@/components/ui';

export default function GpuMarketplacePage() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');

    const filtered = seedGpus.filter(g => {
        if (search && !g.name.toLowerCase().includes(search.toLowerCase())) return false;
        if (category !== 'all' && g.category !== category) return false;
        return true;
    });

    const categoryOptions = [
        { value: 'all', label: 'All' },
        { value: 'data_center', label: 'Data Center' },
        { value: 'professional', label: 'Professional' },
        { value: 'consumer', label: 'Consumer' },
    ];

    return (
        <div className="space-y-5">
            <PageHeader title="GPU Marketplace" description="Browse and deploy enterprise GPUs on demand" />

            <div className="flex flex-col sm:flex-row gap-3">
                <Input icon={<Search />} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search GPUs…" className="flex-1" />
                <FilterChips options={categoryOptions} value={category} onChange={setCategory} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((gpu, i) => (
                    <motion.div key={gpu.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04, duration: 0.25 }}>
                        <Card padding="none" className="overflow-hidden group hover:border-border-strong transition-all duration-200">
                            <div className="p-4 pb-0">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{gpu.architecture}</span>
                                    <StatusBadge status={gpu.availability} />
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Cpu className="w-4 h-4 text-primary/70" />
                                    <h3 className="text-[15px] font-semibold text-heading tracking-tight">{gpu.name}</h3>
                                </div>
                                <p className="text-xs text-muted-foreground mb-3">{gpu.manufacturer} · {gpu.category.replace('_', ' ')}</p>
                            </div>

                            <div className="px-4 pb-4">
                                <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
                                    {[
                                        ['VRAM', `${gpu.vram} GB`],
                                        ['Bandwidth', `${gpu.memoryBandwidth.toLocaleString()} GB/s`],
                                        ['CUDA Cores', gpu.cudaCores.toLocaleString()],
                                        ['Tensor Cores', gpu.tensorCores.toString()],
                                        ['TDP', `${gpu.tdp}W`],
                                        ['Region', gpu.region],
                                    ].map(([label, val]) => (
                                        <div key={label}>
                                            <span className="text-muted-foreground/60">{label}</span>
                                            <p className="text-secondary-foreground font-medium">{val}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-surface-0/50">
                                <span className="text-lg font-semibold text-heading tabular-nums">
                                    ${gpu.pricePerHour}<span className="text-xs font-normal text-muted-foreground">/hr</span>
                                </span>
                                <Button
                                    variant={gpu.availability === 'sold_out' ? 'ghost' : 'secondary'}
                                    size="sm"
                                    disabled={gpu.availability === 'sold_out'}
                                >
                                    {gpu.availability === 'sold_out' ? 'Unavailable' : 'Deploy'}
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
