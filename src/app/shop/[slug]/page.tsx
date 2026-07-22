import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/sanity";
import ProductDetailClient from "@/components/ProductDetailClient";

export const revalidate = 60;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
