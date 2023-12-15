import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md  text-gray-200 bg-slate-500/20 autofill:bg-slate-500/20 autofill:shadow-[inset_0_0_0px_1000px_rgb(37,45,52)] autofill:bg-clip-text autofill:text-muted-foreground autofill:fill-muted-foreground px-3 py-2 text-sm ring-offset-slate-400/50 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
