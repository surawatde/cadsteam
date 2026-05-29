"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FilterValue = {
  pricing: "all" | "free" | "paid";
  deployment: "all" | "offline" | "web";
  category:
    | "all"
    | "Inspection"
    | "Reverse Engineering"
    | "Post-Processor"
    | "CAD";
};

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs font-medium tracking-[0.16em] text-foreground/60 uppercase">
        {label}
      </div>
      <div
        data-slot="button-group"
        className="inline-flex flex-wrap items-center gap-1.5 rounded-2xl border border-white/20 bg-white/35 p-1.5 backdrop-blur dark:border-white/10 dark:bg-white/5"
      >
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <Button
              key={option.value}
              type="button"
              variant={selected ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "rounded-xl px-3",
                selected
                  ? "bg-white/70 text-foreground shadow-[0_0_0_1px_rgba(0,240,255,0.18)] dark:bg-white/10"
                  : "text-foreground/80"
              )}
              onClick={() => {
                onChange(option.value);
              }}
            >
              {option.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const filters: FilterValue = {
    pricing: (searchParams.get("pricing") as FilterValue["pricing"]) ?? "all",
    deployment:
      (searchParams.get("deployment") as FilterValue["deployment"]) ?? "all",
    category: (searchParams.get("category") as FilterValue["category"]) ?? "all",
  };

  function updateFilter(key: keyof FilterValue, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const next = params.toString();
    startTransition(() => {
      router.replace(next ? `${pathname}?${next}` : pathname);
    });
  }

  return (
    <div className={cn("mt-8 grid gap-4 sm:grid-cols-3", pending && "opacity-80")}>
      <FilterGroup
        label="Pricing"
        value={filters.pricing}
        onChange={(value) => {
          updateFilter("pricing", value);
        }}
        options={[
          { value: "all", label: "All" },
          { value: "free", label: "Free" },
          { value: "paid", label: "Paid" },
        ]}
      />
      <FilterGroup
        label="Deployment"
        value={filters.deployment}
        onChange={(value) => {
          updateFilter("deployment", value);
        }}
        options={[
          { value: "all", label: "All" },
          { value: "offline", label: "Offline" },
          { value: "web", label: "Web-based" },
        ]}
      />
      <FilterGroup
        label="Category"
        value={filters.category}
        onChange={(value) => {
          updateFilter("category", value);
        }}
        options={[
          { value: "all", label: "All" },
          { value: "Inspection", label: "Inspection" },
          { value: "Reverse Engineering", label: "Reverse Engineering" },
          { value: "Post-Processor", label: "Post-Processor" },
          { value: "CAD", label: "CAD" },
        ]}
      />
    </div>
  );
}

