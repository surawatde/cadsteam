import { ProductCard } from "@/components/products/product-card";
import { GlassPanel } from "@/components/glass-panel";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export default async function ProductsPage() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("id,title,category,price,image_url")
    .order("title", { ascending: true });

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14">
      <GlassPanel className="p-8 sm:p-10">
        <div className="font-heading text-3xl font-semibold text-foreground">
          Premium Engineering Tools
        </div>
        <div className="mt-2 max-w-2xl text-sm leading-6 text-foreground/70">
          Specialized solutions for precision manufacturing and design.
        </div>

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
