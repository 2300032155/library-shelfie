import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all duration-300",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:shadow-md",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-300",
        ghost: "hover:bg-accent hover:text-accent-foreground transition-all duration-300",
        link: "text-primary underline-offset-4 hover:underline transition-all duration-300",
        hero: "shine-effect bg-gradient-to-r from-library-blue to-library-blue-light text-white hover:shadow-xl hover:shadow-library-blue/25 transition-all duration-500 font-semibold transform hover:scale-105",
        amber: "bg-library-amber text-foreground hover:bg-library-amber/90 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-library-amber/25",
        success: "bg-library-success text-white hover:bg-library-success/90 transition-all duration-300 hover:shadow-lg hover:shadow-library-success/25",
        warning: "bg-library-warning text-foreground hover:bg-library-warning/90 transition-all duration-300",
        glass: "glass hover:bg-white/90 text-library-blue border-library-blue/20 hover:shadow-xl transition-all duration-500",
        premium: "bg-gradient-to-r from-library-amber via-library-blue to-library-amber-light text-white font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-shimmer",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
