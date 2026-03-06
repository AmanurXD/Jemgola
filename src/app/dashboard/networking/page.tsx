'use client';

import { motion } from 'framer-motion';
import { Globe, Plus, MoreHorizontal, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { seedFirewallRules } from '@/data/seed';

export default function NetworkingPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-2xl font-bold">Networking</h1><p className="text-sm text-zinc-400">Manage VPCs, firewall rules, and endpoints</p></div>
            </div>

            {/* Firewall Rules */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2"><Shield className="w-5 h-5 text-zinc-400" /> Firewall Rules</h2>
                    <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all"><Plus className="w-3.5 h-3.5" /> Add Rule</button>
                </div>
                <div className="bg-card border border-white/5 rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead><tr className="border-b border-white/5">
                            <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3">Rule Name</th>
                            <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3">Protocol</th>
                            <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3">Port Range</th>
                            <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden md:table-cell">Source</th>
                            <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden md:table-cell">Direction</th>
                            <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">Actions</th>
                        </tr></thead>
                        <tbody>
                            {seedFirewallRules.map((rule, i) => (
                                <motion.tr key={rule.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="px-5 py-4"><div className="flex items-center gap-3"><Globe className="w-4 h-4 text-zinc-500" /><span className="text-sm font-medium">{rule.name}</span></div></td>
                                    <td className="px-5 py-4"><span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-md">{rule.protocol}</span></td>
                                    <td className="px-5 py-4 text-sm text-zinc-400 font-mono">{rule.portRange}</td>
                                    <td className="px-5 py-4 text-sm text-zinc-400 font-mono hidden md:table-cell">{rule.source}</td>
                                    <td className="px-5 py-4 hidden md:table-cell"><span className={cn("text-xs px-2 py-0.5 rounded-md capitalize", rule.direction === 'inbound' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400')}>{rule.direction}</span></td>
                                    <td className="px-5 py-4 text-right"><button className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500"><MoreHorizontal className="w-4 h-4" /></button></td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
