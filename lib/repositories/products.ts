import { prisma } from "@/lib/db/prisma";
import { Product, Category } from "@/lib/types/ecommerce";
import catalogData from "@/lib/data/products.json";

let dbConnectionChecked = false;
let isDbConnected = false;

async function checkDatabaseConnection(): Promise<boolean> {
  if (dbConnectionChecked) return isDbConnected;
  try {
    await Promise.race([
      prisma.product.count(),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 1500)),
    ]);
    isDbConnected = true;
  } catch {
    isDbConnected = false;
  }
  dbConnectionChecked = true;
  return isDbConnected;
}

export async function getCategories(): Promise<Category[]> {
  const hasDb = await checkDatabaseConnection();
  if (hasDb) {
    try {
      const dbCategories = await prisma.category.findMany();
      if (dbCategories.length > 0) {
        return dbCategories.map((c) => ({
          id: c.id,
          name: c.name,
          handle: c.handle,
          description: c.description || undefined,
        }));
      }
    } catch (err) {
      console.warn("Falling back to local category catalog:", err);
    }
  }

  return catalogData.categories;
}

export interface GetProductsOptions {
  category?: string;
  search?: string;
  sort?: "featured" | "best-selling" | "title-asc" | "title-desc" | "price-asc" | "price-desc" | "created-desc";
  featuredOnly?: boolean;
  limit?: number;
  offset?: number;
}

export async function getProducts(options: GetProductsOptions = {}): Promise<{
  products: Product[];
  total: number;
}> {
  const { category, search, sort = "featured", featuredOnly, limit = 50, offset = 0 } = options;

  let all: Product[] = (catalogData.products as Product[]).map((p) => ({ ...p }));

  // Check if DB has products
  const hasDb = await checkDatabaseConnection();
  if (hasDb) {
    try {
      const dbProducts = await prisma.product.findMany({
        include: {
          images: { orderBy: { position: "asc" } },
          variants: true,
          category: true,
        },
      });

      if (dbProducts.length > 0) {
        all = dbProducts.map((p) => {
          const variants = p.variants.map((v) => ({
            id: v.id,
            title: v.title,
            price: Number(v.price),
            comparePrice: v.comparePrice ? Number(v.comparePrice) : null,
            sku: v.sku || undefined,
            available: v.available,
          }));
          const prices = variants.map((v) => v.price);
          return {
            id: p.id,
            title: p.title,
            handle: p.handle,
            description: p.description || "",
            vendor: p.vendor,
            category: {
              name: p.category?.name || "General",
              handle: p.category?.handle || "general",
            },
            isFeatured: p.isFeatured,
            images: p.images.map((img) => ({
              id: img.id,
              src: img.src,
              alt: img.alt || p.title,
            })),
            variants,
            minPrice: prices.length ? Math.min(...prices) : 0,
            maxPrice: prices.length ? Math.max(...prices) : 0,
            rating: 5,
            reviewCount: 12,
          };
        });
      }
    } catch (err) {
      console.warn("DB read error, using local catalog data:", err);
    }
  }

  // Filter by category
  if (category && category !== "all") {
    all = all.filter((p) => p.category?.handle.toLowerCase() === category.toLowerCase());
  }

  // Filter by featured
  if (featuredOnly) {
    all = all.filter((p) => p.isFeatured);
  }

  // Filter by search
  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    all = all.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category?.name.toLowerCase().includes(q) ||
        p.variants.some((v) => v.title.toLowerCase().includes(q) || (v.sku && v.sku.toLowerCase().includes(q)))
    );
  }

  // Sort
  switch (sort) {
    case "price-asc":
      all.sort((a, b) => a.minPrice - b.minPrice);
      break;
    case "price-desc":
      all.sort((a, b) => b.minPrice - a.minPrice);
      break;
    case "title-asc":
      all.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "title-desc":
      all.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "best-selling":
      all.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
      break;
    case "featured":
    default:
      all.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      break;
  }

  const total = all.length;
  const paginated = all.slice(offset, offset + limit);

  return {
    products: paginated,
    total,
  };
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const { products } = await getProducts({ limit: 100 });
  const found = products.find((p) => p.handle === handle);
  return found || null;
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const { products } = await getProducts({ featuredOnly: true, limit });
  if (products.length < limit) {
    const { products: all } = await getProducts({ limit });
    return all.slice(0, limit);
  }
  return products;
}
