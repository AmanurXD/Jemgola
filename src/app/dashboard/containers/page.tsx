'use client';

import { motion } from 'framer-motion';
import { Box, MoreHorizontal, Copy } from 'lucide-react';
import { formatBytes, formatDate } from '@/lib/utils';
import { seedContainers } from '@/data/seed';

export default function ContainersPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-2xl font-bold">Containers</h1><p className="text-sm text-zinc-400">Manage your container image registry</p></div>
            </div>

            <div className="bg-card border border-white/5 rounded-xl p-4">
                <p className="text-xs text-zinc-400 mb-2">Push your images using:</p>
                <div className="flex items-center gap-2 bg-zinc-950 rounded-lg px-4 py-2.5 font-mono text-sm">
                    <span className="text-zinc-500 flex-1 truncate">docker push registry.jemgola.io/your-image:tag</span>
                    <button className="text-zinc-500 hover:text-white transition-colors"><Copy className="w-4 h-4" /></button>
                </div>
            </div>

            <div className="bg-card border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead><tr className="border-b border-white/5">
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3">Image</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3">Tag</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden md:table-cell">Size</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden lg:table-cell">Layers</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden md:table-cell">Pulls</th>
                        <th className="text-left text-xs text-zinc-500 font-medium px-5 py-3 hidden lg:table-cell">Created</th>
                        <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">Actions</th>
                    </tr></thead>
                    <tbody>
                        {seedContainers.map((img, i) => (
                            <motion.tr key={img.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                                className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="px-5 py-4"><div className="flex items-center gap-3"><Box className="w-4 h-4 text-zinc-500" /><p className="text-sm font-medium">{img.name}</p></div></td>
                                <td className="px-5 py-4"><span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-md">{img.tag}</span></td>
                                <td className="px-5 py-4 text-sm text-zinc-400 hidden md:table-cell">{formatBytes(img.sizeBytes)}</td>
                                <td className="px-5 py-4 text-sm text-zinc-400 hidden lg:table-cell">{img.layers}</td>
                                <td className="px-5 py-4 text-sm text-zinc-400 hidden md:table-cell">{img.pulls.toLocaleString()}</td>
                                <td className="px-5 py-4 text-sm text-zinc-400 hidden lg:table-cell">{formatDate(img.createdAt)}</td>
                                <td className="px-5 py-4 text-right"><button className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500"><MoreHorizontal className="w-4 h-4" /></button></td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
