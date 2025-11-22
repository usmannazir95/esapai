import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import { ProductPage } from "@/components/pages/product/product-page";

interface ProductSlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductSlugPage({ params }: ProductSlugPageProps) {
  const { slug } = await params;
  const productData = getProductBySlug(slug);

  if (!productData) {
    notFound();
  }

  // Extract content configurations with fallbacks
  return (
    <main className="relative">
      <ProductPage slug={slug} initialProduct={productData} />
    </main>
  );
}
