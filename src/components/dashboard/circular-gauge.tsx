"use client";

import { motion } from "framer-motion";
import { useId, useMemo } from "react";

import { cn } from "@/lib/utils";

export type CircularGaugeProps = {
  label: string;
  value: string | number;
  progress: number;
  className?: string;
};

export function CircularGauge({
  label,
  value,
  progress,
  className,
}: CircularGaugeProps) {
  const gradientId = useId();
  const size = 120;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const clamped = useMemo(() => {
    if (Number.isNaN(progress)) return 0;
    return Math.min(1, Math.max(0, progress));
  }, [progress]);

  const dashOffset = circumference * (1 - clamped);

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-6 rounded-3xl border border-white/20 bg-white/55 px-6 py-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5",
        className
      )}
    >
      <div>
        <div className="text-sm text-foreground/70">{label}</div>
        <div className="mt-1 font-heading text-2xl font-semibold text-foreground">
          {value}
        </div>
      </div>

      <div className="relative grid place-items-center">
        <svg width={size} height={size} className="overflow-visible">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--holo-cyan)" stopOpacity="0.95" />
              <stop
                offset="100%"
                stopColor="var(--holo-orange)"
                stopOpacity="0.65"
              />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="color-mix(in oklab, var(--holo-cyan) 22%, transparent)"
            strokeWidth={stroke}
            fill="transparent"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth={stroke}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            style={{
              filter:
                "drop-shadow(0 0 10px rgba(0,240,255,0.22)) drop-shadow(0 0 12px rgba(255,87,34,0.10))",
            }}
          />
        </svg>
      </div>
    </div>
  );
}
