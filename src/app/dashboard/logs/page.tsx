'use client';

import { useState } from 'react';
import { FileText, Search } from 'lucide-react';
import { cn, formatDateTime } from '@/lib/utils';
import { seedLogs } from '@/data/seed';
import { PageHeader, Input, FilterChips, Card } from '@/components/ui';

const severityConfig: Record<string, { color: string }> = {
    info: { color: 'bg-info/8 text-info border-info/20' },
    warning: { color: 'bg-warning/8 text-warning border-warning/20' },
    error: { color: 'bg-destructive/8 text-destructive border-destructive/20' },
    debug: { color: 'bg-surface-2 text-muted-foreground border-border' },
};

export default function LogsPage() {
    const [search, setSearch] = useState('');
    const [severity, setSeverity] = useState('all');

    const filtered = seedLogs.filter(l => {
        if (search && !l.message.toLowerCase().includes(search.toLowerCase())) return false;
        if (severity !== 'all' && l.severity !== severity) return false;
        return true;
    });

    const severityOptions = [
        { value: 'all', label: 'All' },
        { value: 'error', label: 'Error' },
        { value: 'warning', label: 'Warning' },
        { value: 'info', label: 'Info' },
        { value: 'debug', label: 'Debug' },
    ];

    return (
        <div className="space-y-5">
            <PageHeader title="Logs" description="View system and application log streams" />

            <div className="flex flex-col sm:flex-row gap-3">
                <Input icon={<Search />} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search logs…" className="flex-1" />
                <FilterChips options={severityOptions} value={severity} onChange={setSeverity} />
            </div>

            <div className="bg-surface-0 border border-border rounded-xl overflow-hidden font-mono text-xs">
                {filtered.length === 0 ? (
                    <div className="py-12 text-center text-muted-foreground">No matching logs</div>
                ) : (
                    filtered.map(log => (
                        <div key={log.id} className="flex items-start gap-3 px-4 py-2.5 border-b border-border-subtle last:border-0 hover:bg-surface-1/50 transition-colors">
                            <span className="text-muted-foreground/50 shrink-0 w-16 tabular-nums">{formatDateTime(log.timestamp).split(',').pop()?.trim()}</span>
                            <span className={cn("text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded border shrink-0 w-14 text-center", severityConfig[log.severity]?.color || severityConfig.debug.color)}>
                                {log.severity}
                            </span>
                            <span className="text-primary/60 shrink-0 text-[11px]">{log.source}</span>
                            <span className="text-secondary-foreground">{log.message}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
