"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useCallback } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ProductCardProps = {
  title: string;
  category: string;
  price: string;
};

export function ProductCard({ title, category, price }: ProductCardProps) {
  const sweepControls = useAnimationControls();
  const slashIndex = price.indexOf("/");
  const priceMain = slashIndex >= 0 ? price.slice(0, slashIndex) : price;
  const priceSuffix = slashIndex >= 0 ? price.slice(slashIndex) : null;

  const onHoverStart = useCallback(() => {
    void sweepControls.start({
      opacity: 1,
      y: ["-40%", "140%"],
      transition: { duration: 1.25, ease: "linear", repeat: Infinity },
    });
  }, [sweepControls]);

  const onHoverEnd = useCallback(() => {
    void sweepControls.start({
      opacity: 0,
      y: "-40%",
      transition: { duration: 0.2 },
    });
  }, [sweepControls]);

  return (
    <motion.div
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/55 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0"
        animate={{ opacity: 1 }}
      >
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(60%_60%_at_50%_0%,rgba(0,240,255,0.18),transparent_55%),radial-gradient(60%_60%_at_30%_80%,rgba(255,87,34,0.10),transparent_55%)]" />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-x-0 -top-24 h-24 opacity-0"
        animate={sweepControls}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,240,255,0.45), rgba(255,87,34,0.18), transparent)",
          filter: "blur(10px)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 -top-1 h-1 opacity-0"
        animate={sweepControls}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,240,255,0.9), rgba(255,87,34,0.45), transparent)",
          boxShadow:
            "0 0 18px rgba(0,240,255,0.28), 0 0 28px rgba(255,87,34,0.14)",
        }}
      />

      <div className="relative p-6">
        <Badge
          variant="outline"
          className="border-white/30 bg-white/25 text-foreground/80 dark:border-white/15 dark:bg-white/5"
        >
          {category}
        </Badge>
        <div className="mt-4 font-heading text-xl font-semibold text-foreground">
          {title}
        </div>
        <div className="mt-2 text-sm text-foreground/70">
          <span className="tabular-nums">{priceMain}</span>
          {priceSuffix ? (
            <span className="ml-1 text-xs text-foreground/55">{priceSuffix}</span>
          ) : null}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <Button
            className={cn(
              "h-10 bg-[color:var(--holo-cyan)] text-[#041018] shadow-[0_0_0_1px_rgba(0,240,255,0.25),0_18px_44px_rgba(0,240,255,0.10)] hover:bg-[color:var(--holo-cyan)]/90",
              "group-hover:shadow-[0_0_0_1px_rgba(0,240,255,0.30),0_20px_52px_rgba(0,240,255,0.16)]"
            )}
          >
            Get License
          </Button>
          <div className="h-10 flex-1 rounded-full border border-white/25 bg-white/20 dark:border-white/10 dark:bg-white/5" />
        </div>
      </div>
    </motion.div>
  );
}
