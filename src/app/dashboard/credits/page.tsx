'use client';

import { Coins, Zap, ArrowDownRight, ArrowUpRight, Plus } from 'lucide-react';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { seedCreditBalance, seedTransactions } from '@/data/seed';
import { Card, CardHeader, CardTitle, PageHeader, Button, Badge, StatCard, DataTable, type Column } from '@/components/ui';

type TxRow = typeof seedTransactions[number];

export default function CreditsPage() {
    const txColumns: Column<TxRow>[] = [
        {
            key: 'type', header: 'Type',
            render: (tx) => {
                const isCredit = tx.amount > 0;
                return (
                    <div className="flex items-center gap-2.5">
                        <div className={cn('w-7 h-7 rounded-md flex items-center justify-center', isCredit ? 'bg-success/8' : 'bg-surface-2')}>
                            {isCredit ? <ArrowDownRight className="w-3.5 h-3.5 text-success" /> : <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />}
                        </div>
                        <span className="text-[13px] font-medium text-heading capitalize">{tx.type.replace(/_/g, ' ')}</span>
                    </div>
                );
            },
        },
        { key: 'desc', header: 'Description', render: (tx) => <span className="text-[13px] text-secondary-foreground">{tx.description}</span> },
        { key: 'amount', header: 'Amount', render: (tx) => <span className={cn("text-[13px] font-medium tabular-nums", tx.amount > 0 ? 'text-success' : 'text-heading')}>{tx.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(tx.amount))}</span> },
        { key: 'date', header: 'Date', hideBelow: 'md', render: (tx) => <span className="text-[13px] text-muted-foreground">{formatDate(tx.createdAt)}</span> },
        { key: 'balance', header: 'Balance', hideBelow: 'lg', render: (tx) => <span className="text-[13px] text-muted-foreground tabular-nums">{formatCurrency(tx.balanceAfter)}</span> },
    ];

    return (
        <div className="space-y-5">
            <PageHeader title="Credits" description="Manage your credit balance and purchase history" action={<Button icon={<Plus />}>Add Credits</Button>} />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard label="Balance" value={formatCurrency(seedCreditBalance)} icon={<Coins />} />
                <StatCard label="Used This Month" value="$178.00" change="+27% vs last month" trend="up" icon={<Zap />} />
                <StatCard label="Auto-recharge" value="Enabled" change="Recharges at $10.00" icon={<ArrowDownRight />} />
            </div>

            <Card padding="md">
                <CardHeader><CardTitle>Auto-Recharge Configuration</CardTitle></CardHeader>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">Threshold</label>
                        <div className="flex items-center gap-2">
                            <input type="number" defaultValue={10} className="w-full bg-surface-0 border border-border-strong rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/40 transition-all" />
                            <Badge variant="outline">USD</Badge>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">Recharge Amount</label>
                        <input type="number" defaultValue={100} className="w-full bg-surface-0 border border-border-strong rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/40 transition-all" />
                    </div>
                    <div className="flex items-end">
                        <Button variant="secondary" size="md" className="w-full">Save</Button>
                    </div>
                </div>
            </Card>

            <div>
                <h2 className="text-sm font-semibold text-heading mb-3">Transaction History</h2>
                <DataTable columns={txColumns} data={seedTransactions} keyExtractor={tx => tx.id} />
            </div>
        </div>
    );
}
