import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ButtonLink({
  className,
  size,
  variant,
  children,
  ...props
}: LinkProps &
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
