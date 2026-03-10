'use client';

import { motion } from 'framer-motion';
import { Brain, Plus, MoreHorizontal } from 'lucide-react';
import { cn, formatCurrency, formatDuration } from '@/lib/utils';
import { seedJobs } from '@/data/seed';
import { PageHeader, Button, StatusBadge, DataTable, type Column } from '@/components/ui';

type JobRow = typeof seedJobs[number];

export default function FinetuningPage() {
    const columns: Column<JobRow>[] = [
        {
            key: 'name', header: 'Job',
            render: (job) => (
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-surface-2 flex items-center justify-center">
                        <Brain className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <div>
                        <p className="text-[13px] font-medium text-heading">{job.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{job.baseModel}</p>
                    </div>
                </div>
            ),
        },
        { key: 'status', header: 'Status', render: (job) => <StatusBadge status={job.status} /> },
        {
            key: 'progress', header: 'Progress', hideBelow: 'md',
            render: (job) => (
                <div className="w-24">
                    <div className="w-full h-1 bg-surface-3 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(job.currentEpoch / job.totalEpochs) * 100}%` }}
                            transition={{ duration: 0.7 }}
                            className="h-full rounded-full bg-primary"
                        />
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-0.5 block tabular-nums">{job.currentEpoch}/{job.totalEpochs} epochs</span>
                </div>
            ),
        },
        { key: 'gpu', header: 'GPU', hideBelow: 'lg', render: (job) => <span className="text-[13px] text-secondary-foreground">{job.gpuType}</span> },
        { key: 'duration', header: 'Duration', hideBelow: 'lg', render: (job) => <span className="text-[13px] text-muted-foreground tabular-nums">{job.durationSeconds > 0 ? formatDuration(job.durationSeconds) : '—'}</span> },
        { key: 'cost', header: 'Cost', render: (job) => <span className="text-[13px] font-medium text-heading tabular-nums">{formatCurrency(job.costAccrued)}</span> },
        { key: 'actions', header: '', className: 'text-right w-12', render: () => <button className="p-1.5 rounded-md hover:bg-surface-2 text-muted-foreground"><MoreHorizontal className="w-4 h-4" /></button> },
    ];

    return (
        <div className="space-y-5">
            <PageHeader title="Finetuning" description="Train and fine‑tune models on managed infrastructure" action={<Button icon={<Plus />}>New Job</Button>} />
            <DataTable columns={columns} data={seedJobs} keyExtractor={j => j.id} />
        </div>
    );
}
