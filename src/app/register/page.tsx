import Link from "next/link";

import { GlassPanel } from "@/components/glass-panel";
import { ButtonLink } from "@/components/button-link";
import { RegisterForm } from "@/components/auth/register-form";

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

export default async function RegisterPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : undefined;
  const error = pickParam(params, "error");

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 py-14">
      <GlassPanel className="w-full max-w-md p-8">
        <div className="font-heading text-2xl font-semibold text-foreground">
          Register
        </div>
        <div className="mt-2 text-sm text-foreground/70">
          Create an account to manage your licenses.
        </div>

        {error ? (
          <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-foreground">
            {error}
          </div>
        ) : null}

        <RegisterForm />

        <div className="mt-6 flex items-center justify-between text-sm text-foreground/70">
          <Link href="/login" className="hover:underline">
            Already have an account?
          </Link>
          <ButtonLink href="/products" variant="ghost" size="sm">
            Explore Tools
          </ButtonLink>
        </div>
      </GlassPanel>
    </div>
  );
}
