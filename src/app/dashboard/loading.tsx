import { GlassPanel } from "@/components/glass-panel";

export default function DashboardLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14">
      <div className="space-y-6">
        <div className="h-9 w-72 animate-pulse rounded-xl bg-white/40 dark:bg-white/10" />
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="h-36 animate-pulse rounded-3xl border border-white/20 bg-white/40 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
            />
          ))}
        </div>
        <GlassPanel className="p-6">
          <div className="h-40 animate-pulse rounded-2xl bg-white/30 dark:bg-white/5" />
        </GlassPanel>
      </div>
    </div>
  );
}

