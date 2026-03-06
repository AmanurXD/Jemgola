import {
    LayoutDashboard, Cpu, Server, Zap, Network, HardDrive,
    Database, Brain, Box, LayoutTemplate, Globe, FileText,
    Activity, CreditCard, Coins, Settings, ChevronRight,
} from 'lucide-react';

export const APP_NAME = 'JemGola';
export const APP_DESCRIPTION = 'Cloud GPU Infrastructure Platform';

export interface NavItem {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    group: string;
}

export const DASHBOARD_NAV: NavItem[] = [
    { label: 'Overview', href: '/dashboard/overview', icon: LayoutDashboard, group: 'General' },
    { label: 'GPU Marketplace', href: '/dashboard/gpu-marketplace', icon: Cpu, group: 'Compute' },
    { label: 'Pods', href: '/dashboard/pods', icon: Server, group: 'Compute' },
    { label: 'Serverless', href: '/dashboard/serverless', icon: Zap, group: 'Compute' },
    { label: 'Clusters', href: '/dashboard/clusters', icon: Network, group: 'Compute' },
    { label: 'Nodes', href: '/dashboard/nodes', icon: HardDrive, group: 'Compute' },
    { label: 'Storage', href: '/dashboard/storage', icon: Database, group: 'Storage' },
    { label: 'Finetuning', href: '/dashboard/finetuning', icon: Brain, group: 'ML' },
    { label: 'Containers', href: '/dashboard/containers', icon: Box, group: 'ML' },
    { label: 'Templates', href: '/dashboard/templates', icon: LayoutTemplate, group: 'ML' },
    { label: 'Networking', href: '/dashboard/networking', icon: Globe, group: 'Operations' },
    { label: 'Logs', href: '/dashboard/logs', icon: FileText, group: 'Operations' },
    { label: 'Monitoring', href: '/dashboard/monitoring', icon: Activity, group: 'Operations' },
    { label: 'Billing', href: '/dashboard/billing', icon: CreditCard, group: 'Account' },
    { label: 'Credits', href: '/dashboard/credits', icon: Coins, group: 'Account' },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings, group: 'Account' },
];

export const MARKETING_NAV = [
    { label: 'Product', href: '#product' },
    { label: 'GPU Marketplace', href: '#gpu-marketplace' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: '#docs' },
];

export const GPU_CATEGORIES = ['Data Center', 'Professional', 'Consumer'] as const;
export const REGIONS = ['US East', 'US West', 'EU West', 'EU Central', 'Asia Pacific'] as const;
