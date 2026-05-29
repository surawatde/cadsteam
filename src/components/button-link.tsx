import type { ComponentProps, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";

import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ButtonLink({
  className,
  size,
  variant,
  children,
  ...props
}: ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants> & { className?: string; children: ReactNode }) {
  return (
    <Link
      {...props}
      className={cn(buttonVariants({ variant, size, className }))}
    >
      {children}
    </Link>
  );
}
