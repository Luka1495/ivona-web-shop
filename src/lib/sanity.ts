// src/lib/sanity.ts

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImage } from "../types/product";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

// Helper funkcije za dohvaćanje podataka
export async function getAllProducts() {
  return client.fetch(`
    *[_type == "product" && inStock == true] | order(_createdAt desc) {
      _id,
      name,
      slug,
      images,
      price,
      category,
      material,
      featured,
      inStock
    }
  `);
}

export async function getFeaturedProducts() {
  return client.fetch(`
    *[_type == "product" && featured == true && inStock == true] {
      _id,
      name,
      slug,
      images,
      price,
      category,
      material
    }
  `);
}

export async function getProductBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      images,
      price,
      description,
      category,
      material,
      sizes,
      inStock
    }
  `,
    { slug }
  );
}

export async function getProductsByCategory(category: string) {
  return client.fetch(
    `
    *[_type == "product" && category == $category && inStock == true] | order(_createdAt desc) {
      _id,
      name,
      slug,
      images,
      price,
      category,
      material,
      featured,
      inStock
    }
  `,
    { category }
  );
}
