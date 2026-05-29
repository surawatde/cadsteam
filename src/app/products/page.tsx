import { ProductCard } from "@/components/products/product-card";
import { GlassPanel } from "@/components/glass-panel";
import { ProductFilters } from "@/components/products/product-filters";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { getTranslations } from "next-intl/server";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(
  value: string | string[] | undefined
): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const t = await getTranslations("products");
  const params = searchParams ? await searchParams : undefined;
  const pricing = firstParam(params?.pricing);
  const deployment = firstParam(params?.deployment);
  const category = firstParam(params?.category);

  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("products")
    .select("id,title,category,price,image_url,pricing_type,deployment_type")
    .order("title", { ascending: true });

  if (pricing && pricing !== "all") {
    query = query.eq("pricing_type", pricing);
  }

  if (deployment && deployment !== "all") {
    query = query.eq("deployment_type", deployment);
  }

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14">
      <GlassPanel className="p-8 sm:p-10">
        <div className="font-heading text-3xl font-semibold text-foreground">
          {t("header")}
        </div>
        <div className="mt-2 max-w-2xl text-sm leading-6 text-foreground/70">
          {t("subheader")}
        </div>

        <ProductFilters />

        {error ? (
          <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-foreground">
            {error.message}
          </div>
        ) : null}

        {!error && (!data || data.length === 0) ? (
          <div className="mt-8 rounded-2xl border border-white/20 bg-white/40 px-4 py-6 text-sm text-foreground/80 backdrop-blur dark:border-white/10 dark:bg-white/5">
            No products found.
          </div>
        ) : null}

        {data && data.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                category={product.category}
                price={product.price}
              />
            ))}
          </div>
        ) : null}
      </GlassPanel>
    </div>
  );
}
