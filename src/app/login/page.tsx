import Link from "next/link";

import { loginAction } from "@/app/actions/auth";
import { GlassPanel } from "@/components/glass-panel";
import { ButtonLink } from "@/components/button-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

export default async function LoginPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : undefined;
  const error = pickParam(params, "error");
  const notice = pickParam(params, "notice");

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 py-14">
      <GlassPanel className="w-full max-w-md p-8">
        <div className="font-heading text-2xl font-semibold text-foreground">
          Login
        </div>
        <div className="mt-2 text-sm text-foreground/70">
          Sign in to access your dashboard.
        </div>

        {notice ? (
          <div className="mt-4 rounded-2xl border border-white/25 bg-white/40 px-4 py-3 text-sm text-foreground/80 backdrop-blur dark:border-white/10 dark:bg-white/5">
            {notice}
          </div>
        ) : null}

        {error ? (
          <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-foreground">
            {error}
          </div>
        ) : null}

        <form action={loginAction} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>

          <Button
            type="submit"
            className="h-11 w-full bg-[color:var(--holo-cyan)] text-[#041018] hover:bg-[color:var(--holo-cyan)]/90"
          >
            Login
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm text-foreground/70">
          <Link href="/register" className="hover:underline">
            Create an account
          </Link>
          <ButtonLink href="/products" variant="ghost" size="sm">
            Explore Tools
          </ButtonLink>
        </div>
      </GlassPanel>
    </div>
  );
}
