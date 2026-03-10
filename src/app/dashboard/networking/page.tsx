'use client';

import { Globe, Plus, MoreHorizontal, Shield } from 'lucide-react';
import { PageHeader, Button, DataTable, StatusBadge, type Column } from '@/components/ui';

const rules = [
    { id: '1', name: 'Allow SSH', protocol: 'TCP', portRange: '22', source: '0.0.0.0/0', direction: 'inbound' as const, status: 'active' as const },
    { id: '2', name: 'Allow HTTPS', protocol: 'TCP', portRange: '443', source: '0.0.0.0/0', direction: 'inbound' as const, status: 'active' as const },
    { id: '3', name: 'Allow Jupyter', protocol: 'TCP', portRange: '8888', source: '10.0.0.0/8', direction: 'inbound' as const, status: 'active' as const },
    { id: '4', name: 'API Access', protocol: 'TCP', portRange: '8080-8090', source: '0.0.0.0/0', direction: 'inbound' as const, status: 'active' as const },
    { id: '5', name: 'Block Telemetry', protocol: 'ALL', portRange: '*', source: '192.168.0.0/16', direction: 'outbound' as const, status: 'active' as const },
];

type RuleRow = typeof rules[number];

export default function NetworkingPage() {
    const columns: Column<RuleRow>[] = [
        {
            key: 'name', header: 'Rule',
            render: (r) => (
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-surface-2 flex items-center justify-center">
                        <Shield className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <span className="text-[13px] font-medium text-heading">{r.name}</span>
                </div>
            ),
        },
        { key: 'protocol', header: 'Protocol', render: (r) => <span className="text-[13px] text-secondary-foreground font-mono">{r.protocol}</span> },
        { key: 'portRange', header: 'Port Range', render: (r) => <span className="text-[13px] text-muted-foreground font-mono tabular-nums">{r.portRange}</span> },
        { key: 'source', header: 'Source', hideBelow: 'md', render: (r) => <span className="text-[13px] text-muted-foreground font-mono">{r.source}</span> },
        {
            key: 'direction', header: 'Direction', hideBelow: 'md',
            render: (r) => <span className="text-[11px] font-medium text-secondary-foreground capitalize bg-surface-2 px-2 py-0.5 rounded">{r.direction}</span>,
        },
        { key: 'actions', header: '', className: 'text-right w-12', render: () => <button className="p-1.5 rounded-md hover:bg-surface-2 text-muted-foreground"><MoreHorizontal className="w-4 h-4" /></button> },
    ];

    return (
        <div className="space-y-5">
            <PageHeader title="Networking" description="Manage firewall rules and network policies" action={<Button icon={<Plus />}>Add Rule</Button>} />
            <DataTable columns={columns} data={rules} keyExtractor={r => r.id} />
        </div>
    );
}
