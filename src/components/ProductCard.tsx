// src/components/ProductCard.tsx

import Link from "next/link";
import Image from "next/image";
import { Product } from "../types/product";
import { urlFor } from "../lib/sanity";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(400).height(400).url()
    : "/placeholder.jpg";

  return (
    <Link href={`/shop/${product.slug.current}`} className="group block">
      <div className="overflow-hidden rounded-[1.5rem] border border-[#ebdfd1] bg-white shadow-[0_10px_30px_-20px_rgba(63,52,45,0.35)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(63,52,45,0.35)]">
        <div className="relative aspect-square overflow-hidden bg-[#f7efe7]">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-5">
          <h3 className="mb-1 text-lg font-semibold text-[#2f261f]">
            {product.name}
          </h3>

          {product.material && (
            <p className="mb-2 text-sm text-[#8b7563]">{product.material}</p>
          )}

          <p className="text-xl font-semibold text-[#3f342d]">
            €{product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}
