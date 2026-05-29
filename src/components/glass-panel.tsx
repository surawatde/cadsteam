import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function GlassPanel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/20 bg-white/55 backdrop-blur-xl dark:border-white/10 dark:bg-white/5",
        className
      )}
      {...props}
    />
  );
}

