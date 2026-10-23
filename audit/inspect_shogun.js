const fs = require('fs');
const html = fs.readFileSync('audit/homepage.html', 'utf8');

// Shogun content
const shg = html.match(/<div class="shogun-root"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/);
if (shg) {
  console.log('Shogun content found, length:', shg[0].length);
  // find images, links, text
  const imgs = [...shg[0].matchAll(/<img[^>]+(?:src|data-src)="([^"]+)"[^>]*>/gi)];
  console.log('Shogun images count:', imgs.length);
  imgs.forEach((img, i) => console.log(`Img ${i}:`, img[1]));

  const texts = [...shg[0].matchAll(/<(?:p|h1|h2|h3|h4|span|div|a)[^>]*class="[^"]*(?:title|heading|text|btn)[^"]*"[^>]*>([\s\S]*?)<\/(?:p|h1|h2|h3|h4|span|div|a)>/gi)];
  console.log('Texts in shogun:');
  texts.forEach(t => {
    const clean = t[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (clean && clean.length > 2) console.log(' -', clean);
  });
} else {
  console.log('No shogun-root, searching for main innerHTML...');
  const main = html.match(/<main id="MainContent"[^>]*>([\s\S]*?)<\/main>/i);
  if (main) {
    fs.writeFileSync('audit/main_content.html', main[1]);
    console.log('Saved main_content.html', main[1].length);
  }
}
