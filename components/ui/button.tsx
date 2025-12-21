import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-md text-xs sm:text-sm font-medium transition-all duration-[250ms] ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3 sm:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-opacity-90 hover:shadow-[0_0_30px_rgba(19,245,132,0.35),0_12px_32px_rgba(19,245,132,0.08),inset_0_0_24px_rgba(19,245,132,0.12)] hover:scale-[1.02] hover:-translate-y-0.5",
        primary: "bg-primary text-[var(--color-primary-dark)] hover:bg-primary-opacity-90 rounded-[40px] hover:shadow-[0_0_30px_rgba(19,245,132,0.35),0_12px_32px_rgba(19,245,132,0.08),inset_0_0_24px_rgba(19,245,132,0.12)] hover:scale-[1.02] hover:-translate-y-0.5",
        signup: "bg-white-opacity-10 border border-white-opacity-20 backdrop-blur-lg text-light-gray hover:bg-white-opacity-20 hover:border-white-opacity-30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:backdrop-blur-xl rounded-[40px] h-16 px-8",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:scale-[1.02] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:border-primary/50 hover:shadow-[0_0_15px_rgba(19,245,132,0.2)] hover:bg-accent/50 hover:text-accent-foreground hover:scale-[1.02] dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-[0_0_15px_rgba(19,245,132,0.15)] hover:scale-[1.01]",
        ghost:
          "hover:bg-primary/10 hover:text-primary dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline hover:drop-shadow-[0_0_8px_rgba(19,245,132,0.6)]",
        surface: "btn-surface rounded-[32px]",
        "watch-demo": "!rounded-[40px] bg-[var(--neutral-neutral-210)] text-light-gray hover:text-white hover:bg-primary/20 hover:border-primary/30 hover:border hover:shadow-[0_0_20px_rgba(19,245,132,0.25)] transition-all",
      },
      size: {
        default: "h-9 sm:h-10 px-3 sm:px-4 py-2 has-[>svg]:px-2.5 sm:has-[>svg]:px-3 min-h-[36px] sm:min-h-[40px]",
        sm: "h-8 sm:h-9 rounded-md gap-1.5 px-2.5 sm:px-3 has-[>svg]:px-2 sm:has-[>svg]:px-2.5 min-h-[32px] sm:min-h-[36px]",
        lg: "h-10 sm:h-11 md:h-12 rounded-md px-5 sm:px-6 has-[>svg]:px-3.5 sm:has-[>svg]:px-4 min-h-[40px] sm:min-h-[44px] md:min-h-[48px]",
        icon: "size-9 sm:size-10",
        "icon-sm": "size-8 sm:size-9",
        "icon-lg": "size-10 sm:size-11 md:size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
