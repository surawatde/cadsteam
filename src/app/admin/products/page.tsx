import { redirect } from "next/navigation";

import { createProductAction } from "@/app/actions/admin-products";
import { GlassPanel } from "@/components/glass-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { cn } from "@/lib/utils";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : undefined;
  const notice = firstParam(params?.notice);
  const error = firstParam(params?.error);

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const isAdmin =
    Boolean(adminEmail) && user.email?.toLowerCase() === adminEmail?.toLowerCase();

  if (!isAdmin) {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14">
      <GlassPanel className="p-8 sm:p-10">
        <div className="font-heading text-3xl font-semibold text-foreground">
          Product Manager
        </div>
        <div className="mt-2 max-w-2xl text-sm leading-6 text-foreground/70">
          Add or update products in the CADSteam catalog.
        </div>

        {notice ? (
          <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-foreground">
            {notice}
          </div>
        ) : null}

        {error ? (
          <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-foreground">
            {error}
          </div>
        ) : null}

        <form action={createProductAction} className="mt-8 grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                required
                className={cn(
                  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                )}
              >
                <option value="Inspection">Inspection</option>
                <option value="Reverse Engineering">Reverse Engineering</option>
                <option value="Post-Processor">Post-Processor</option>
                <option value="CAD">CAD</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className={cn(
                "w-full resize-none rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
              )}
              placeholder="Short product overview"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" required placeholder="$1,200/yr" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pricing_type">Pricing Type</Label>
              <select
                id="pricing_type"
                name="pricing_type"
                required
                className={cn(
                  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                )}
              >
                <option value="paid">Paid</option>
                <option value="free">Free</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="deployment_type">Deployment Type</Label>
              <select
                id="deployment_type"
                name="deployment_type"
                required
                className={cn(
                  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                )}
              >
                <option value="offline">Offline</option>
                <option value="web">Web</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input id="image_url" name="image_url" placeholder="https://..." />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-foreground/60">
              If you see a schema error for description or the new filter fields, run the
              Supabase ALTER TABLE script first.
            </div>
            <Button
              type="submit"
              className="h-11 bg-[color:var(--holo-cyan)] text-[#041018] hover:bg-[color:var(--holo-cyan)]/90"
            >
              Add New Product
            </Button>
          </div>
        </form>
      </GlassPanel>
    </div>
  );
}

