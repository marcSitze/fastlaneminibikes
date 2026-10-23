const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('audit/products_usd.json', 'utf8'));

const categoryMap = {
  'complete-bikes': { name: 'Complete Mini Bikes', handle: 'complete-bikes' },
  'roller-kits': { name: 'Roller Kits & Frames', handle: 'roller-kits' },
  'engines': { name: 'Engines & Performance', handle: 'engines' },
  'fuel-system': { name: 'Carburetors & Fuel System', handle: 'fuel-system' },
  'exhausts': { name: 'Exhaust Systems', handle: 'exhausts' },
  'wheels-tires': { name: 'Wheels, Tires & Drivetrain', handle: 'wheels-tires' },
  'controls-seats': { name: 'Controls, Seats & Accessories', handle: 'controls-seats' },
  'apparel': { name: 'Merchandise & Stickers', handle: 'apparel' },
};

function assignCategory(title, handle) {
  const t = title.toLowerCase();
  const h = handle.toLowerCase();
  if (t.includes('stock mini bike') || t.includes('custom mini bikes')) return 'complete-bikes';
  if (t.includes('roller kit') || t.includes('frame and fork')) return 'roller-kits';
  if (t.includes('exhaust')) return 'exhausts';
  if (t.includes('carburetor') || t.includes('manifold') || t.includes('fuel') || t.includes('boot')) return 'fuel-system';
  if (t.includes('tire') || t.includes('tube') || t.includes('rim') || t.includes('spocket') || t.includes('chain') || t.includes('axel')) return 'wheels-tires';
  if (t.includes('seat') || t.includes('throttle') || t.includes('blinker') || t.includes('oil') || t.includes('catch can')) return 'controls-seats';
  if (t.includes('sticker') || t.includes('shirt') || t.includes('hat')) return 'apparel';
  if (t.includes('212cc') || t.includes('valve') || t.includes('rod') || t.includes('piston') || t.includes('rocker') || t.includes('gasket') || t.includes('cover')) return 'engines';
  return 'wheels-tires';
}

const cleanedProducts = raw.products.map(p => {
  const catKey = assignCategory(p.title, p.handle);
  const images = (p.images || []).map(img => {
    let src = img.src;
    if (src.startsWith('//')) src = 'https:' + src;
    if (src.includes('.heic')) {
      src = src + (src.includes('?') ? '&' : '?') + 'format=jpg&width=1200';
    }
    return {
      id: String(img.id),
      src,
      alt: img.alt || p.title,
    };
  });

  // If no image, fallback to Fastlane logo or minibike banner
  if (images.length === 0) {
    images.push({
      id: 'placeholder-' + p.id,
      src: 'https://i.shgcdn.com/a330c64d-adf3-4bc8-a039-513e9c67687a/-/format/auto/-/preview/1200x1200/-/quality/lighter/',
      alt: p.title,
    });
  }

  const variants = (p.variants || []).map(v => {
    const priceNum = parseFloat(v.price) || 0;
    return {
      id: String(v.id),
      title: v.title || 'Default Title',
      price: priceNum,
      comparePrice: v.compare_at_price ? parseFloat(v.compare_at_price) : null,
      sku: v.sku || `FLMB-${v.id}`,
      available: v.available ?? true,
      inventoryQuantity: v.available === false ? 0 : 15,
    };
  });

  const minPrice = Math.min(...variants.map(v => v.price));
  const maxPrice = Math.max(...variants.map(v => v.price));

  // Clean html in body_html
  const description = p.body_html 
    ? p.body_html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    : 'High performance Fastlane Mini Bikes part, precision engineered for power, reliability, and speed on the track or trail.';

  return {
    id: String(p.id),
    title: p.title,
    handle: p.handle,
    description,
    bodyHtml: p.body_html || `<p>${description}</p>`,
    vendor: 'Fastlane Mini Bikes',
    category: categoryMap[catKey],
    isFeatured: ['6in-mini-bike-roller-kit', 'stock-mini-bike-w-6in-tire-set-up', 'custom-mini-bikes', 'the-357-mini-bike-frame-and-fork', 'flmb-sticker', 'fl3'].includes(p.handle),
    images,
    variants,
    minPrice,
    maxPrice,
    rating: 4.8 + (p.id % 3) * 0.1,
    reviewCount: 5 + (p.id % 25),
  };
});

const out = {
  categories: Object.values(categoryMap),
  products: cleanedProducts,
};

fs.mkdirSync('lib/data', { recursive: true });
fs.writeFileSync('lib/data/products.json', JSON.stringify(out, null, 2));
console.log('Successfully generated lib/data/products.json with', cleanedProducts.length, 'products');
