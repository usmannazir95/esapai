"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 group/btn",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black shadow-lg shadow-white/10 hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] relative overflow-hidden",
        primary:
          "bg-primary text-[var(--color-primary-dark)] tracking-wide shadow-[0_0_30px_rgba(19,245,132,0.4)] hover:shadow-[0_0_50px_rgba(19,245,132,0.6),0_0_100px_rgba(19,245,132,0.3)] hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500 before:ease-out border border-white/20",
        premium:
          "bg-gradient-to-br from-primary via-[#4ADE80] to-[#8EFFC7] text-[var(--color-primary-dark)] shadow-[0_4px_15px_rgba(19,245,132,0.3)] hover:shadow-[0_8px_40px_rgba(19,245,132,0.5),0_0_60px_rgba(19,245,132,0.3)] hover:-translate-y-1 hover:scale-[1.03] active:scale-95 transition-all duration-500 relative overflow-hidden group/premium",
        glass:
          "bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-white/15 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1),inset_0_0_20px_rgba(255,255,255,0.05)] hover:-translate-y-0.5 active:scale-[0.98] relative overflow-hidden",
        surface:
          "bg-zinc-900/80 border border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(19,245,132,0.1)] hover:-translate-y-0.5 active:scale-[0.98]",
        outline:
          "bg-transparent border border-white/20 text-white hover:border-primary hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(19,245,132,0.15)] hover:-translate-y-0.5 active:scale-[0.98] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-primary/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500",
        ghost:
          "text-zinc-400 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] active:scale-[0.98]",
        link:
          "text-primary underline-offset-4 hover:underline hover:text-primary/80 transition-colors",
        destructive:
          "bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:-translate-y-0.5 active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    // When asChild is true, Slot requires a single child element.
    // We pass children directly without wrapping.
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {variant === "premium" && (
          <span className="absolute inset-0 block bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/premium:animate-shimmer pointer-events-none" />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {props.children}
        </span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
