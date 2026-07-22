// src/app/page.tsx

import { getFeaturedProducts, getAllProducts } from "../lib/sanity";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/product";
import Link from "next/link";

export const revalidate = 60; // Revalidate svake minute

export default async function Home() {
  const featuredProducts: Product[] = await getFeaturedProducts();
  const allProducts: Product[] = await getAllProducts();

  // Ako nema featured, uzmi prvih 4
  const displayProducts =
    featuredProducts.length > 0 ? featuredProducts : allProducts.slice(0, 4);

  return (
    <div>
      <section className="px-4 py-20 sm:py-28">
        <div className="container mx-auto rounded-[2rem] border border-[#e9dfd1] bg-white/80 px-6 py-16 text-center shadow-[0_20px_60px_-30px_rgba(63,52,45,0.35)] sm:px-10 lg:px-16">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#b08c64]">
            Ručno izrađen nakit
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-[#2f261f] sm:text-5xl lg:text-6xl">
            Elegantni komadi za svakodnevni i poseban trenutak.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6f6259]">
            Otkrij kolekciju nakita koja spaja jednostavnost, sofisticiranost i
            osobni stil.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center rounded-full bg-[#3f342d] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#2f261f]"
          >
            Pogledaj kolekciju
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-6 sm:py-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-[#2f261f]">
            {featuredProducts.length > 0
              ? "Istaknuti proizvodi"
              : "Naši proizvodi"}
          </h2>
          <Link
            href="/shop"
            className="text-sm font-medium text-[#8b7563] transition hover:text-[#3f342d]"
          >
            Vidi sve →
          </Link>
        </div>

        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-[#e4d8c8] bg-white/70 px-8 py-12 text-center text-[#6f6259]">
            Trenutno nema dostupnih proizvoda.
          </div>
        )}
      </section>

      <section className="px-4 py-16 sm:py-20">
        <div className="container mx-auto rounded-[2rem] border border-[#e9dfd1] bg-[#f7efe7] px-6 py-12 text-center sm:px-10 lg:px-16">
          <h2 className="text-3xl font-semibold text-[#2f261f]">O nakitu</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#6f6259]">
            Svaki komad nastaje s pažnjom, ljepotom i željom da donese osjećaj
            posebnosti. Ručno izrađeni detalji, kvalitetni materijali i
            elegantan dizajn čine ovaj nakit idealnim za one koji vole
            jedinstvene, sofisticirane komade.
          </p>
        </div>
      </section>
    </div>
  );
}
