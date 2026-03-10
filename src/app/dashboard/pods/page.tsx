'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Search, Plus, Play, Square, RotateCw, Trash2, MoreHorizontal, ExternalLink } from 'lucide-react';
import { cn, formatCurrency, formatDuration } from '@/lib/utils';
import { seedPods } from '@/data/seed';
import type { PodStatus } from '@/domain/models';
import { Button, Input, StatusBadge, PageHeader, EmptyState, FilterChips, DataTable, Dropdown, DropdownItem, type Column } from '@/components/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type PodRow = typeof seedPods[number];

export default function PodsPage() {
    const router = useRouter();
    const [pods, setPods] = useState(seedPods.filter(p => p.status !== 'deleted'));
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [actionMenu, setActionMenu] = useState<string | null>(null);

    const filtered = pods.filter(p => {
        if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
        if (statusFilter !== 'all' && p.status !== statusFilter) return false;
        return true;
    });

    const handleAction = (podId: string, action: string) => {
        setActionMenu(null);
        const transitions: Record<string, PodStatus> = { start: 'starting', stop: 'stopping', restart: 'restarting', delete: 'deleting' };
        const finalStates: Record<string, PodStatus> = { start: 'running', stop: 'stopped', restart: 'running' };

        setPods(pods.map(p => p.id === podId ? { ...p, status: transitions[action] || p.status } : p));

        if (action === 'delete') {
            setTimeout(() => setPods(prev => prev.filter(p => p.id !== podId)), 1500);
        } else if (finalStates[action]) {
            setTimeout(() => setPods(prev => prev.map(p => p.id === podId ? { ...p, status: finalStates[action] } : p)), 2000);
        }
    };

    const columns: Column<PodRow>[] = [
        {
            key: 'name', header: 'Name',
            render: (pod) => (
                <Link href={`/dashboard/pods/${pod.id}`} className="flex items-center gap-3 group">
                    <div className="w-7 h-7 rounded-md bg-surface-2 flex items-center justify-center group-hover:bg-surface-3 transition-colors">
                        <Server className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[13px] font-medium text-heading group-hover:text-primary transition-colors">{pod.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{pod.config.containerImage}</p>
                    </div>
                </Link>
            ),
        },
        {
            key: 'status', header: 'Status',
            render: (pod) => <StatusBadge status={pod.status} />,
        },
        {
            key: 'gpu', header: 'GPU', hideBelow: 'lg',
            render: (pod) => <span className="text-[13px] text-secondary-foreground">{pod.gpuName}</span>,
        },
        {
            key: 'region', header: 'Region', hideBelow: 'md',
            render: (pod) => <span className="text-[13px] text-muted-foreground">{pod.region}</span>,
        },
        {
            key: 'uptime', header: 'Uptime', hideBelow: 'lg',
            render: (pod) => <span className="text-[13px] text-muted-foreground tabular-nums">{pod.uptimeSeconds > 0 ? formatDuration(pod.uptimeSeconds) : '—'}</span>,
        },
        {
            key: 'cost', header: 'Cost',
            render: (pod) => <span className="text-[13px] font-medium text-heading tabular-nums">{pod.costAccrued > 0 ? formatCurrency(pod.costAccrued) : '—'}</span>,
        },
        {
            key: 'actions', header: '', className: 'text-right w-12',
            render: (pod) => (
                <div className="relative inline-block">
                    <button
                        onClick={(e) => { e.stopPropagation(); setActionMenu(actionMenu === pod.id ? null : pod.id); }}
                        className="p-1.5 rounded-md hover:bg-surface-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                    <Dropdown open={actionMenu === pod.id} onClose={() => setActionMenu(null)}>
                        {pod.status === 'stopped' && (
                            <DropdownItem onClick={() => handleAction(pod.id, 'start')}><Play className="w-3.5 h-3.5" /> Start</DropdownItem>
                        )}
                        {pod.status === 'running' && (
                            <>
                                <DropdownItem onClick={() => handleAction(pod.id, 'stop')}><Square className="w-3.5 h-3.5" /> Stop</DropdownItem>
                                <DropdownItem onClick={() => handleAction(pod.id, 'restart')}><RotateCw className="w-3.5 h-3.5" /> Restart</DropdownItem>
                            </>
                        )}
                        <DropdownItem onClick={() => router.push(`/dashboard/pods/${pod.id}`)}><ExternalLink className="w-3.5 h-3.5" /> View Details</DropdownItem>
                        <div className="border-t border-border my-0.5" />
                        <DropdownItem destructive onClick={() => handleAction(pod.id, 'delete')}><Trash2 className="w-3.5 h-3.5" /> Delete</DropdownItem>
                    </Dropdown>
                </div>
            ),
        },
    ];

    const filterOptions = [
        { value: 'all', label: 'All' },
        { value: 'running', label: 'Running' },
        { value: 'stopped', label: 'Stopped' },
        { value: 'failed', label: 'Failed' },
        { value: 'creating', label: 'Creating' },
    ];

    return (
        <div className="space-y-5">
            <PageHeader
                title="Pods"
                description="Manage your GPU pod instances"
                action={<Button icon={<Plus />}>Create Pod</Button>}
            />

            <div className="flex flex-col sm:flex-row gap-3">
                <Input
                    icon={<Search />}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search pods…"
                    className="flex-1"
                />
                <FilterChips options={filterOptions} value={statusFilter} onChange={setStatusFilter} />
            </div>

            {filtered.length === 0 ? (
                <EmptyState
                    icon={<Server />}
                    title="No pods found"
                    description="Deploy your first GPU pod to get started."
                    action={<Button icon={<Plus />} size="sm">Create Pod</Button>}
                />
            ) : (
                <DataTable
                    columns={columns}
                    data={filtered}
                    keyExtractor={p => p.id}
                />
            )}
        </div>
    );
}
