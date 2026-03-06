'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Plus, TrendingDown, TrendingUp, AlertTriangle, Zap } from 'lucide-react';
import { cn, formatCurrency, formatDateTime } from '@/lib/utils';
import { seedTransactions, seedCreditBalance, seedRechargeConfig } from '@/data/seed';

const typeColors: Record<string, string> = { top_up: 'text-emerald-400', usage: 'text-red-400', auto_recharge: 'text-blue-400', refund: 'text-emerald-400', promotional: 'text-purple-400' };

export default function CreditsPage() {
    const [balance] = useState(seedCreditBalance);

    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold">Credits</h1><p className="text-sm text-zinc-400">Manage your credit balance and auto-recharge</p></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Balance */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-white/5 rounded-xl p-6"
                >
                    <p className="text-xs text-zinc-500 mb-2">Credit Balance</p>
                    <p className="text-4xl font-bold mb-4">{formatCurrency(balance)}</p>
                    {balance < 50 && (
                        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 mb-4">
                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                            <p className="text-xs text-amber-400">Low balance — consider topping up</p>
                        </div>
                    )}
                    <button className="w-full bg-primary hover:bg-primary/90 text-white py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" /> Top Up Credits
                    </button>
                </motion.div>

                {/* Auto-Recharge */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="bg-card border border-white/5 rounded-xl p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium flex items-center gap-2"><Zap className="w-4 h-4 text-zinc-400" /> Auto-Recharge</h3>
                        <span className={cn("text-[10px] px-2 py-0.5 rounded-full", seedRechargeConfig.enabled ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-500/10 text-zinc-400')}>
                            {seedRechargeConfig.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm"><span className="text-zinc-400">Threshold</span><span>{formatCurrency(seedRechargeConfig.threshold)}</span></div>
                        <div className="flex items-center justify-between text-sm"><span className="text-zinc-400">Recharge Amount</span><span>{formatCurrency(seedRechargeConfig.rechargeAmount)}</span></div>
                        <div className="flex items-center justify-between text-sm"><span className="text-zinc-400">Payment Method</span><span>Visa •••• 4242</span></div>
                    </div>
                    <button className="w-full bg-white/5 hover:bg-white/10 py-2 rounded-lg text-xs text-zinc-300 mt-4 transition-colors">Configure</button>
                </motion.div>

                {/* Quick Stats */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="bg-card border border-white/5 rounded-xl p-6 space-y-4"
                >
                    <h3 className="text-sm font-medium">Summary</h3>
                    <div className="flex items-center justify-between text-sm"><span className="text-zinc-400">This Month Usage</span><span className="text-red-400">-$178.43</span></div>
                    <div className="flex items-center justify-between text-sm"><span className="text-zinc-400">Total Top-ups</span><span className="text-emerald-400">+$750.00</span></div>
                    <div className="flex items-center justify-between text-sm"><span className="text-zinc-400">Promotional Credits</span><span className="text-purple-400">+$25.00</span></div>
                    <div className="flex items-center justify-between text-sm pt-3 border-t border-white/5"><span className="text-zinc-300 font-medium">Net Balance</span><span className="font-bold">{formatCurrency(balance)}</span></div>
                </motion.div>
            </div>

            {/* Transaction History */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h3 className="text-sm font-medium mb-4">Transaction History</h3>
                <div className="bg-card border border-white/5 rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead><tr className="border-b border-white/5">
                            <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3">Description</th>
                            <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden md:table-cell">Type</th>
                            <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden md:table-cell">Date</th>
                            <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">Amount</th>
                            <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3 hidden lg:table-cell">Balance</th>
                        </tr></thead>
                        <tbody>
                            {seedTransactions.map((tx, i) => (
                                <motion.tr key={tx.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                                >
                                    <td className="px-5 py-4"><div className="flex items-center gap-3">{tx.amount > 0 ? <TrendingUp className="w-4 h-4 text-emerald-400" /> : <TrendingDown className="w-4 h-4 text-red-400" />}<span className="text-sm">{tx.description}</span></div></td>
                                    <td className="px-5 py-4 hidden md:table-cell"><span className={cn("text-[11px] capitalize", typeColors[tx.type])}>{tx.type.replace('_', ' ')}</span></td>
                                    <td className="px-5 py-4 text-sm text-zinc-400 hidden md:table-cell">{formatDateTime(tx.createdAt)}</td>
                                    <td className="px-5 py-4 text-right"><span className={cn("text-sm font-medium", tx.amount > 0 ? 'text-emerald-400' : 'text-red-400')}>{tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}</span></td>
                                    <td className="px-5 py-4 text-right text-sm text-zinc-400 hidden lg:table-cell">{formatCurrency(tx.balanceAfter)}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
