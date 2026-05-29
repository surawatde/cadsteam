import { redirect } from "next/navigation";

import { generateDemoLicenseAction } from "@/app/actions/licenses";
import { CircularGauge } from "@/components/dashboard/circular-gauge";
import { SyncTokenButton } from "@/components/dashboard/sync-token-button";
import { GlassPanel } from "@/components/glass-panel";
import { ButtonLink } from "@/components/button-link";
import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { createSupabaseServerClient } from "@/utils/supabase/server";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickParam(
  params: Record<string, string | string[] | undefined> | undefined,
  key: string
): string | undefined {
  const raw = params?.[key];
  if (typeof raw === "string") return raw;
  if (Array.isArray(raw)) return raw[0];
  return undefined;
}

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function daysLeftFromDates(lastCheckin: string | null, due: string | null) {
  const dueDate = due
    ? new Date(due)
    : lastCheckin
      ? new Date(new Date(lastCheckin).getTime() + 30 * 24 * 60 * 60 * 1000)
      : null;

  if (!dueDate) return 0;

  const ms = dueDate.getTime() - Date.now();
  return Math.ceil(ms / (24 * 60 * 60 * 1000));
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : undefined;
  const pageError = pickParam(params, "error");
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: licenses, error } = await supabase
    .from("licenses")
    .select(
      "id,license_key,status,last_checkin_date,next_checkin_due,product:products(title)"
    )
    .eq("user_id", user.id)
    .order("next_checkin_due", { ascending: true });

  const activeLicenses = (licenses ?? []).filter((l) => l.status === "active");
  const activeCount = activeLicenses.length;
  const minDaysLeft =
    activeCount > 0
      ? Math.min(
          ...activeLicenses.map((l) =>
            daysLeftFromDates(l.last_checkin_date, l.next_checkin_due)
          )
        )
      : 0;
  const tokenProgress = clamp01(minDaysLeft / 30);
  const tokenStatus = "Secure";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="font-heading text-3xl font-semibold text-foreground">
            License Control Center
          </div>
          <div className="flex items-center gap-2">
            <form action={generateDemoLicenseAction}>
              <button
                type="submit"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10")}
              >
                Generate Demo License
              </button>
            </form>
          </div>
        </div>

        {pageError ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-foreground">
            {pageError}
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-foreground">
            {error.message}
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <CircularGauge
            label="Active Licenses"
            value={activeCount}
            progress={clamp01(activeCount / 3)}
          />
          <CircularGauge
            label="Offline Token Status"
            value={tokenStatus}
            progress={tokenProgress}
          />
        </div>

        {activeCount === 0 ? (
          <GlassPanel className="p-10 text-center">
            <div className="font-heading text-xl font-semibold text-foreground">
              No active licenses found.
            </div>
            <div className="mt-6 flex justify-center">
              <ButtonLink href="/products" size="lg">
                Explore Tools
              </ButtonLink>
            </div>
          </GlassPanel>
        ) : (
          <GlassPanel className="overflow-hidden p-0">
            <div className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Software Name</TableHead>
                    <TableHead>License Key</TableHead>
                    <TableHead>Next Sync Due</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeLicenses.map((license) => {
                    const daysLeft = daysLeftFromDates(
                      license.last_checkin_date,
                      license.next_checkin_due
                    );
                    const pct = Math.round(clamp01(daysLeft / 30) * 100);
                    const name =
                      typeof license.product === "object" &&
                      license.product &&
                      "title" in license.product
                        ? String((license.product as { title?: string }).title ?? "")
                        : "";

                    return (
                      <TableRow key={license.id}>
                        <TableCell className="font-medium text-foreground">
                          {name || "—"}
                        </TableCell>
                        <TableCell className="font-mono text-foreground/80">
                          {license.license_key}
                        </TableCell>
                        <TableCell className="min-w-56">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-sm text-foreground/80">
                              {`${Math.max(0, daysLeft)} Days Left`}
                            </div>
                          </div>
                          <div className="mt-2">
                            <Progress
                              value={pct}
                              className="gap-0 [&_[data-slot=progress-track]]:bg-white/25 dark:[&_[data-slot=progress-track]]:bg-white/10 [&_[data-slot=progress-indicator]]:bg-[color:var(--holo-cyan)]"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <SyncTokenButton licenseId={license.id} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </GlassPanel>
        )}
      </div>
    </div>
  );
}
