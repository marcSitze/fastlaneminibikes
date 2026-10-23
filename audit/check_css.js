async function check() {
  const res = await fetch('http://localhost:3001/');
  const html = await res.text();
  const cssMatches = [...html.matchAll(/<link[^>]+href="([^"]+\.css)"/g)];
  console.log('CSS links found:', cssMatches.map(m => m[1]));
  for (const match of cssMatches) {
    const cssRes = await fetch('http://localhost:3001' + match[1]);
    const cssText = await cssRes.text();
    console.log('CSS file', match[1], 'length:', cssText.length);
    console.log('First 300 chars:', cssText.slice(0, 300));
  }
}
check();
