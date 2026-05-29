"use client";

import Link from "next/link";
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
import { cn } from "@/lib/utils";

export function MobileNav({ isAuthed }: { isAuthed: boolean }) {
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
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="px-6 pb-6">
          <div className="mt-2 grid gap-2">
            <ButtonLink href="/products" variant="ghost" size="lg" className="justify-start">
              Explore Tools
            </ButtonLink>

            {isAuthed ? (
              <ButtonLink href="/dashboard" variant="ghost" size="lg" className="justify-start">
                Dashboard
              </ButtonLink>
            ) : (
              <ButtonLink href="/login" variant="ghost" size="lg" className="justify-start">
                My Library
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
                  Logout
                </button>
              </form>
            ) : (
              <div className="grid gap-2">
                <ButtonLink href="/login" variant="outline" size="lg" className="justify-start">
                  Login
                </ButtonLink>
                <ButtonLink href="/register" variant="ghost" size="lg" className="justify-start">
                  Register
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

