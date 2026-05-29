import Link from "next/link";

import { logoutAction } from "@/app/actions/auth";
import { ButtonLink } from "@/components/button-link";
import { MobileNav } from "@/components/nav/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export async function Navbar() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 border-b border-white/15 bg-white/55 backdrop-blur-xl dark:border-white/10 dark:bg-[#0B132B]/55">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="group inline-flex items-center gap-2">
            <div className="relative grid size-8 place-items-center rounded-xl border border-white/20 bg-white/40 shadow-[0_0_0_1px_rgba(0,240,255,0.16),0_12px_36px_rgba(0,0,0,0.18)] dark:border-white/10 dark:bg-white/5">
              <div className="size-3.5 rounded-full bg-[color:var(--holo-cyan)] shadow-[0_0_18px_rgba(0,240,255,0.6)]" />
            </div>
            <span className="font-heading text-[15px] tracking-[0.22em] text-foreground/90">
              <span className="text-[color:var(--holo-cyan)] drop-shadow-[0_0_10px_rgba(0,240,255,0.22)]">
                CAD
              </span>
              <span className="text-[color:var(--holo-orange)] drop-shadow-[0_0_10px_rgba(255,87,34,0.18)]">
                STEAM
              </span>
            </span>
          </Link>
          <div className="hidden items-center gap-1.5 sm:flex">
            <ButtonLink
              href="/products"
              variant="ghost"
              size="lg"
              className="px-3"
            >
              Explore Tools
            </ButtonLink>
            {user ? (
              <ButtonLink
                href="/dashboard"
                variant="ghost"
                size="lg"
                className="px-3"
              >
                Dashboard
              </ButtonLink>
            ) : (
              <ButtonLink
                href="/login"
                variant="ghost"
                size="lg"
                className="px-3"
              >
                My Library
              </ButtonLink>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <form action={logoutAction} className="hidden sm:block">
              <button
                type="submit"
                className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "px-3")}
              >
                Logout
              </button>
            </form>
          ) : (
            <div className="hidden items-center gap-1.5 sm:flex">
              <ButtonLink href="/login" variant="ghost" size="lg" className="px-3">
                Login
              </ButtonLink>
              <ButtonLink href="/register" variant="outline" size="lg" className="px-3">
                Register
              </ButtonLink>
            </div>
          )}
          <ThemeToggle />
          <MobileNav isAuthed={Boolean(user)} />
        </div>
      </div>
    </header>
  );
}
