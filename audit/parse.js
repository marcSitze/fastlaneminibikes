const fs = require('fs');
const html = fs.readFileSync('audit/homepage.html', 'utf8');

// announcement bar
const annMatch = html.match(/announcement-bar__message[^>]*>([\s\S]*?)<\/p>/i);
console.log('Announcement bar:', annMatch ? annMatch[1].trim() : 'None');

// navigation links
const navMatches = [...html.matchAll(/class="site-nav__link[^"]*"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)];
console.log('Nav links:');
const seen = new Set();
navMatches.forEach(m => {
  const text = m[2].replace(/<[^>]+>/g, '').trim();
  const link = m[1];
  if (!seen.has(text + link)) {
    seen.add(text + link);
    console.log(' ', text, '->', link);
  }
});

// sections on homepage
const sections = [...html.matchAll(/id="shopify-section-([^"]+)" class="shopify-section([^"]*)"/gi)];
console.log('Sections:');
sections.forEach(s => console.log(' -', s[1], s[2]));

// Find text blocks, headings, h1, h2, h3
const headings = [...html.matchAll(/<(h[1-4])[^>]*>([\s\S]*?)<\/\1>/gi)];
console.log('\nHeadings:');
headings.forEach(h => {
  const text = h[2].replace(/<[^>]+>/g, '').trim();
  if (text) console.log(`[${h[1]}]`, text);
});

// Look for image urls with data-src or src
const imgMatches = [...html.matchAll(/<img[^>]+(?:src|data-src)="([^"]+)"[^>]*alt="([^"]*)"/gi)];
console.log('\nFound images:', imgMatches.length);
imgMatches.slice(0, 20).forEach(m => console.log('  Image:', m[1], '| Alt:', m[2]));

// Look for links
const links = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
const uniqueLinks = new Set();
links.forEach(l => {
  const text = l[2].replace(/<[^>]+>/g, '').trim();
  if (text && !uniqueLinks.has(l[1])) {
    uniqueLinks.add(l[1]);
  }
});
console.log('\nAll unique links in homepage:', [...uniqueLinks]);
