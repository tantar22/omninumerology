'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'gold' | 'violet' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  default: 'bg-celestial-violet text-white hover:bg-celestial-violetBright',
  gold: 'bg-celestial-gold text-obsidian hover:bg-celestial-goldBright',
  violet: 'bg-celestial-violet/20 text-celestial-violetBright border border-celestial-violet/40 hover:bg-celestial-violet/30',
  ghost: 'bg-transparent text-white/80 hover:bg-white/5 hover:text-white',
  outline: 'bg-transparent border border-obsidian-border text-white/80 hover:border-celestial-gold/50 hover:text-white',
};

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-celestial-violet disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = 'Button';
