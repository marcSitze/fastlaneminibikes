import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with Fastlane Mini Bikes data...");

  const dataFilePath = path.join(process.cwd(), "lib", "data", "products.json");
  if (!fs.existsSync(dataFilePath)) {
    console.error("No products.json found at:", dataFilePath);
    return;
  }

  const catalog = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));

  // 1. Seed Categories
  const categoryIdMap = new Map<string, string>();
  for (const cat of catalog.categories) {
    const record = await prisma.category.upsert({
      where: { handle: cat.handle },
      update: { name: cat.name },
      create: {
        name: cat.name,
        handle: cat.handle,
        description: `High performance mini bike ${cat.name} parts and accessories`,
      },
    });
    categoryIdMap.set(cat.handle, record.id);
  }
  console.log(`Seeded ${catalog.categories.length} categories.`);

  // 2. Seed Default Collection
  const allCollection = await prisma.collection.upsert({
    where: { handle: "all" },
    update: { title: "All Products" },
    create: {
      title: "All Products",
      handle: "all",
      description: "Browse our complete catalog of Fastlane Mini Bikes, parts, and accessories.",
      imageUrl: "https://i.shgcdn.com/a330c64d-adf3-4bc8-a039-513e9c67687a/-/format/auto/-/preview/1200x1200/-/quality/lighter/",
    },
  });

  // 3. Seed Products, Images, Variants, Inventory
  let productCount = 0;
  for (const prod of catalog.products) {
    const categoryId = prod.category ? categoryIdMap.get(prod.category.handle) : null;

    const createdProd = await prisma.product.upsert({
      where: { handle: prod.handle },
      update: {
        title: prod.title,
        description: prod.description,
        isFeatured: prod.isFeatured,
        categoryId: categoryId || undefined,
      },
      create: {
        id: prod.id,
        title: prod.title,
        handle: prod.handle,
        description: prod.description,
        vendor: prod.vendor || "Fastlane Mini Bikes",
        productType: prod.category?.name || "Mini Bikes",
        isFeatured: prod.isFeatured || false,
        categoryId: categoryId || undefined,
        collections: {
          connect: { id: allCollection.id },
        },
      },
    });

    // Delete existing images & variants to avoid duplicates on re-seed
    await prisma.productImage.deleteMany({ where: { productId: createdProd.id } });
    await prisma.productVariant.deleteMany({ where: { productId: createdProd.id } });

    // Seed Images
    let pos = 0;
    for (const img of prod.images) {
      await prisma.productImage.create({
        data: {
          productId: createdProd.id,
          src: img.src,
          alt: img.alt || prod.title,
          position: pos++,
        },
      });
    }

    // Seed Variants & Inventory
    for (const v of prod.variants) {
      const variant = await prisma.productVariant.create({
        data: {
          id: v.id,
          productId: createdProd.id,
          title: v.title,
          sku: v.sku,
          price: v.price,
          comparePrice: v.comparePrice,
          available: v.available,
        },
      });

      await prisma.inventoryItem.upsert({
        where: { variantId: variant.id },
        update: { quantity: v.inventoryQuantity ?? 15 },
        create: {
          variantId: variant.id,
          quantity: v.inventoryQuantity ?? 15,
          sku: v.sku,
        },
      });
    }

    // Seed a sample review
    await prisma.review.create({
      data: {
        productId: createdProd.id,
        author: "Racer " + (Math.floor(Math.random() * 900) + 100),
        rating: 5,
        comment: "Excellent quality and fast shipping! Bolted right up to my mini bike with zero issues.",
      },
    });

    productCount++;
  }
  console.log(`Seeded ${productCount} products with variants and inventory.`);

  // 4. Seed Discounts
  await prisma.discount.upsert({
    where: { code: "FASTLANE10" },
    update: {},
    create: {
      code: "FASTLANE10",
      percentOff: 10,
      isActive: true,
    },
  });

  await prisma.discount.upsert({
    where: { code: "MINI20" },
    update: {},
    create: {
      code: "MINI20",
      amountOff: 20.00,
      isActive: true,
    },
  });
  console.log("Seeded promotional discounts (FASTLANE10, MINI20).");

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
