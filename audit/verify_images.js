const fs = require('fs');

async function run() {
  const data = JSON.parse(fs.readFileSync('lib/data/products.json', 'utf8'));
  console.log('Testing products images...');
  const workingImagesByCategory = {};

  for (const p of data.products) {
    const cat = p.category?.handle || 'other';
    if (!workingImagesByCategory[cat]) workingImagesByCategory[cat] = [];

    for (const img of p.images) {
      try {
        const res = await fetch(img.src, { method: 'HEAD' });
        if (res.status === 200) {
          workingImagesByCategory[cat].push({ title: p.title, src: img.src });
          break;
        } else {
          // Try with &format=jpg if not present
          const altSrc = img.src.includes('format=jpg') ? img.src : img.src + (img.src.includes('?') ? '&' : '?') + 'format=jpg';
          const altRes = await fetch(altSrc, { method: 'HEAD' });
          if (altRes.status === 200) {
            img.src = altSrc;
            workingImagesByCategory[cat].push({ title: p.title, src: altSrc });
            break;
          }
        }
      } catch (e) {
        // ignore
      }
    }
  }

  console.log('Working images summary:');
  for (const [cat, imgs] of Object.entries(workingImagesByCategory)) {
    console.log(`- ${cat}: ${imgs.length} working images. First: ${imgs[0]?.src}`);
  }

  fs.writeFileSync('audit/working_images.json', JSON.stringify(workingImagesByCategory, null, 2));
}

run();
