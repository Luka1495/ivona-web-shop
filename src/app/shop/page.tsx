import Link from "next/link";
import { getAllProducts, getProductsByCategory } from "@/lib/sanity";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

export const revalidate = 60;

const categories = [
  { label: "Sve", value: "all" },
  { label: "Naušnice", value: "nausnice" },
  { label: "Ogrlice", value: "ogrlice" },
  { label: "Narukvice", value: "narukvice" },
  { label: "Setovi", value: "setovi" },
  { label: "Ostalo", value: "ostalo" },
];

export default async function ShopPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const selectedCategory = params.category ?? "all";

  const products: Product[] =
    selectedCategory === "all"
      ? await getAllProducts()
      : await getProductsByCategory(selectedCategory);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
            Naša kolekcija
          </p>
          <h1 className="text-4xl font-bold text-gray-900">Shop</h1>
          <p className="mt-3 max-w-2xl text-lg text-gray-600">
            Otkrij ručno izrađene komade nakita koji su spremni za tvoju
            narudžbu.
          </p>
        </div>

        <Link
          href="/"
          className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          ← Natrag na naslovnu
        </Link>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((category) => {
          const isActive = selectedCategory === category.value;

          return (
            <Link
              key={category.value}
              href={
                category.value === "all"
                  ? "/shop"
                  : `/shop?category=${category.value}`
              }
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-900 hover:text-gray-900"
              }`}
            >
              {category.label}
            </Link>
          );
        })}
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-8 py-16 text-center">
          <p className="text-lg text-gray-600">
            Trenutno nema proizvoda u ponudi.
          </p>
        </div>
      )}
    </div>
  );
}
