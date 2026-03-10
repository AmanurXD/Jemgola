'use client';

import { motion } from 'framer-motion';
import { Zap, Plus, MoreHorizontal } from 'lucide-react';
import { seedEndpoints } from '@/data/seed';
import { PageHeader, Button, StatusBadge, DataTable, type Column } from '@/components/ui';

type EndpointRow = typeof seedEndpoints[number];

export default function ServerlessPage() {
    const columns: Column<EndpointRow>[] = [
        {
            key: 'name', header: 'Name',
            render: (ep) => (
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-surface-2 flex items-center justify-center">
                        <Zap className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[13px] font-medium text-heading">{ep.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{ep.containerImage}</p>
                    </div>
                </div>
            ),
        },
        { key: 'status', header: 'Status', render: (ep) => <StatusBadge status={ep.status} /> },
        { key: 'gpu', header: 'GPU', hideBelow: 'md', render: (ep) => <span className="text-[13px] text-secondary-foreground">{ep.gpuType}</span> },
        { key: 'rpm', header: 'Req/min', hideBelow: 'lg', render: (ep) => <span className="text-[13px] text-muted-foreground tabular-nums">{ep.requestsPerMin.toLocaleString()}</span> },
        { key: 'latency', header: 'Avg Latency', hideBelow: 'lg', render: (ep) => <span className="text-[13px] text-muted-foreground tabular-nums">{ep.avgLatencyMs}ms</span> },
        { key: 'workers', header: 'Workers', hideBelow: 'md', render: (ep) => <span className="text-[13px] text-muted-foreground tabular-nums">{ep.activeWorkers}/{ep.maxWorkers}</span> },
        {
            key: 'actions', header: '', className: 'text-right w-12',
            render: () => <button className="p-1.5 rounded-md hover:bg-surface-2 text-muted-foreground"><MoreHorizontal className="w-4 h-4" /></button>,
        },
    ];

    return (
        <div className="space-y-5">
            <PageHeader title="Serverless" description="Deploy and manage auto-scaling inference endpoints" action={<Button icon={<Plus />}>Deploy Endpoint</Button>} />
            <DataTable columns={columns} data={seedEndpoints} keyExtractor={ep => ep.id} />
        </div>
    );
}
