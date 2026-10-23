import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-bold uppercase tracking-wider text-sm transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary: "bg-white text-red-600 hover:bg-red-600 hover:text-white border border-white hover:border-red-600 hover:shadow-[0_0_15px_rgba(255,0,0,0.6)]",
        secondary: "bg-transparent text-white border border-red-600 hover:bg-red-600 hover:text-white hover:shadow-[0_0_12px_rgba(255,0,0,0.5)]",
        gold: "bg-[#ffd000] text-black hover:bg-[#e6bc00] border border-[#cca600]",
        ghost: "bg-transparent hover:bg-zinc-800 text-white",
        outline: "border border-zinc-700 bg-transparent hover:bg-zinc-800 text-white",
        danger: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-14 px-8 text-base tracking-widest",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
