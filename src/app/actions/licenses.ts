"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/utils/supabase/server";

function randomBlock() {
  return Math.random().toString(36).slice(2, 6).toUpperCase();
}

function makeDemoKey() {
  return `DEMO-${randomBlock()}-${randomBlock()}`;
}

export async function generateDemoLicenseAction() {
  const supabase = await createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    redirect("/login");
  }

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id")
    .limit(3);

  if (productsError || !products || products.length === 0) {
    redirect(
      `/dashboard?error=${encodeURIComponent(
        productsError?.message ?? "No products available"
      )}`
    );
  }

  const picked = products[Math.floor(Math.random() * products.length)];
  const now = new Date();
  const due = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const { error: insertError } = await supabase.from("licenses").insert({
    user_id: userData.user.id,
    product_id: picked.id,
    license_key: makeDemoKey(),
    status: "active",
    last_checkin_date: now.toISOString(),
    next_checkin_due: due.toISOString(),
  });

  if (insertError) {
    const message = insertError.message.toLowerCase().includes("row-level security")
      ? "Database policy blocks creating licenses. Add an INSERT policy for authenticated users on public.licenses."
      : insertError.message;

    redirect(`/dashboard?error=${encodeURIComponent(message)}`);
  }

  redirect("/dashboard");
}

export type SyncLicenseTokenResult =
  | { ok: true }
  | { ok: false; error: string };

export async function syncLicenseTokenAction(
  licenseId: string
): Promise<SyncLicenseTokenResult> {
  const supabase = await createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    return { ok: false, error: "Unauthorized" };
  }

  const now = new Date();
  const due = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const { error } = await supabase
    .from("licenses")
    .update({
      last_checkin_date: now.toISOString(),
      next_checkin_due: due.toISOString(),
    })
    .eq("id", licenseId)
    .eq("user_id", userData.user.id);

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/dashboard");
  return { ok: true };
}
