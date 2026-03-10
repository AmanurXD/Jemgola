import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: ReactNode;
    suffix?: ReactNode;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, icon, suffix, error, ...props }, ref) => (
        <div className="relative">
            {icon && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground [&>svg]:w-4 [&>svg]:h-4">
                    {icon}
                </span>
            )}
            <input
                ref={ref}
                className={cn(
                    'flex h-9 w-full rounded-lg bg-surface-0 border text-sm transition-all duration-150',
                    'placeholder:text-muted-foreground/50',
                    'focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    error ? 'border-destructive/40' : 'border-border-strong',
                    icon ? 'pl-10 pr-3' : 'px-3',
                    suffix ? 'pr-10' : '',
                    className
                )}
                {...props}
            />
            {suffix && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {suffix}
                </span>
            )}
            {error && <p className="text-xs text-destructive mt-1.5">{error}</p>}
        </div>
    )
);
Input.displayName = 'Input';

/* ─── Select ─────────────────────────────────────────── */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, error, children, ...props }, ref) => (
        <div>
            <select
                ref={ref}
                className={cn(
                    'flex h-9 w-full rounded-lg bg-surface-0 border text-sm transition-all duration-150 px-3',
                    'focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    error ? 'border-destructive/40' : 'border-border-strong',
                    className
                )}
                {...props}
            >
                {children}
            </select>
            {error && <p className="text-xs text-destructive mt-1.5">{error}</p>}
        </div>
    )
);
Select.displayName = 'Select';

export { Input, Select, type InputProps, type SelectProps };
