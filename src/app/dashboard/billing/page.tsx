'use client';

import { CreditCard, Check, Download, MoreHorizontal } from 'lucide-react';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { seedPlans, seedInvoices, seedPaymentMethods } from '@/data/seed';
import { Card, CardHeader, CardTitle, PageHeader, Badge, Button, StatusBadge, DataTable, type Column } from '@/components/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const tooltipStyle = {
    background: 'var(--color-surface-2)',
    border: '1px solid var(--color-border-strong)',
    borderRadius: '8px',
    fontSize: 12,
    boxShadow: 'var(--shadow-md)',
};

const spendData = [
    { month: 'Sep', amount: 520 }, { month: 'Oct', amount: 680 },
    { month: 'Nov', amount: 750 }, { month: 'Dec', amount: 890 },
    { month: 'Jan', amount: 820 }, { month: 'Feb', amount: 960 },
];

const currentPlan = seedPlans[1]; // Pro

type InvoiceRow = typeof seedInvoices[number];

export default function BillingPage() {
    const invoiceColumns: Column<InvoiceRow>[] = [
        { key: 'id', header: 'Invoice', render: (inv) => <span className="text-[13px] font-medium text-heading font-mono">{inv.id.slice(0, 8)}</span> },
        { key: 'period', header: 'Date', hideBelow: 'md', render: (inv) => <span className="text-[13px] text-muted-foreground">{formatDate(inv.date)}</span> },
        { key: 'amount', header: 'Amount', render: (inv) => <span className="text-[13px] font-medium text-heading tabular-nums">{formatCurrency(inv.amount)}</span> },
        { key: 'status', header: 'Status', render: (inv) => <StatusBadge status={inv.status} /> },
        { key: 'actions', header: '', className: 'text-right w-12', render: () => <button className="p-1.5 rounded-md hover:bg-surface-2 text-muted-foreground"><Download className="w-3.5 h-3.5" /></button> },
    ];

    return (
        <div className="space-y-5">
            <PageHeader title="Billing" description="Manage your plan, payment methods, and invoices" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Current Plan */}
                <Card padding="md" variant="accent">
                    <CardHeader><CardTitle>Current Plan</CardTitle></CardHeader>
                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-semibold text-heading">{currentPlan.name}</span>
                        <Badge variant="info">${currentPlan.pricePerMonth}/mo</Badge>
                    </div>
                    <ul className="space-y-2 mb-5">
                        {currentPlan.features.slice(0, 4).map(f => (
                            <li key={f} className="flex items-start gap-2 text-xs text-secondary-foreground">
                                <Check className="w-3.5 h-3.5 text-success shrink-0 mt-0.5" />{f}
                            </li>
                        ))}
                    </ul>
                    <Button variant="secondary" size="sm" className="w-full">Change Plan</Button>
                </Card>

                {/* Monthly Spend */}
                <Card padding="md" className="lg:col-span-2">
                    <CardHeader><CardTitle>Monthly Spend</CardTitle></CardHeader>
                    <div className="h-44">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={spendData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--color-muted-foreground)" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `$${v}`} />
                                <Tooltip contentStyle={tooltipStyle} formatter={(v) => formatCurrency(v as number)} />
                                <Bar dataKey="amount" fill="var(--color-primary)" radius={[3, 3, 0, 0]} name="Spend" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Payment Methods */}
            <Card padding="md">
                <CardHeader action={<Button variant="secondary" size="sm" icon={<CreditCard />}>Add Card</Button>}>
                    <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <div className="space-y-2">
                    {seedPaymentMethods.map(pm => (
                        <div key={pm.id} className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-surface-0 border border-border-subtle">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-5 bg-surface-2 rounded flex items-center justify-center text-[9px] font-bold text-muted-foreground uppercase">{pm.brand}</div>
                                <span className="text-[13px] text-heading font-mono">•••• {pm.last4}</span>
                                <span className="text-xs text-muted-foreground">Exp {pm.expMonth}/{pm.expYear}</span>
                            </div>
                            {pm.isDefault && <Badge variant="success">Default</Badge>}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Invoices */}
            <div>
                <h2 className="text-sm font-semibold text-heading mb-3">Invoices</h2>
                <DataTable columns={invoiceColumns} data={seedInvoices} keyExtractor={inv => inv.id} />
            </div>
        </div>
    );
}
