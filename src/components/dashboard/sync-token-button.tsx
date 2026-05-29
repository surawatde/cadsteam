"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { syncLicenseTokenAction } from "@/app/actions/licenses";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SyncTokenButton({ licenseId }: { licenseId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <motion.button
      type="button"
      disabled={pending}
      className={cn(
        buttonVariants({ size: "sm" }),
        "h-8 bg-[color:var(--holo-cyan)] text-[#041018] hover:bg-[color:var(--holo-cyan)]/90 disabled:opacity-60"
      )}
      onClick={() => {
        setError(null);
        startTransition(async () => {
          const result = await syncLicenseTokenAction(licenseId);
          if (!result.ok) {
            setError(result.error);
            return;
          }
          router.refresh();
        });
      }}
      animate={{
        boxShadow: [
          "0 0 0 0 rgba(0,240,255,0.0)",
          "0 0 0 1px rgba(0,240,255,0.25)",
          "0 0 16px rgba(0,240,255,0.18)",
          "0 0 0 0 rgba(0,240,255,0.0)",
        ],
      }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      title={error ?? undefined}
    >
      Sync Token
    </motion.button>
  );
}
