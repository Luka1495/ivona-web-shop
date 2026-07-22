import Link from "next/link";
import { getAllProducts } from "@/lib/sanity";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

export const revalidate = 60;

export default async function ShopPage() {
  const products: Product[] = await getAllProducts();

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
