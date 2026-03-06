'use client';

import { motion } from 'framer-motion';
import { Activity, AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { cn, formatDateTime } from '@/lib/utils';
import { seedMetricSeries, seedAlerts } from '@/data/seed';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const severityIcons = { info: Info, warning: AlertTriangle, critical: AlertCircle };
const severityColors = { info: 'text-blue-400 bg-blue-500/10 border-blue-500/20', warning: 'text-amber-400 bg-amber-500/10 border-amber-500/20', critical: 'text-red-400 bg-red-500/10 border-red-500/20' };

export default function MonitoringPage() {
    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold">Monitoring</h1><p className="text-sm text-zinc-400">Real-time resource utilization and alerts</p></div>

            {/* Gauge Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {seedMetricSeries.map((series, i) => {
                    const latestValue = Math.round(series.data[series.data.length - 1]?.value || 0);
                    return (
                        <motion.div key={series.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                            className="bg-card border border-white/5 rounded-xl p-5"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs text-zinc-500">{series.label}</span>
                                <Activity className="w-4 h-4 text-zinc-600" />
                            </div>
                            <p className="text-3xl font-bold mb-2" style={{ color: series.color }}>{latestValue}%</p>
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${latestValue}%` }} transition={{ duration: 1 }}
                                    className="h-full rounded-full" style={{ backgroundColor: series.color }} />
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {seedMetricSeries.slice(0, 2).map((series) => (
                    <motion.div key={series.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-card border border-white/5 rounded-xl p-5"
                    >
                        <h3 className="text-sm font-medium mb-4">{series.label} (24h)</h3>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={series.data.map(d => ({ time: new Date(d.timestamp).getHours() + ':00', value: Math.round(d.value) }))}>
                                    <defs><linearGradient id={`grad-${series.label}`} x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={series.color} stopOpacity={0.3} /><stop offset="95%" stopColor={series.color} stopOpacity={0} /></linearGradient></defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                                    <XAxis dataKey="time" stroke="#52525b" tick={{ fontSize: 10 }} tickLine={false} />
                                    <YAxis stroke="#52525b" tick={{ fontSize: 10 }} tickLine={false} domain={[0, 100]} />
                                    <Tooltip contentStyle={{ background: '#18181b', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: 12 }} />
                                    <Area type="monotone" dataKey="value" stroke={series.color} fill={`url(#grad-${series.label})`} strokeWidth={2} name="%" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Alerts */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Active Alerts</h2>
                <div className="space-y-3">
                    {seedAlerts.map((alert, i) => {
                        const Icon = severityIcons[alert.severity];
                        return (
                            <motion.div key={alert.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                className={cn("flex items-start gap-3 border rounded-xl p-4", severityColors[alert.severity])}
                            >
                                <Icon className="w-4 h-4 mt-0.5 shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm">{alert.message}</p>
                                    <p className="text-xs opacity-60 mt-1">{formatDateTime(alert.timestamp)}</p>
                                </div>
                                {!alert.acknowledged && <button className="text-xs bg-white/10 px-2.5 py-1 rounded-lg hover:bg-white/20 transition-colors shrink-0">Acknowledge</button>}
                                {alert.acknowledged && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
