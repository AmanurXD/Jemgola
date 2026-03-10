import { type ReactNode, type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

/* ─── Card ──────────────────────────────────────────────── */
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'elevated' | 'ghost' | 'accent';
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingMap = { none: '', sm: 'p-4', md: 'p-5', lg: 'p-6' };
const variantMap = {
    default: 'bg-surface-1 border border-border rounded-xl',
    elevated: 'bg-surface-1 border border-border rounded-xl shadow-md',
    ghost: 'bg-transparent border border-transparent rounded-xl',
    accent: 'bg-surface-1 border border-primary/20 rounded-xl shadow-glow',
};

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => (
        <div ref={ref} className={cn(variantMap[variant], paddingMap[padding], className)} {...props}>
            {children}
        </div>
    )
);
Card.displayName = 'Card';

/* ─── CardHeader ────────────────────────────────────────── */
function CardHeader({ className, children, action, ...props }: HTMLAttributes<HTMLDivElement> & { action?: ReactNode }) {
    return (
        <div className={cn('flex items-center justify-between mb-4', className)} {...props}>
            <div>{children}</div>
            {action && <div>{action}</div>}
        </div>
    );
}

function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
    return <h3 className={cn('text-[13px] font-semibold text-heading tracking-tight', className)} {...props}>{children}</h3>;
}

function CardDescription({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
    return <p className={cn('text-xs text-muted-foreground mt-0.5', className)} {...props}>{children}</p>;
}

export { Card, CardHeader, CardTitle, CardDescription, type CardProps };
