const fs = require('fs');

// Inspect collections_all.html
const collHtml = fs.readFileSync('audit/collections_all.html', 'utf8');

console.log('--- COLLECTIONS / ALL ---');
// Title
const titleMatch = collHtml.match(/<title>([\s\S]*?)<\/title>/i);
console.log('Title:', titleMatch ? titleMatch[1].trim() : '');

// Header / banner inside collection
const collTitle = collHtml.match(/<header[^>]*class="[^"]*collection-header[^"]*"[^>]*>([\s\S]*?)<\/header>/i);
if (collTitle) console.log('Collection Header:', collTitle[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

// Filters / Sorting
const filters = [...collHtml.matchAll(/<select[^>]*name="SortBy"[^>]*>([\s\S]*?)<\/select>/gi)];
if (filters.length > 0) {
  const options = [...filters[0][1].matchAll(/<option[^>]*value="([^"]*)"[^>]*>([\s\S]*?)<\/option>/gi)];
  console.log('Sort options:');
  options.forEach(o => console.log(' ', o[1], '->', o[2].trim()));
}

// Check tag filters / category filters
const tagFilters = [...collHtml.matchAll(/<select[^>]*name="[Bb]rowse[Bb]y"[^>]*>([\s\S]*?)<\/select>/gi)];
console.log('BrowseBy filters count:', tagFilters.length);

// Product grid items in collections
const gridItems = [...collHtml.matchAll(/class="[^"]*grid-view-item[^"]*"[\s\S]*?class="[^"]*grid-view-item__title[^"]*"[^>]*>([\s\S]*?)<\/div>/gi)];
console.log('Collection grid items found:', gridItems.length);

// Inspect product detail
console.log('\n--- PRODUCT DETAIL: Frame and Fork ---');
const prodHtml = fs.readFileSync('audit/product_the-357-mini-bike-frame-and-fork.html', 'utf8');
const pTitle = prodHtml.match(/<h1[^>]*class="[^"]*product-single__title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i);
console.log('Product title:', pTitle ? pTitle[1].trim() : 'not found');

const pPrice = prodHtml.match(/class="[^"]*product__price[^"]*"[^>]*>([\s\S]*?)<\/span>/i);
console.log('Product price element:', pPrice ? pPrice[1].replace(/<[^>]+>/g, '').trim() : 'not found');

// Variant selectors
const variantSelectors = [...prodHtml.matchAll(/<select[^>]*id="SingleOptionSelector-[^"]*"[^>]*>([\s\S]*?)<\/select>/gi)];
console.log('Variant selectors count:', variantSelectors.length);
variantSelectors.forEach((vs, idx) => {
  const opts = [...vs[1].matchAll(/<option[^>]*value="([^"]*)"[^>]*>([\s\S]*?)<\/option>/gi)];
  console.log(` Variant selector ${idx}:`, opts.map(o => o[1]));
});

// Description
const descMatch = prodHtml.match(/class="[^"]*product-single__description[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
if (descMatch) {
  console.log('Description preview:', descMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200));
}
