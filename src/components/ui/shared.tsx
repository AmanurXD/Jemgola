'use client';

import { type ReactNode, type HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/* ─── DataTable ─────────────────────────────────────────── */
interface Column<T> {
    key: string;
    header: string;
    className?: string;
    hideBelow?: 'sm' | 'md' | 'lg';
    render: (row: T, index: number) => ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    keyExtractor: (row: T) => string;
    onRowClick?: (row: T) => void;
    className?: string;
}

function DataTable<T>({ columns, data, keyExtractor, onRowClick, className }: DataTableProps<T>) {
    const hideClass = (col: Column<T>) => {
        if (!col.hideBelow) return '';
        return col.hideBelow === 'md' ? 'hidden md:table-cell' : col.hideBelow === 'lg' ? 'hidden lg:table-cell' : 'hidden sm:table-cell';
    };

    return (
        <div className={cn('bg-surface-1 border border-border rounded-xl overflow-hidden', className)}>
            <table className="w-full">
                <thead>
                    <tr className="border-b border-border">
                        {columns.map(col => (
                            <th key={col.key} className={cn(
                                'text-left text-[11px] uppercase tracking-wider text-muted-foreground font-medium px-4 py-3',
                                hideClass(col), col.className
                            )}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <motion.tr
                            key={keyExtractor(row)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.025, duration: 0.2 }}
                            onClick={() => onRowClick?.(row)}
                            className={cn(
                                'border-b border-border-subtle last:border-0 transition-colors',
                                onRowClick && 'cursor-pointer hover:bg-surface-0/50'
                            )}
                        >
                            {columns.map(col => (
                                <td key={col.key} className={cn('px-4 py-3.5', hideClass(col), col.className)}>
                                    {col.render(row, i)}
                                </td>
                            ))}
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/* ─── EmptyState ────────────────────────────────────────── */
interface EmptyStateProps {
    icon: ReactNode;
    title: string;
    description: string;
    action?: ReactNode;
    className?: string;
}

function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
    return (
        <div className={cn('flex flex-col items-center justify-center py-20 text-center', className)}>
            <div className="w-12 h-12 rounded-xl bg-surface-2 flex items-center justify-center mb-4 text-muted-foreground [&>svg]:w-6 [&>svg]:h-6">
                {icon}
            </div>
            <h3 className="text-sm font-semibold text-heading mb-1">{title}</h3>
            <p className="text-xs text-muted-foreground max-w-xs mb-5">{description}</p>
            {action}
        </div>
    );
}

/* ─── PageHeader ────────────────────────────────────────── */
interface PageHeaderProps {
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
}

function PageHeader({ title, description, action, className }: PageHeaderProps) {
    return (
        <div className={cn('flex flex-col sm:flex-row sm:items-center justify-between gap-3', className)}>
            <div>
                <h1 className="text-xl font-semibold text-heading tracking-tight">{title}</h1>
                {description && <p className="text-[13px] text-muted-foreground mt-0.5">{description}</p>}
            </div>
            {action}
        </div>
    );
}

/* ─── StatCard ──────────────────────────────────────────── */
interface StatCardProps {
    label: string;
    value: string;
    change?: string;
    trend?: 'up' | 'down';
    icon?: ReactNode;
    delay?: number;
}

function StatCard({ label, value, change, trend, icon, delay = 0 }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.3 }}
            className="bg-surface-1 border border-border rounded-xl p-4 group hover:border-border-strong transition-all duration-200"
        >
            <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{label}</span>
                {icon && <span className="text-muted-foreground/60 [&>svg]:w-4 [&>svg]:h-4">{icon}</span>}
            </div>
            <p className="text-2xl font-semibold text-heading tracking-tight">{value}</p>
            {change && (
                <p className={cn(
                    'text-xs mt-1.5 font-medium',
                    trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                )}>
                    {change}
                </p>
            )}
        </motion.div>
    );
}

/* ─── Tabs ──────────────────────────────────────────────── */
interface TabsProps {
    tabs: string[];
    active: string;
    onChange: (tab: string) => void;
    layoutId?: string;
    className?: string;
}

function Tabs({ tabs, active, onChange, layoutId = 'tabs', className }: TabsProps) {
    return (
        <div className={cn('flex gap-0.5 border-b border-border', className)}>
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => onChange(tab)}
                    className={cn(
                        'relative px-3.5 py-2.5 text-[13px] font-medium transition-colors',
                        active === tab ? 'text-heading' : 'text-muted-foreground hover:text-foreground'
                    )}
                >
                    {tab}
                    {active === tab && (
                        <motion.div layoutId={layoutId} className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
                    )}
                </button>
            ))}
        </div>
    );
}

/* ─── Dropdown Menu ─────────────────────────────────────── */
interface DropdownProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
    align?: 'left' | 'right';
}

function Dropdown({ open, onClose, children, className, align = 'right' }: DropdownProps) {
    if (!open) return null;
    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose} />
            <div className={cn(
                'absolute top-full mt-1 z-50 bg-surface-2 border border-border-strong rounded-lg shadow-xl py-1 min-w-[160px]',
                align === 'right' ? 'right-0' : 'left-0',
                className
            )}>
                {children}
            </div>
        </>
    );
}

function DropdownItem({ className, destructive, ...props }: HTMLAttributes<HTMLButtonElement> & { destructive?: boolean }) {
    return (
        <button
            className={cn(
                'w-full flex items-center gap-2.5 px-3 py-2 text-[13px] transition-colors',
                destructive
                    ? 'text-destructive hover:bg-destructive/5'
                    : 'text-secondary-foreground hover:bg-surface-3',
                className
            )}
            {...props}
        />
    );
}

/* ─── FilterChips ───────────────────────────────────────── */
interface FilterChipsProps {
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

function FilterChips({ options, value, onChange, className }: FilterChipsProps) {
    return (
        <div className={cn('flex gap-1.5 flex-wrap', className)}>
            {options.map(opt => (
                <button
                    key={opt.value}
                    onClick={() => onChange(opt.value)}
                    className={cn(
                        'px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150',
                        value === opt.value
                            ? 'bg-primary/10 text-primary border border-primary/25'
                            : 'bg-surface-1 border border-border text-muted-foreground hover:text-foreground hover:border-border-strong'
                    )}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}

/* ─── Section header for marketing ──────────────────────── */
interface SectionHeaderProps {
    overline?: string;
    overlineColor?: string;
    title: string;
    description?: string;
}

function SectionHeader({ overline, overlineColor = 'text-primary-subtle', title, description }: SectionHeaderProps) {
    return (
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            {overline && <p className={cn('text-xs font-semibold uppercase tracking-widest mb-3', overlineColor)}>{overline}</p>}
            <h2 className="text-3xl sm:text-4xl font-bold text-heading tracking-tight mb-4">{title}</h2>
            {description && <p className="text-[15px] text-muted-foreground max-w-xl mx-auto leading-relaxed">{description}</p>}
        </motion.div>
    );
}

export {
    DataTable, EmptyState, PageHeader, StatCard, Tabs,
    Dropdown, DropdownItem, FilterChips, SectionHeader,
    type Column, type DataTableProps, type EmptyStateProps, type PageHeaderProps,
    type StatCardProps, type TabsProps, type DropdownProps, type FilterChipsProps,
};
