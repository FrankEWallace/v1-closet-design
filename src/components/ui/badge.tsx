import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-body tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow",
        outline: "text-foreground border border-border",
        status: "border border-border bg-background text-muted-foreground uppercase",
        season: "bg-sand text-foreground/80 uppercase",
        sustainability: "bg-sage text-foreground/80",
        clean: "bg-sage/50 text-foreground/70 uppercase",
        dirty: "bg-dusty-rose/50 text-foreground/70 uppercase",
        laundry: "bg-accent text-foreground/70 uppercase",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
