import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: ReactNode;
    iconRight?: ReactNode;
    loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/80',
    secondary:
        'bg-surface-2 text-secondary-foreground border border-border-strong hover:bg-surface-3 active:bg-surface-3',
    ghost:
        'text-muted-foreground hover:text-foreground hover:bg-surface-2 active:bg-surface-3',
    outline:
        'border border-border-strong text-secondary-foreground hover:bg-surface-1 active:bg-surface-2',
    danger:
        'bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/15 active:bg-destructive/20',
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'h-7 px-2.5 text-xs gap-1.5 rounded-md',
    md: 'h-8 px-3.5 text-sm gap-2 rounded-lg',
    lg: 'h-10 px-5 text-sm gap-2 rounded-lg',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', icon, iconRight, loading, disabled, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={cn(
                    'inline-flex items-center justify-center font-medium transition-all duration-150 focus-ring whitespace-nowrap select-none',
                    'disabled:opacity-50 disabled:pointer-events-none',
                    variantStyles[variant],
                    sizeStyles[size],
                    className
                )}
                {...props}
            >
                {loading ? (
                    <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                ) : icon ? (
                    <span className="shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5">{icon}</span>
                ) : null}
                {children}
                {iconRight && <span className="shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5">{iconRight}</span>}
            </button>
        );
    }
);
Button.displayName = 'Button';

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };
