"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(raf);
  }, []);

  const ActiveIcon = useMemo(() => {
    if (resolvedTheme === "dark") return Moon;
    return Sun;
  }, [resolvedTheme]);

  if (!mounted) {
    return (
      <div
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "border-border/70 bg-transparent backdrop-blur"
        )}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        buttonVariants({ variant: "outline", size: "icon" }),
        "border-border/70 bg-transparent backdrop-blur transition hover:border-[color:var(--holo-cyan)]/60"
      )}
    >
      <motion.div
        key={resolvedTheme}
        initial={{ rotate: -30, opacity: 0.4 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      >
        <ActiveIcon className="size-4" />
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
