'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Cpu, Server, Zap, Network, HardDrive,
    Database, Brain, Box, LayoutTemplate, Globe, FileText,
    Activity, CreditCard, Coins, Settings, ChevronLeft, ChevronRight,
    Search, Bell, ChevronDown, LogOut, User,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navGroups = [
    {
        label: 'General', items: [
            { label: 'Overview', href: '/dashboard/overview', icon: LayoutDashboard },
        ]
    },
    {
        label: 'Compute', items: [
            { label: 'GPU Marketplace', href: '/dashboard/gpu-marketplace', icon: Cpu },
            { label: 'Pods', href: '/dashboard/pods', icon: Server },
            { label: 'Serverless', href: '/dashboard/serverless', icon: Zap },
            { label: 'Clusters', href: '/dashboard/clusters', icon: Network },
            { label: 'Nodes', href: '/dashboard/nodes', icon: HardDrive },
        ]
    },
    {
        label: 'Storage', items: [
            { label: 'Storage', href: '/dashboard/storage', icon: Database },
        ]
    },
    {
        label: 'ML', items: [
            { label: 'Finetuning', href: '/dashboard/finetuning', icon: Brain },
            { label: 'Containers', href: '/dashboard/containers', icon: Box },
            { label: 'Templates', href: '/dashboard/templates', icon: LayoutTemplate },
        ]
    },
    {
        label: 'Operations', items: [
            { label: 'Networking', href: '/dashboard/networking', icon: Globe },
            { label: 'Logs', href: '/dashboard/logs', icon: FileText },
            { label: 'Monitoring', href: '/dashboard/monitoring', icon: Activity },
        ]
    },
    {
        label: 'Account', items: [
            { label: 'Billing', href: '/dashboard/billing', icon: CreditCard },
            { label: 'Credits', href: '/dashboard/credits', icon: Coins },
            { label: 'Settings', href: '/dashboard/settings', icon: Settings },
        ]
    },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('jg_session');
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <motion.aside
                animate={{ width: collapsed ? 64 : 240 }}
                className="fixed top-0 left-0 bottom-0 z-40 bg-card/50 border-r border-white/5 flex flex-col overflow-hidden"
                style={{ backdropFilter: 'blur(12px)' }}
            >
                {/* Logo */}
                <div className={cn("h-14 flex items-center border-b border-white/5 shrink-0", collapsed ? 'justify-center px-2' : 'px-4')}>
                    <Link href="/dashboard/overview" className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shrink-0">
                            <Cpu className="w-3.5 h-3.5 text-white" />
                        </div>
                        {!collapsed && <span className="font-bold text-sm">JemGola</span>}
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto py-3 px-2">
                    {navGroups.map(group => (
                        <div key={group.label} className="mb-3">
                            {!collapsed && <p className="text-[10px] uppercase tracking-wider text-zinc-600 px-2 mb-1.5">{group.label}</p>}
                            {group.items.map(item => {
                                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                                return (
                                    <Link key={item.href} href={item.href}
                                        className={cn(
                                            'flex items-center gap-2.5 rounded-lg text-sm transition-all mb-0.5 relative',
                                            collapsed ? 'justify-center p-2' : 'px-2.5 py-2',
                                            isActive ? 'bg-purple-500/10 text-purple-400' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                        )}
                                    >
                                        {isActive && <motion.div layoutId="sidebar-active" className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-purple-500 rounded-r" />}
                                        <item.icon className="w-4 h-4 shrink-0" />
                                        {!collapsed && <span>{item.label}</span>}
                                    </Link>
                                );
                            })}
                        </div>
                    ))}
                </nav>

                {/* Collapse Toggle */}
                <button onClick={() => setCollapsed(!collapsed)}
                    className="h-10 border-t border-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-colors shrink-0"
                >
                    {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
            </motion.aside>

            {/* Main */}
            <div className={cn("flex-1 flex flex-col transition-[margin]", collapsed ? 'ml-16' : 'ml-60')}>
                {/* Header */}
                <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-card/30 backdrop-blur-sm sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-sm">
                            <div className="w-5 h-5 rounded bg-purple-500/20 flex items-center justify-center">
                                <span className="text-[10px] font-bold text-purple-400">A</span>
                            </div>
                            <span className="text-zinc-400">Acme AI Labs</span>
                            <ChevronDown className="w-3 h-3 text-zinc-600" />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 bg-card border border-white/5 rounded-lg px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-300 hover:border-white/10 transition-colors w-52">
                            <Search className="w-3.5 h-3.5" />
                            <span>Search...</span>
                            <kbd className="ml-auto bg-white/5 px-1.5 py-0.5 rounded text-[10px] text-zinc-600">⌘K</kbd>
                        </button>

                        <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-purple-500 rounded-full" />
                        </button>

                        <div className="relative">
                            <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white"
                            >
                                A
                            </button>
                            {userMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                                    <div className="absolute right-0 top-10 z-50 bg-card border border-white/10 rounded-lg shadow-xl w-48 py-1">
                                        <div className="px-3 py-2 border-b border-white/5">
                                            <p className="text-sm font-medium">Alex Chen</p>
                                            <p className="text-xs text-zinc-500">alex@jemgola.dev</p>
                                        </div>
                                        <Link href="/dashboard/settings" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-white">
                                            <User className="w-3.5 h-3.5" /> Settings
                                        </Link>
                                        <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/5">
                                            <LogOut className="w-3.5 h-3.5" /> Log out
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-6">
                    <AnimatePresence mode="wait">
                        <motion.div key={pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
