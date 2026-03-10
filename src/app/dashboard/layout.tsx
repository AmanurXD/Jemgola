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
import { Dropdown, DropdownItem } from '@/components/ui';

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
            {/* ─── Sidebar ─────────────────────────────────── */}
            <motion.aside
                animate={{ width: collapsed ? 56 : 220 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="fixed top-0 left-0 bottom-0 z-40 bg-surface-0 border-r border-border flex flex-col overflow-hidden"
            >
                {/* Logo */}
                <div className={cn('h-[52px] flex items-center border-b border-border shrink-0', collapsed ? 'justify-center px-2' : 'px-4')}>
                    <Link href="/dashboard/overview" className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center shrink-0">
                            <Cpu className="w-3.5 h-3.5 text-white" />
                        </div>
                        {!collapsed && <span className="font-semibold text-sm text-heading tracking-tight">JemGola</span>}
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto py-2 px-2">
                    {navGroups.map(group => (
                        <div key={group.label} className="mb-1">
                            {!collapsed && (
                                <p className="text-[10px] uppercase tracking-[0.08em] text-muted-foreground/50 font-medium px-2 mb-1 mt-3 first:mt-1">
                                    {group.label}
                                </p>
                            )}
                            {group.items.map(item => {
                                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            'flex items-center gap-2.5 rounded-md text-[13px] transition-all duration-150 mb-px relative',
                                            collapsed ? 'justify-center p-2' : 'px-2.5 py-[7px]',
                                            isActive
                                                ? 'bg-primary/8 text-heading font-medium'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-surface-1'
                                        )}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="sidebar-active"
                                                className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-primary rounded-r-full"
                                                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                            />
                                        )}
                                        <item.icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-primary' : '')} />
                                        {!collapsed && <span>{item.label}</span>}
                                    </Link>
                                );
                            })}
                        </div>
                    ))}
                </nav>

                {/* Collapse */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="h-10 border-t border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0"
                >
                    {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
                </button>
            </motion.aside>

            {/* ─── Main ────────────────────────────────────── */}
            <div className={cn('flex-1 flex flex-col transition-[margin] duration-200', collapsed ? 'ml-14' : 'ml-[220px]')}>
                {/* Header */}
                <header className="h-[52px] border-b border-border flex items-center justify-between px-5 bg-surface-0/60 backdrop-blur-md sticky top-0 z-30">
                    <div className="flex items-center gap-2.5">
                        <div className="flex items-center gap-2 text-[13px] cursor-pointer hover:bg-surface-1 rounded-md px-2 py-1.5 transition-colors">
                            <div className="w-5 h-5 rounded-md bg-primary/12 flex items-center justify-center">
                                <span className="text-[10px] font-bold text-primary">A</span>
                            </div>
                            <span className="text-muted-foreground">Acme AI Labs</span>
                            <ChevronDown className="w-3 h-3 text-muted-foreground/50" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 bg-surface-1 border border-border rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-border-strong transition-all w-48">
                            <Search className="w-3.5 h-3.5" />
                            <span>Search…</span>
                            <kbd className="ml-auto bg-surface-2 px-1.5 py-0.5 rounded text-[10px] text-muted-foreground/60 font-mono">⌘K</kbd>
                        </button>

                        <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-surface-1 rounded-lg transition-colors">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center text-[11px] font-semibold text-white"
                            >
                                A
                            </button>
                            <Dropdown open={userMenuOpen} onClose={() => setUserMenuOpen(false)}>
                                <div className="px-3 py-2.5 border-b border-border">
                                    <p className="text-[13px] font-medium text-heading">Alex Chen</p>
                                    <p className="text-xs text-muted-foreground">alex@jemgola.dev</p>
                                </div>
                                <DropdownItem onClick={() => { setUserMenuOpen(false); router.push('/dashboard/settings'); }}>
                                    <User className="w-3.5 h-3.5" /> Settings
                                </DropdownItem>
                                <div className="border-t border-border my-0.5" />
                                <DropdownItem destructive onClick={handleLogout}>
                                    <LogOut className="w-3.5 h-3.5" /> Log out
                                </DropdownItem>
                            </Dropdown>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-6 max-w-[1400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
