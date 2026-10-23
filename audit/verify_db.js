const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verify() {
  const categories = await prisma.category.count();
  const products = await prisma.product.count();
  const variants = await prisma.productVariant.count();
  const images = await prisma.productImage.count();
  const inventory = await prisma.inventoryItem.count();
  const discounts = await prisma.discount.count();
  const reviews = await prisma.review.count();

  console.log('--- PostgreSQL Database Verification ---');
  console.log('Categories in DB:', categories);
  console.log('Products in DB:', products);
  console.log('Variants in DB:', variants);
  console.log('Images in DB:', images);
  console.log('Inventory Items in DB:', inventory);
  console.log('Discounts in DB:', discounts);
  console.log('Reviews in DB:', reviews);

  const sample = await prisma.product.findFirst({
    where: { handle: '6in-mini-bike-roller-kit' },
    include: { variants: true, images: true, category: true }
  });
  console.log('\nSample Product from PostgreSQL:');
  console.log('Title:', sample?.title);
  console.log('Category:', sample?.category?.name);
  console.log('Variants:', sample?.variants?.map(v => `${v.title} ($${v.price})`));

  await prisma.$disconnect();
}
verify();
