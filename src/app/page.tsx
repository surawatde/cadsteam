import { ButtonLink } from "@/components/button-link";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:py-20">
      <div className="relative overflow-hidden rounded-[28px] border border-white/20 bg-white/55 p-8 shadow-[0_0_0_1px_rgba(0,240,255,0.12),0_30px_90px_rgba(0,0,0,0.22)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-12">
        <div className="absolute inset-0 opacity-70 [background:radial-gradient(60%_60%_at_20%_10%,rgba(0,240,255,0.22),transparent_55%),radial-gradient(60%_60%_at_80%_60%,rgba(255,87,34,0.12),transparent_55%)]" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/50 px-3 py-1 text-xs tracking-[0.22em] text-foreground/80 backdrop-blur dark:border-white/10 dark:bg-white/5">
            <span className="size-1.5 rounded-full bg-[color:var(--holo-cyan)] shadow-[0_0_14px_rgba(0,240,255,0.55)]" />
            {t("badge")}
          </div>

          <h1 className="mt-6 font-heading text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-6xl">
            {t("headline")}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/75 sm:text-lg">
            {t("subheadline")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink
              href="/products"
              size="lg"
              className="h-11 bg-[color:var(--holo-cyan)] text-[#041018] shadow-[0_0_0_1px_rgba(0,240,255,0.3),0_18px_44px_rgba(0,240,255,0.12)] hover:bg-[color:var(--holo-cyan)]/90"
            >
              {t("primaryCta")}
            </ButtonLink>
            <ButtonLink
              href="/dashboard"
              variant="outline"
              size="lg"
              className="h-11 border-white/30 bg-white/30 backdrop-blur hover:bg-white/40 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10"
            >
              {t("secondaryCta")}
            </ButtonLink>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                k: t("feature1Title"),
                v: t("feature1Body"),
              },
              {
                k: t("feature2Title"),
                v: t("feature2Body"),
              },
              {
                k: t("feature3Title"),
                v: t("feature3Body"),
              },
            ].map((item) => (
              <div
                key={item.k}
                className="rounded-2xl border border-white/25 bg-white/40 p-4 text-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
              >
                <div className="font-medium text-foreground">{item.k}</div>
                <div className="mt-1 text-foreground/70">{item.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
