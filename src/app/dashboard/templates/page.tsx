'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutTemplate, Search, Brain, Zap, Globe, Code, MessageSquare, Image } from 'lucide-react';
import { cn } from '@/lib/utils';
import { seedTemplates } from '@/data/seed';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { Brain, Zap, Globe, Code, MessageSquare, Image };
const categories = [{ value: 'all', label: 'All' }, { value: 'ml_training', label: 'ML Training' }, { value: 'inference', label: 'Inference' }, { value: 'development', label: 'Development' }, { value: 'web_scraping', label: 'Web Scraping' }];

export default function TemplatesPage() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');

    const filtered = seedTemplates.filter(t => {
        if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
        if (category !== 'all' && t.category !== category) return false;
        return true;
    });

    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold">Templates</h1><p className="text-sm text-zinc-400">Pre-built configurations for common ML workloads</p></div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search templates..."
                        className="w-full bg-card border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 transition-all" />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {categories.map(c => (
                        <button key={c.value} onClick={() => setCategory(c.value)}
                            className={cn("px-3 py-2 rounded-lg text-xs font-medium transition-all", category === c.value ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'bg-card border border-white/5 text-zinc-400 hover:text-white')}
                        >{c.label}</button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((tpl, i) => {
                    const Icon = iconMap[tpl.icon] || LayoutTemplate;
                    return (
                        <motion.div key={tpl.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                            className="bg-card border border-white/5 rounded-xl p-5 hover:border-purple-500/20 transition-all group"
                        >
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                                <Icon className="w-5 h-5 text-purple-400" />
                            </div>
                            <h3 className="font-semibold mb-1">{tpl.name}</h3>
                            <p className="text-xs text-zinc-400 leading-relaxed mb-4">{tpl.description}</p>
                            <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                <span className="text-xs text-zinc-500">{tpl.gpuRecommendation}</span>
                                <button className="text-xs bg-purple-500/10 text-purple-400 px-3 py-1.5 rounded-lg hover:bg-purple-500/20 transition-colors">Use Template</button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
