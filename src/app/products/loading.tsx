import { GlassPanel } from "@/components/glass-panel";

export default function ProductsLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14">
      <GlassPanel className="p-8 sm:p-10">
        <div className="h-8 w-64 animate-pulse rounded-xl bg-white/40 dark:bg-white/10" />
        <div className="mt-3 h-5 w-96 animate-pulse rounded-xl bg-white/30 dark:bg-white/5" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-56 animate-pulse rounded-3xl border border-white/20 bg-white/40 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
            />
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}

