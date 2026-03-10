'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutTemplate, Cpu, Search, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { seedTemplates } from '@/data/seed';
import { Card, PageHeader, Input, FilterChips, Button } from '@/components/ui';

const iconMap: Record<string, string> = { '🦙': '🦙', '🎨': '🎨', '🗣️': '🗣️', '💬': '💬', '📝': '📝', '🔍': '🔍' };

export default function TemplatesPage() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');

    const filtered = seedTemplates.filter(t => {
        if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
        if (category !== 'all' && t.category !== category) return false;
        return true;
    });

    const categoryOptions = [
        { value: 'all', label: 'All' },
        { value: 'inference', label: 'Inference' },
        { value: 'training', label: 'Training' },
        { value: 'generation', label: 'Generation' },
    ];

    return (
        <div className="space-y-5">
            <PageHeader title="Templates" description="Deploy pre-built ML workload configurations" />

            <div className="flex flex-col sm:flex-row gap-3">
                <Input icon={<Search />} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search templates…" className="flex-1" />
                <FilterChips options={categoryOptions} value={category} onChange={setCategory} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((tmpl, i) => (
                    <motion.div key={tmpl.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04, duration: 0.25 }}>
                        <Card padding="none" className="group hover:border-border-strong transition-all duration-200">
                            <div className="p-4">
                                <div className="text-2xl mb-3">{tmpl.icon}</div>
                                <h3 className="text-[14px] font-semibold text-heading mb-1">{tmpl.name}</h3>
                                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{tmpl.description}</p>
                                <div className="flex items-center gap-2">
                                    <Cpu className="w-3 h-3 text-muted-foreground/50" />
                                    <span className="text-[11px] text-muted-foreground">{tmpl.gpuRecommendation}</span>
                                </div>
                            </div>
                            <div className="border-t border-border px-4 py-2.5 flex items-center justify-between">
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{tmpl.category}</span>
                                <Button variant="ghost" size="sm" iconRight={<ArrowRight />} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    Use Template
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
