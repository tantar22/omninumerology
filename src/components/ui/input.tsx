'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'h-10 w-full rounded-md border border-obsidian-border bg-obsidian-raised px-3 text-sm text-white placeholder:text-white/30 focus:border-celestial-violet focus:outline-none focus:ring-1 focus:ring-celestial-violet',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';
