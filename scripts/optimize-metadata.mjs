import fs from 'node:fs';
import path from 'node:path';

const docs = path.resolve('docs');
const base = 'https://knowledge.tiannahowardadventures.com';

const labels = {
  '/author/': ['M.L. Woodward'],
  '/series/': ['Series'],
  '/books/': ['Books'],
  '/books/beale-treasure/': ['Books', 'Tianna and the Mystery of the Beale Treasure'],
  '/books/mask-of-a-faun/': ['Books', 'Tianna and Michelangelo’s Mask of a Faun'],
  '/books/lost-inca-gold/': ['Books', 'Tianna and the Lost Inca Gold'],
  '/books/vanishing-crown-jewels/': ['Books', 'Tianna and the Vanishing Crown Jewels'],
  '/history/': ['History'],
  '/history/beale-ciphers/': ['History', 'The Beale Ciphers'],
  '/history/michelangelo-mask-of-a-faun/': ['History', 'Michelangelo’s Mask of a Faun'],
  '/history/atahualpa-ransom/': ['History', 'Atahualpa’s Ransom'],
  '/reading-guides/': ['Reading guides'],
  '/reading-guides/historical-mysteries-ages-11-14/': ['Reading guides', 'Historical Mystery Books for Readers Aged 11–14'],
  '/reading-guides/adventures-based-on-real-history/': ['Reading guides', 'Middle-Grade Adventures Based on Real Unsolved History'],
  '/reading-guides/best-middle-grade-historical-mysteries/': ['Reading guides', 'Best Middle Grade Historical Mystery Books Compared']
};

function pageUrl(file) {
  const relative = path.relative(docs, file).replaceAll(path.sep, '/');
  if (relative === 'index.html') return '/';
  if (relative === '404.html') return '/404/';
  return `/${relative.replace(/index\.html$/, '')}`;
}

function metaContent(html, kind, key) {
  const pattern = new RegExp(`<meta ${kind}="${key}" content="([^"]*)">`);
  return html.match(pattern)?.[1] ?? '';
}

function addMetadata(html, is404) {
  if (!html.includes('name="robots"')) {
    const robots = is404 ? 'noindex,follow' : 'index,follow,max-image-preview:large';
    html = html.replace(/(<link rel="canonical"[^>]*>)/, `$1\n  <meta name="robots" content="${robots}">`);
  }
  if (is404) return html;

  const title = metaContent(html, 'property', 'og:title');
  const description = metaContent(html, 'property', 'og:description');
  const additions = [
    !html.includes('property="og:site_name"') ? '  <meta property="og:site_name" content="Tianna Howard Adventures">' : '',
    !html.includes('property="og:locale"') ? '  <meta property="og:locale" content="en_GB">' : '',
    !html.includes('name="twitter:card"') ? '  <meta name="twitter:card" content="summary">' : '',
    !html.includes('name="twitter:title"') ? `  <meta name="twitter:title" content="${title}">` : '',
    !html.includes('name="twitter:description"') ? `  <meta name="twitter:description" content="${description}">` : ''
  ].filter(Boolean).join('\n');

  if (additions) html = html.replace(/(<meta property="og:url"[^>]*>)/, `$1\n${additions}`);
  return html;
}

function addStructuredData(html, urlPath) {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!match) return html;
  const data = JSON.parse(match[1]);
  const graph = data['@graph'] ?? [];

  if (urlPath === '/author/' && !graph.some(item => item['@type'] === 'ProfilePage')) {
    graph.unshift({
      '@type': 'ProfilePage',
      '@id': `${base}/author/#profile-page`,
      url: `${base}/author/`,
      name: 'M.L. Woodward',
      mainEntity: { '@id': `${base}/author/#author` },
      isPartOf: { '@id': `${base}/#website` },
      dateModified: '2026-09-12'
    });
  }

  const crumbs = labels[urlPath];
  if (crumbs && !graph.some(item => item['@type'] === 'BreadcrumbList')) {
    const parts = ['Home', ...crumbs];
    const itemListElement = parts.map((name, index) => {
      let item = `${base}/`;
      if (index > 0) {
        if (crumbs.length === 1) item = `${base}${urlPath}`;
        else if (index === 1) item = `${base}/${urlPath.split('/').filter(Boolean)[0]}/`;
        else item = `${base}${urlPath}`;
      }
      return { '@type': 'ListItem', position: index + 1, name, item };
    });
    graph.push({ '@type': 'BreadcrumbList', itemListElement });
  }

  data['@graph'] = graph;
  return html.replace(match[0], `<script type="application/ld+json">${JSON.stringify(data)}</script>`);
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

for (const file of walk(docs).filter(file => file.endsWith('.html'))) {
  const urlPath = pageUrl(file);
  let html = fs.readFileSync(file, 'utf8');
  html = addMetadata(html, urlPath === '/404/');
  if (urlPath !== '/' && urlPath !== '/404/') html = addStructuredData(html, urlPath);
  fs.writeFileSync(file, html);
}

const sitemapPath = path.join(docs, 'sitemap.xml');
const sitemap = fs.readFileSync(sitemapPath, 'utf8').replace(/<lastmod>[^<]+<\/lastmod>/g, '<lastmod>2026-09-12</lastmod>');
fs.writeFileSync(sitemapPath, sitemap);
