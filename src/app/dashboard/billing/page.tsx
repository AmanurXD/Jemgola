'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ExternalLink, Plus, Check, ArrowUpRight, Sparkles, MoreHorizontal } from 'lucide-react';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { seedPlans, seedPaymentMethods, seedInvoices, seedUsageBreakdown, seedMonthlySpend } from '@/data/seed';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

export default function BillingPage() {
    const currentPlan = seedPlans[1]; // Pro

    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold">Billing</h1><p className="text-sm text-zinc-400">Manage your plan, payment methods, and invoices</p></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Current Plan */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-purple-500/20 rounded-xl p-6"
                >
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-zinc-500">Current Plan</span>
                        <span className="text-xs bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full">Active</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{currentPlan.name}</h3>
                    <p className="text-zinc-400 text-sm mb-4">{formatCurrency(currentPlan.pricePerMonth)}/month</p>
                    <ul className="space-y-2 mb-6">
                        {currentPlan.features.slice(0, 4).map(f => (
                            <li key={f} className="flex items-center gap-2 text-xs text-zinc-400"><Check className="w-3 h-3 text-purple-400" />{f}</li>
                        ))}
                    </ul>
                    <button className="w-full bg-white/5 hover:bg-white/10 py-2 rounded-lg text-sm text-zinc-300 transition-colors flex items-center justify-center gap-1.5">
                        <ArrowUpRight className="w-3.5 h-3.5" /> Upgrade Plan
                    </button>
                </motion.div>

                {/* Monthly Spend Chart */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="lg:col-span-2 bg-card border border-white/5 rounded-xl p-6"
                >
                    <h3 className="text-sm font-medium mb-4">Monthly Spend</h3>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={seedMonthlySpend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                                <XAxis dataKey="month" stroke="#52525b" tick={{ fontSize: 10 }} tickLine={false} />
                                <YAxis stroke="#52525b" tick={{ fontSize: 10 }} tickLine={false} tickFormatter={v => `$${v}`} />
                                <Tooltip contentStyle={{ background: '#18181b', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: 12 }} formatter={(v) => formatCurrency(v as number)} />
                                <Bar dataKey="amount" fill="#7c3aed" radius={[4, 4, 0, 0]} name="Spend" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Usage Breakdown */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-card border border-white/5 rounded-xl p-6"
            >
                <h3 className="text-sm font-medium mb-4">Current Period Usage</h3>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    {[
                        { label: 'GPU Hours', value: `${seedUsageBreakdown.gpuHours}h`, cost: seedUsageBreakdown.gpuCost },
                        { label: 'Storage', value: `${seedUsageBreakdown.storageGb} GB`, cost: seedUsageBreakdown.storageCost },
                        { label: 'Network', value: `${seedUsageBreakdown.networkEgressGb} GB`, cost: seedUsageBreakdown.networkCost },
                        { label: 'Serverless', value: `${(seedUsageBreakdown.serverlessInvocations / 1000).toFixed(1)}k`, cost: seedUsageBreakdown.serverlessCost },
                        { label: 'Total', value: formatCurrency(seedUsageBreakdown.totalCost), cost: seedUsageBreakdown.totalCost, isTotal: true },
                    ].map(u => (
                        <div key={u.label} className={cn("rounded-lg p-3", u.label === 'Total' ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-white/5')}>
                            <p className="text-xs text-zinc-500 mb-1">{u.label}</p>
                            <p className="text-lg font-bold">{u.value}</p>
                            {u.label !== 'Total' && <p className="text-xs text-zinc-500">{formatCurrency(u.cost)}</p>}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Payment Methods */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-card border border-white/5 rounded-xl p-6"
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium">Payment Methods</h3>
                    <button className="text-xs text-purple-400 hover:text-purple-300 inline-flex items-center gap-1"><Plus className="w-3 h-3" /> Add Card</button>
                </div>
                <div className="space-y-3">
                    {seedPaymentMethods.map(pm => (
                        <div key={pm.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                            <div className="flex items-center gap-3">
                                <CreditCard className="w-5 h-5 text-zinc-500" />
                                <div>
                                    <p className="text-sm font-medium">{pm.brand} •••• {pm.last4}</p>
                                    <p className="text-xs text-zinc-500">Expires {pm.expMonth}/{pm.expYear}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {pm.isDefault && <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full">Default</span>}
                                <button className="p-1 text-zinc-500 hover:text-white"><MoreHorizontal className="w-4 h-4" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Invoices */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h3 className="text-sm font-medium mb-4">Invoices</h3>
                <div className="bg-card border border-white/5 rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead><tr className="border-b border-white/5">
                            <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3">Invoice</th>
                            <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3">Date</th>
                            <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3">Amount</th>
                            <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3">Status</th>
                            <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">Actions</th>
                        </tr></thead>
                        <tbody>
                            {seedInvoices.map((inv, i) => (
                                <tr key={inv.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                                    <td className="px-5 py-4 text-sm font-medium">{inv.number}</td>
                                    <td className="px-5 py-4 text-sm text-zinc-400">{formatDate(inv.date)}</td>
                                    <td className="px-5 py-4 text-sm font-medium">{inv.amount > 0 ? formatCurrency(inv.amount) : '—'}</td>
                                    <td className="px-5 py-4"><span className={cn("text-[11px] px-2.5 py-1 rounded-full border", inv.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : inv.status === 'draft' ? 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30')}>{inv.status}</span></td>
                                    <td className="px-5 py-4 text-right"><button className="text-xs text-purple-400 hover:text-purple-300"><ExternalLink className="w-3.5 h-3.5" /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
