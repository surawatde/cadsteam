"use client";

import { MenuIcon } from "lucide-react";

import { logoutAction } from "@/app/actions/auth";
import { ButtonLink } from "@/components/button-link";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Labels = {
  exploreTools: string;
  dashboard: string;
  myLibrary: string;
  login: string;
  register: string;
  logout: string;
  menu: string;
};

export function MobileNav({
  isAuthed,
  isAdmin,
  labels,
}: {
  isAuthed: boolean;
  isAdmin: boolean;
  labels: Labels;
}) {
  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "sm:hidden border-border/70 bg-transparent backdrop-blur transition hover:border-[color:var(--holo-cyan)]/60"
        )}
      >
        <MenuIcon className="size-4" />
        <span className="sr-only">Open menu</span>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="border-white/20 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-[#0B132B]/75"
      >
        <SheetHeader className="px-6 pt-6">
          <SheetTitle>{labels.menu}</SheetTitle>
        </SheetHeader>

        <div className="px-6 pb-6">
          <div className="mt-2 grid gap-2">
            <ButtonLink href="/products" variant="ghost" size="lg" className="justify-start">
              {labels.exploreTools}
            </ButtonLink>

            {isAuthed ? (
              <>
                <ButtonLink href="/dashboard" variant="ghost" size="lg" className="justify-start">
                  {labels.dashboard}
                </ButtonLink>
                {isAdmin ? (
                  <ButtonLink
                    href="/admin/products"
                    variant="ghost"
                    size="lg"
                    className="justify-start"
                  >
                    Admin
                  </ButtonLink>
                ) : null}
              </>
            ) : (
              <ButtonLink href="/login" variant="ghost" size="lg" className="justify-start">
                {labels.myLibrary}
              </ButtonLink>
            )}
          </div>

          <div className="mt-6 border-t border-white/15 pt-4 dark:border-white/10">
            {isAuthed ? (
              <form action={logoutAction}>
                <button
                  type="submit"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "w-full justify-start"
                  )}
                >
                  {labels.logout}
                </button>
              </form>
            ) : (
              <div className="grid gap-2">
                <ButtonLink href="/login" variant="outline" size="lg" className="justify-start">
                  {labels.login}
                </ButtonLink>
                <ButtonLink href="/register" variant="ghost" size="lg" className="justify-start">
                  {labels.register}
                </ButtonLink>
              </div>
            )}
          </div>

          <div className="mt-6 text-xs text-foreground/60">
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
