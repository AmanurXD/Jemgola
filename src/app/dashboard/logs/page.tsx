'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Filter, ChevronDown } from 'lucide-react';
import { cn, formatDateTime } from '@/lib/utils';
import { seedLogs } from '@/data/seed';
import type { LogSeverity } from '@/domain/models';

const severityConfig: Record<LogSeverity, { color: string; bg: string }> = {
    debug: { color: 'text-zinc-400', bg: 'bg-zinc-500/10' },
    info: { color: 'text-blue-400', bg: 'bg-blue-500/10' },
    warning: { color: 'text-amber-400', bg: 'bg-amber-500/10' },
    error: { color: 'text-red-400', bg: 'bg-red-500/10' },
};

export default function LogsPage() {
    const [search, setSearch] = useState('');
    const [severity, setSeverity] = useState<string>('all');

    const filtered = seedLogs.filter(l => {
        if (search && !l.message.toLowerCase().includes(search.toLowerCase())) return false;
        if (severity !== 'all' && l.severity !== severity) return false;
        return true;
    });

    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold">Logs</h1><p className="text-sm text-zinc-400">View logs across all resources</p></div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search logs..."
                        className="w-full bg-card border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 transition-all font-mono" />
                </div>
                <div className="flex gap-2">
                    {['all', 'info', 'warning', 'error', 'debug'].map(s => (
                        <button key={s} onClick={() => setSeverity(s)}
                            className={cn("px-3 py-2 rounded-lg text-xs font-medium transition-all capitalize", severity === s ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'bg-card border border-white/5 text-zinc-400 hover:text-white')}
                        >{s}</button>
                    ))}
                </div>
            </div>

            <div className="bg-zinc-950 border border-white/5 rounded-xl overflow-hidden font-mono text-sm">
                {filtered.map((log, i) => {
                    const sc = severityConfig[log.severity];
                    return (
                        <motion.div key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                            className="flex items-start gap-3 px-4 py-2.5 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                        >
                            <span className="text-xs text-zinc-600 shrink-0 w-32">{formatDateTime(log.timestamp).split(',').pop()?.trim()}</span>
                            <span className={cn("text-[10px] uppercase font-bold px-1.5 py-0.5 rounded shrink-0 w-14 text-center", sc.bg, sc.color)}>{log.severity}</span>
                            <span className="text-xs text-purple-400 shrink-0 w-32 truncate">[{log.source}]</span>
                            <span className="text-xs text-zinc-300 break-all">{log.message}</span>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
