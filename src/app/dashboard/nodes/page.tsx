'use client';

import { motion } from 'framer-motion';
import { HardDrive, Plus, MoreHorizontal } from 'lucide-react';
import { cn, formatDuration } from '@/lib/utils';
import { PageHeader, Button, DataTable, type Column } from '@/components/ui';

const nodes = [
    { id: 'node-1', status: 'healthy' as const, gpu: 'NVIDIA H100 SXM', region: 'US East', cpu: 42, memory: 58, gpuUtil: 78, uptimeSeconds: 864000, pods: 3 },
    { id: 'node-2', status: 'healthy' as const, gpu: 'NVIDIA A100 80GB', region: 'US West', cpu: 35, memory: 45, gpuUtil: 65, uptimeSeconds: 432000, pods: 2 },
    { id: 'node-3', status: 'degraded' as const, gpu: 'NVIDIA RTX 4090', region: 'EU West', cpu: 88, memory: 92, gpuUtil: 95, uptimeSeconds: 172800, pods: 4 },
    { id: 'node-4', status: 'offline' as const, gpu: 'NVIDIA L40S', region: 'EU Central', cpu: 0, memory: 0, gpuUtil: 0, uptimeSeconds: 0, pods: 0 },
    { id: 'node-5', status: 'healthy' as const, gpu: 'NVIDIA RTX 4090', region: 'US East', cpu: 55, memory: 62, gpuUtil: 71, uptimeSeconds: 604800, pods: 2 },
];

type NodeRow = typeof nodes[number];

const statusDot: Record<string, string> = { healthy: 'bg-success', degraded: 'bg-warning', offline: 'bg-destructive', provisioning: 'bg-info', draining: 'bg-warning' };

function UtilBar({ value }: { value: number }) {
    const color = value > 85 ? 'bg-destructive' : value > 65 ? 'bg-warning' : 'bg-primary';
    return (
        <div className="w-20">
            <div className="w-full h-1 bg-surface-3 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.7 }} className={cn('h-full rounded-full', color)} />
            </div>
            <span className="text-[10px] text-muted-foreground mt-0.5 block tabular-nums">{value}%</span>
        </div>
    );
}

export default function NodesPage() {
    const columns: Column<NodeRow>[] = [
        {
            key: 'node', header: 'Node',
            render: (n) => (
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-surface-2 flex items-center justify-center">
                        <HardDrive className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <div>
                        <p className="text-[13px] font-medium text-heading">{n.id}</p>
                        <p className="text-xs text-muted-foreground">{n.region} · {n.pods} pods</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'status', header: 'Status',
            render: (n) => (
                <span className={cn('inline-flex items-center gap-1.5 text-[11px] text-secondary-foreground capitalize')}>
                    <span className={cn('w-1.5 h-1.5 rounded-full', statusDot[n.status] || 'bg-muted-foreground')} />
                    {n.status}
                </span>
            ),
        },
        { key: 'gpu', header: 'GPU', hideBelow: 'md', render: (n) => <span className="text-[13px] text-secondary-foreground">{n.gpu}</span> },
        { key: 'cpu', header: 'CPU', hideBelow: 'lg', render: (n) => <UtilBar value={n.cpu} /> },
        { key: 'memory', header: 'Memory', hideBelow: 'lg', render: (n) => <UtilBar value={n.memory} /> },
        { key: 'gpuUtil', header: 'GPU Util', hideBelow: 'lg', render: (n) => <UtilBar value={n.gpuUtil} /> },
        { key: 'uptime', header: 'Uptime', hideBelow: 'md', render: (n) => <span className="text-[13px] text-muted-foreground tabular-nums">{n.uptimeSeconds > 0 ? formatDuration(n.uptimeSeconds) : '—'}</span> },
        { key: 'actions', header: '', className: 'text-right w-12', render: () => <button className="p-1.5 rounded-md hover:bg-surface-2 text-muted-foreground"><MoreHorizontal className="w-4 h-4" /></button> },
    ];

    return (
        <div className="space-y-5">
            <PageHeader title="Nodes" description="Manage GPU compute nodes" action={<Button icon={<Plus />}>Add Node</Button>} />
            <DataTable columns={columns} data={nodes} keyExtractor={n => n.id} />
        </div>
    );
}
