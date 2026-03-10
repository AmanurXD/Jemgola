'use client';

import { Box, Copy, MoreHorizontal } from 'lucide-react';
import { formatBytes, formatRelativeTime } from '@/lib/utils';
import { seedContainers } from '@/data/seed';
import { Card, CardHeader, CardTitle, PageHeader, Button, DataTable, type Column } from '@/components/ui';

type ContainerRow = typeof seedContainers[number];

export default function ContainersPage() {
    const columns: Column<ContainerRow>[] = [
        {
            key: 'name', header: 'Image',
            render: (img) => (
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-surface-2 flex items-center justify-center">
                        <Box className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <span className="text-[13px] font-medium text-heading font-mono">{img.name}</span>
                </div>
            ),
        },
        { key: 'tag', header: 'Tag', render: (img) => <span className="text-[13px] text-primary font-mono">{img.tag}</span> },
        { key: 'size', header: 'Size', hideBelow: 'md', render: (img) => <span className="text-[13px] text-muted-foreground tabular-nums">{formatBytes(img.sizeBytes)}</span> },
        { key: 'layers', header: 'Layers', hideBelow: 'lg', render: (img) => <span className="text-[13px] text-muted-foreground tabular-nums">{img.layers}</span> },
        { key: 'pulls', header: 'Pulls', hideBelow: 'lg', render: (img) => <span className="text-[13px] text-muted-foreground tabular-nums">{img.pulls.toLocaleString()}</span> },
        { key: 'created', header: 'Created', hideBelow: 'md', render: (img) => <span className="text-[13px] text-muted-foreground">{formatRelativeTime(img.createdAt)}</span> },
        { key: 'actions', header: '', className: 'text-right w-12', render: () => <button className="p-1.5 rounded-md hover:bg-surface-2 text-muted-foreground"><MoreHorizontal className="w-4 h-4" /></button> },
    ];

    return (
        <div className="space-y-5">
            <PageHeader title="Containers" description="Manage your container image registry" action={<Button icon={<Box />}>Push Image</Button>} />

            <Card padding="sm" className="bg-surface-0 font-mono text-xs flex items-center gap-3">
                <span className="text-muted-foreground select-none">$</span>
                <span className="text-secondary-foreground flex-1">docker push registry.jemgola.run/your-image:latest</span>
                <button className="text-muted-foreground hover:text-foreground transition-colors"><Copy className="w-3.5 h-3.5" /></button>
            </Card>

            <DataTable columns={columns} data={seedContainers} keyExtractor={c => c.id} />
        </div>
    );
}
