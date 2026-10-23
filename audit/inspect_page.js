const fs = require('fs');
const html = fs.readFileSync('audit/homepage.html', 'utf8');

// Find main content
const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
if (mainMatch) {
  const main = mainMatch[1];
  console.log('Main length:', main.length);

  // Look for text and links inside main
  const links = [...main.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
  console.log('\nMain links:');
  links.forEach(l => {
    console.log(' ', l[1], '-->', l[2].replace(/<[^>]+>/g, '').trim().slice(0, 50));
  });

  // Extract Shogun or custom content
  const shogunTitles = [...main.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)];
  console.log('\nMain headings:');
  shogunTitles.forEach(t => console.log(' ', t[1].replace(/<[^>]+>/g, '').trim()));
}

// Let's also check header HTML structure
const headerMatch = html.match(/<header[^>]*>([\s\S]*?)<\/header>/i);
if (headerMatch) {
  console.log('\nHeader HTML found. Length:', headerMatch[1].length);
  const headerLinks = [...headerMatch[1].matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
  headerLinks.forEach(l => {
    console.log(' Header link:', l[1], '-->', l[2].replace(/<[^>]+>/g, '').trim());
  });
}

// Check footer HTML structure
const footerMatch = html.match(/<footer[^>]*>([\s\S]*?)<\/footer>/i);
if (footerMatch) {
  console.log('\nFooter HTML found. Length:', footerMatch[1].length);
  const footerLinks = [...footerMatch[1].matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
  footerLinks.forEach(l => {
    console.log(' Footer link:', l[1], '-->', l[2].replace(/<[^>]+>/g, '').trim());
  });
}
