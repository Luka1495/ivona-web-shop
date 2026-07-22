"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/types/product";
import { urlFor } from "@/lib/sanity";
import { useCartStore } from "@/lib/store";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes?.[0],
  );

  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(1200).height(1200).url()
    : "/placeholder.jpg";

  return (
    <div className="container mx-auto px-4 py-16">
      <Link
        href="/shop"
        className="mb-8 inline-block text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        ← Povratak na shop
      </Link>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
        <div className="mx-auto w-full max-w-2xl">
          <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-3 shadow-sm">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-gray-100">
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
            {product.category}
          </p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900">
            {product.name}
          </h1>

          <p className="mt-4 text-xl font-semibold text-gray-900">
            €{product.price.toFixed(2)}
          </p>

          {product.material && (
            <p className="mt-2 text-gray-600">Materijal: {product.material}</p>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
                Veličina
              </p>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      selectedSize === size
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-gray-900"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="mt-8 text-lg leading-8 text-gray-700">
            {product.description ||
              "Ovo je ručno izrađen komad nakita spreman za narudžbu."}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => addItem(product, selectedSize)}
              className="inline-flex cursor-pointer items-center rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Dodaj u košaricu
            </button>

            <Link
              href="/kosarica"
              className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
            >
              Pogledaj košaricu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
