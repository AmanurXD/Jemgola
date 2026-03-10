'use client';

import { Database, Plus, MoreHorizontal, Link2 } from 'lucide-react';
import { formatBytes, formatDate } from '@/lib/utils';
import { seedVolumes } from '@/data/seed';
import { PageHeader, Button, StatusBadge, DataTable, type Column } from '@/components/ui';

type VolumeRow = typeof seedVolumes[number];

export default function StoragePage() {
    const columns: Column<VolumeRow>[] = [
        {
            key: 'name', header: 'Volume',
            render: (vol) => (
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-surface-2 flex items-center justify-center">
                        <Database className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <div>
                        <p className="text-[13px] font-medium text-heading">{vol.name}</p>
                        <p className="text-xs text-muted-foreground">{vol.filesystemType}</p>
                    </div>
                </div>
            ),
        },
        { key: 'status', header: 'Status', render: (vol) => <StatusBadge status={vol.status} /> },
        { key: 'size', header: 'Size', hideBelow: 'md', render: (vol) => <span className="text-[13px] text-secondary-foreground">{vol.sizeGb} GB</span> },
        {
            key: 'used', header: 'Used', hideBelow: 'lg',
            render: (vol) => (
                <div className="w-20">
                    <div className="w-full h-1 bg-surface-3 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${(vol.usedGb / vol.sizeGb) * 100}%` }} />
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-0.5 block tabular-nums">{vol.usedGb}/{vol.sizeGb} GB</span>
                </div>
            ),
        },
        {
            key: 'attached', header: 'Attached To', hideBelow: 'md',
            render: (vol) => vol.attachedPodName
                ? <span className="inline-flex items-center gap-1 text-primary text-xs font-medium"><Link2 className="w-3 h-3" />{vol.attachedPodName}</span>
                : <span className="text-muted-foreground/50 text-xs">Not attached</span>,
        },
        { key: 'region', header: 'Region', hideBelow: 'lg', render: (vol) => <span className="text-[13px] text-muted-foreground">{vol.region}</span> },
        { key: 'actions', header: '', className: 'text-right w-12', render: () => <button className="p-1.5 rounded-md hover:bg-surface-2 text-muted-foreground"><MoreHorizontal className="w-4 h-4" /></button> },
    ];

    return (
        <div className="space-y-5">
            <PageHeader title="Storage" description="Manage persistent network volumes" action={<Button icon={<Plus />}>Create Volume</Button>} />
            <DataTable columns={columns} data={seedVolumes} keyExtractor={vol => vol.id} />
        </div>
    );
}
