import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    dot?: boolean;
    pulse?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-surface-2 text-muted-foreground border-border',
    success: 'bg-success/8 text-success border-success/20',
    warning: 'bg-warning/8 text-warning border-warning/20',
    danger: 'bg-destructive/8 text-destructive border-destructive/20',
    info: 'bg-info/8 text-info border-info/20',
    outline: 'bg-transparent text-muted-foreground border-border-strong',
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = 'default', dot, pulse, children, ...props }, ref) => (
        <span
            ref={ref}
            className={cn(
                'inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-md border leading-none',
                variantStyles[variant],
                className
            )}
            {...props}
        >
            {dot && (
                <span className={cn('w-1.5 h-1.5 rounded-full bg-current', pulse && 'animate-pulse-dot')} />
            )}
            {children}
        </span>
    )
);
Badge.displayName = 'Badge';

/* ─── StatusBadge (maps lifecycle states to badge variants) ─────── */
type StatusVariant = 'running' | 'active' | 'healthy' |
    'creating' | 'provisioning' | 'starting' | 'deploying' | 'scaling' | 'preparing' | 'training' | 'queued' |
    'stopping' | 'restarting' | 'draining' | 'detaching' |
    'stopped' | 'idle' | 'completed' | 'available' |
    'failed' | 'degraded' | 'deleted' | 'deleting' | 'cancelled' |
    'limited' | 'sold_out' | 'attached' | 'draft' | 'paid' | 'pending' | 'overdue';

const statusMap: Record<StatusVariant, { variant: BadgeVariant; label?: string; pulse?: boolean }> = {
    // Active/healthy
    running: { variant: 'success', pulse: true },
    active: { variant: 'success', pulse: true },
    healthy: { variant: 'success' },
    available: { variant: 'success' },
    completed: { variant: 'success' },
    paid: { variant: 'success' },
    attached: { variant: 'info' },

    // In-progress
    creating: { variant: 'info' },
    provisioning: { variant: 'info' },
    starting: { variant: 'warning' },
    deploying: { variant: 'info' },
    scaling: { variant: 'warning' },
    preparing: { variant: 'info' },
    training: { variant: 'info', pulse: true },
    queued: { variant: 'default' },

    // Transitional
    stopping: { variant: 'warning' },
    restarting: { variant: 'warning' },
    draining: { variant: 'warning' },
    detaching: { variant: 'warning' },

    // Inactive
    stopped: { variant: 'default' },
    idle: { variant: 'default' },
    draft: { variant: 'default' },
    pending: { variant: 'warning' },
    overdue: { variant: 'danger' },

    // Error
    failed: { variant: 'danger' },
    degraded: { variant: 'danger' },
    deleted: { variant: 'default' },
    deleting: { variant: 'danger' },
    cancelled: { variant: 'default' },

    // Marketplace
    limited: { variant: 'warning' },
    sold_out: { variant: 'danger', label: 'Sold Out' },
};

function StatusBadge({ status, className }: { status: string; className?: string }) {
    const config = statusMap[status as StatusVariant] || { variant: 'default' as BadgeVariant };
    return (
        <Badge variant={config.variant} dot pulse={config.pulse} className={className}>
            {config.label || status.replace(/_/g, ' ')}
        </Badge>
    );
}

export { Badge, StatusBadge, type BadgeProps, type BadgeVariant };
