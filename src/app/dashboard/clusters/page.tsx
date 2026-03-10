'use client';

import { motion } from 'framer-motion';
import { Network, Plus, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { seedClusters } from '@/data/seed';
import { Card, PageHeader, Button, StatusBadge } from '@/components/ui';
import Link from 'next/link';

export default function ClustersPage() {
    return (
        <div className="space-y-5">
            <PageHeader title="Clusters" description="Manage multi-node GPU clusters" action={<Button icon={<Plus />}>Create Cluster</Button>} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {seedClusters.map((cls, i) => (
                    <motion.div key={cls.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.25 }}>
                        <Card padding="none" className="hover:border-border-strong transition-all duration-200">
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <StatusBadge status={cls.status} />
                                    <span className="text-[11px] text-muted-foreground capitalize">{cls.scalingPolicy}</span>
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Network className="w-4 h-4 text-primary/70" />
                                    <h3 className="text-[15px] font-semibold text-heading tracking-tight">{cls.name}</h3>
                                </div>
                                <p className="text-xs text-muted-foreground mb-4">{cls.gpuType} · {cls.region}</p>

                                <div className="grid grid-cols-3 gap-2.5 text-center mb-4">
                                    {[
                                        [cls.nodes.length, 'Nodes'],
                                        [cls.nodes.length, 'GPUs'],
                                        [cls.totalVram, 'GB VRAM'],
                                    ].map(([val, label]) => (
                                        <div key={label as string} className="bg-surface-0 rounded-lg py-2 px-1">
                                            <p className="text-base font-semibold text-heading">{val}</p>
                                            <p className="text-[10px] text-muted-foreground">{label}</p>
                                        </div>
                                    ))}
                                </div>

                                {cls.nodes.length > 0 && (
                                    <div className="space-y-1.5 mb-4">
                                        {cls.nodes.slice(0, 3).map(node => (
                                            <div key={node.id} className="flex items-center gap-2">
                                                <span className={cn("w-1.5 h-1.5 rounded-full", node.status === 'healthy' ? 'bg-success' : node.status === 'degraded' ? 'bg-warning' : 'bg-destructive')} />
                                                <span className="text-xs text-muted-foreground flex-1 font-mono">{node.id}</span>
                                                <span className="text-xs text-muted-foreground tabular-nums">{Math.round(node.gpuUtilization)}%</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Link href={`/dashboard/clusters/${cls.id}`} className="flex items-center justify-center gap-2 border-t border-border py-2.5 text-xs text-muted-foreground hover:text-foreground hover:bg-surface-0 transition-colors rounded-b-xl">
                                <Settings2 className="w-3 h-3" /> Manage
                            </Link>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
