const fs = require('fs');
const html = fs.readFileSync('audit/homepage.html', 'utf8');
const main = html.match(/<main id="MainContent"[^>]*>([\s\S]*?)<\/main>/i);
if (main) {
  fs.writeFileSync('audit/main.html', main[1]);
  console.log('Saved main.html with length', main[1].length);
}
