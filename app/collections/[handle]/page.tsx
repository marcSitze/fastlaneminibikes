import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProducts, getCategories } from "@/lib/repositories/products";
import { CollectionView } from "@/components/collections/collection-view";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const categories = await getCategories();
  const cat = categories.find((c) => c.handle.toLowerCase() === handle.toLowerCase());

  const title = handle === "all" ? "All Products" : cat?.name || "Collection";

  return {
    title: `${title} | Fastlane Mini Bikes`,
    description: `Shop high performance ${title} at Fastlane Mini Bikes. Custom frames, rollers, 212cc parts, and racing accessories.`,
    openGraph: {
      title: `${title} | Fastlane Mini Bikes`,
      description: `Browse ${title} collection. Engineered for speed and durability.`,
    },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  const categories = await getCategories();

  const isAll = handle === "all";
  const currentCategory = categories.find(
    (c) => c.handle.toLowerCase() === handle.toLowerCase()
  );

  if (!isAll && !currentCategory) {
    notFound();
  }

  const { products } = await getProducts({ limit: 100 });

  const title = isAll ? "Products" : currentCategory?.name || "Products";

  return (
    <CollectionView
      initialProducts={products}
      categories={categories}
      currentCategoryHandle={handle}
      collectionTitle={title}
    />
  );
}
