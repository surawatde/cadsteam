"use server";

import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/utils/supabase/server";

export async function createProductAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const price = String(formData.get("price") ?? "").trim();
  const pricingType = String(formData.get("pricing_type") ?? "").trim();
  const deploymentType = String(formData.get("deployment_type") ?? "").trim();
  const imageUrl = String(formData.get("image_url") ?? "").trim();

  if (!title || !category || !price || !pricingType || !deploymentType) {
    redirect("/admin/products?error=Missing%20required%20fields");
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const isAdmin =
    Boolean(user) &&
    Boolean(adminEmail) &&
    user?.email?.toLowerCase() === adminEmail?.toLowerCase();

  if (!isAdmin) {
    redirect("/dashboard");
  }

  const { error } = await supabase.from("products").insert({
    title,
    description: description ? description : null,
    category,
    price,
    pricing_type: pricingType,
    deployment_type: deploymentType,
    image_url: imageUrl ? imageUrl : null,
  });

  if (error) {
    redirect(`/admin/products?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/products?notice=Product%20created");
}

