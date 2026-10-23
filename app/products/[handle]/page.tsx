import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductByHandle, getProducts } from "@/lib/repositories/products";
import { ProductDetailView } from "@/components/products/product-detail-view";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: "Product Not Found | Fastlane Mini Bikes",
    };
  }

  const primaryImage = product.images[0]?.src;

  return {
    title: `${product.title} | Fastlane Mini Bikes`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.title} | Fastlane Mini Bikes`,
      description: product.description.slice(0, 160),
      images: primaryImage ? [{ url: primaryImage }] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const { products: all } = await getProducts({ limit: 8 });
  const relatedProducts = all.filter((p) => p.id !== product.id).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    image: product.images.map((i) => i.src),
    description: product.description,
    brand: {
      "@type": "Brand",
      name: product.vendor || "Fastlane Mini Bikes",
    },
    offers: product.variants.map((v) => ({
      "@type": "Offer",
      price: v.price,
      priceCurrency: "USD",
      availability: v.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      sku: v.sku,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailView product={product} relatedProducts={relatedProducts} />
    </>
  );
}
