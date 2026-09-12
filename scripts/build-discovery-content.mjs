import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('docs');
const ORIGIN = 'https://knowledge.tiannahowardadventures.com';
const updated = '2026-09-12';

const videos = [
  {
    slug: 'beale-ciphers',
    id: 'PRM6cQdfAwQ',
    title: 'The Beale Ciphers: Real Treasure or Brilliant Hoax?',
    description: 'A concise introduction to the Beale Papers, the one solved cipher and the two numerical codes that remain unsolved.',
    duration: 'PT54S',
    upload: '2026-02-01T22:18:04-08:00',
    eyebrow: 'Codes and disputed treasure',
    summary: 'The Beale Papers describe a supposed nineteenth-century treasure and contain three numerical ciphers. One has been decoded. The other two remain unsolved, while the story behind the papers is disputed.',
    fact: 'No verified Beale treasure has been recovered. The video distinguishes the historical document from the later claims built around it.',
    related: '/history/beale-ciphers/',
    relatedLabel: 'Read the evidence guide',
    book: '/books/beale-treasure/',
    bookLabel: 'Explore the Beale Treasure novel'
  },
  {
    slug: 'lost-inca-treasure',
    id: 'BvUnySyejsw',
    title: 'This Lost Treasure Is Worth Billions (And Still Missing)',
    description: 'The history behind Atahualpa’s ransom and the unverified legend of lost Inca treasure in the Llanganates Mountains.',
    duration: 'PT1M28S',
    upload: '2026-04-15T20:46:12-07:00',
    eyebrow: 'Atahualpa’s ransom and legend',
    summary: 'Atahualpa offered an enormous ransom after his capture at Cajamarca. Gold and silver that reached the Spanish were recorded, melted and divided. A later tradition says another cache was hidden in the Llanganates Mountains.',
    fact: 'Atahualpa’s ransom is historical. A surviving royal cache in the Llanganates remains an unverified legend.',
    related: '/history/atahualpa-ransom/',
    relatedLabel: 'Read the Atahualpa guide',
    book: '/books/lost-inca-gold/',
    bookLabel: 'Preview the book in development'
  },
  {
    slug: 'mask-of-a-faun',
    id: 'kNf3rQ_-PmQ',
    title: "Finding the World's Most Famous Missing Sculpture",
    description: 'The real history of Michelangelo’s Mask of a Faun, a Renaissance sculpture missing since the Second World War.',
    duration: 'PT1M46S',
    upload: '2026-02-20T08:01:00-08:00',
    eyebrow: 'Michelangelo and a missing sculpture',
    summary: 'The Mask of a Faun is traditionally linked to the young Michelangelo. The sculpture was taken from the Castle of Poppi during German looting in 1944 and has not been securely recovered.',
    fact: 'The real sculpture remains missing. Any recovery or resolution within the Tianna Howard novel is fictional.',
    related: '/history/michelangelo-mask-of-a-faun/',
    relatedLabel: 'Read the sculpture history',
    book: '/books/mask-of-a-faun/',
    bookLabel: 'Explore the Mask of a Faun novel'
  },
  {
    slug: 'wwii-art-looting',
    id: 'VzrTT-69RJs',
    title: 'The WWII Art Heist That Still Isn’t Over',
    description: 'How Nazi organizations stole cultural objects across occupied Europe and why the search for missing works continues.',
    duration: 'PT1M25S',
    upload: '2026-03-20T02:38:22-07:00',
    eyebrow: 'The continuing search for stolen art',
    summary: 'Nazi organizations systematically seized paintings, sculptures and private collections across occupied Europe. Allied investigators recovered many objects, but provenance research and restitution work continue.',
    fact: 'A missing object is not automatically confirmed as Nazi-looted. Each claim depends on documentary provenance and the history of the individual work.',
    related: '/history/michelangelo-mask-of-a-faun/',
    relatedLabel: 'See the connected Mask of a Faun history',
    book: '/books/mask-of-a-faun/',
    bookLabel: 'Explore the wartime art mystery'
  }
];

function nav(active = '') {
  const links = [['Overview','/'],['Author','/author/'],['Series','/series/'],['Books','/books/'],['History','/history/'],['Videos','/videos/'],['Guides','/reading-guides/']];
  return `<header><div class="bar"><a class="brand" href="/"><span>TIANNA HOWARD</span><small>ADVENTURES</small></a><nav aria-label="Main navigation">${links.map(([label,href]) => `<a href="${href}"${active === label ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav></div></header>`;
}

function footer() {
  return `<footer><div><strong>Tianna Howard Adventures</strong><p>Historical fiction mysteries by M.L. Woodward for readers aged 11–14.</p></div><div><a href="https://www.tiannahowardadventures.com">Main website</a><a href="mailto:info@tiannahowardadventures.com">Contact</a><a href="/public-knowledge.json">Public knowledge data</a></div><div class="social"><strong>Official profiles</strong><a href="https://www.youtube.com/@TiannaHowardAdventures">YouTube</a><a href="https://www.facebook.com/TiannaHowardAdventures/">Facebook</a><a href="https://www.instagram.com/tiannahowardadventures/">Instagram</a><a href="https://www.tiktok.com/@tiannahowardadventures">TikTok</a><a href="https://www.pinterest.com/TiannaHowardAdventures/">Pinterest</a></div><p class="fine">Canonical public information. Updated 12 September 2026.</p></footer>`;
}

function head({ title, description, url, image, type = 'website', schema }) {
  return `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} | Tianna Howard Adventures</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${url}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta property="og:type" content="${type}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${url}">
  <meta property="og:site_name" content="Tianna Howard Adventures">
  <meta property="og:locale" content="en_GB">${image ? `
  <meta property="og:image" content="${image}">
  <meta property="og:image:width" content="1280">
  <meta property="og:image:height" content="720">` : ''}
  <meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">${image ? `
  <meta name="twitter:image" content="${image}">` : ''}
  <link rel="stylesheet" href="/assets/site.css">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-HCJQPH5PKX"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-HCJQPH5PKX');</script>
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>`;
}

function videoSchema(v) {
  const url = `${ORIGIN}/videos/${v.slug}/`;
  return {'@context':'https://schema.org','@graph':[
    {'@type':'VideoObject','@id':`${url}#video`,name:v.title,description:v.description,thumbnailUrl:`https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`,uploadDate:v.upload,duration:v.duration,embedUrl:`https://www.youtube.com/embed/${v.id}`,contentUrl:`https://www.youtube.com/watch?v=${v.id}`,publisher:{'@id':`${ORIGIN}/#organization`},mainEntityOfPage:url},
    {'@type':'Organization','@id':`${ORIGIN}/#organization`,name:'Tianna Howard Adventures',url:`${ORIGIN}/`,sameAs:['https://www.youtube.com/@TiannaHowardAdventures']},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:`${ORIGIN}/`},{'@type':'ListItem',position:2,name:'Videos',item:`${ORIGIN}/videos/`},{'@type':'ListItem',position:3,name:v.title,item:url}]}
  ]};
}

for (const v of videos) {
  const url = `${ORIGIN}/videos/${v.slug}/`;
  const html = `<!doctype html>
<html lang="en-GB">
${head({title:v.title,description:v.description,url,image:`https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`,type:'video.other',schema:videoSchema(v)})}
<body>
  <a class="skip" href="#content">Skip to content</a>
  ${nav('Videos')}
  <main id="content"><article><div class="article-head"><p class="eyebrow">${v.eyebrow}</p><h1>${v.title}</h1><p class="lead">${v.description}</p><p class="article-updated"><time datetime="${updated}">Reviewed 12 September 2026</time></p></div><div class="article-body"><div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${v.id}" title="${v.title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><h2>What the video explains</h2><p>${v.summary}</p><p class="boundary"><strong>Evidence boundary:</strong> ${v.fact}</p><p><a class="button" href="https://www.youtube.com/watch?v=${v.id}">Watch on YouTube</a></p></div></article><aside class="related"><p class="eyebrow">Continue exploring</p><div><a href="${v.related}">${v.relatedLabel} <span aria-hidden="true">→</span></a><a href="${v.book}">${v.bookLabel} <span aria-hidden="true">→</span></a><a href="/videos/">All history videos <span aria-hidden="true">→</span></a></div></aside></main>
  ${footer()}
</body>
</html>\n`;
  const out = path.join(ROOT, 'videos', v.slug, 'index.html');
  fs.mkdirSync(path.dirname(out), {recursive:true});
  fs.writeFileSync(out, html);
}

const indexUrl = `${ORIGIN}/videos/`;
const indexSchema = {'@context':'https://schema.org','@graph':[
  {'@type':'CollectionPage','@id':`${indexUrl}#page`,name:'Real History Videos',url:indexUrl,description:'Short videos about the real mysteries and historical evidence behind the Tianna Howard Adventures.',hasPart:videos.map(v=>({'@id':`${ORIGIN}/videos/${v.slug}/#video`}))},
  {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:`${ORIGIN}/`},{'@type':'ListItem',position:2,name:'Videos',item:indexUrl}]}
]};
const cards = videos.map(v => `<article class="card"><p class="eyebrow">${v.eyebrow}</p><h2><a href="/videos/${v.slug}/">${v.title}</a></h2><p>${v.description}</p><a class="text-link" href="/videos/${v.slug}/">Watch and read more <span aria-hidden="true">→</span></a></article>`).join('');
const indexHtml = `<!doctype html>
<html lang="en-GB">
${head({title:'Real History Videos',description:'Short videos about the real mysteries and historical evidence behind the Tianna Howard Adventures.',url:indexUrl,schema:indexSchema})}
<body><a class="skip" href="#content">Skip to content</a>${nav('Videos')}<main id="content"><section class="hero compact"><p class="eyebrow">Watch the evidence</p><h1>Real history videos</h1><p class="lead">Short introductions to the codes, missing objects and disputed treasure stories behind the Tianna Howard Adventures.</p></section><section class="section"><div class="grid">${cards}</div></section></main>${footer()}</body>
</html>\n`;
fs.mkdirSync(path.join(ROOT,'videos'),{recursive:true});
fs.writeFileSync(path.join(ROOT,'videos','index.html'),indexHtml);

// Add the videos navigation item to existing pages.
for (const file of listHtml(ROOT)) {
  if (file.includes(`${path.sep}videos${path.sep}`)) continue;
  let html = fs.readFileSync(file,'utf8');
  html = html.replace('<a href="/history/">History</a><a href="/reading-guides/">Guides</a>', '<a href="/history/">History</a><a href="/videos/">Videos</a><a href="/reading-guides/">Guides</a>');
  html = html.replace('<a href="/history/" aria-current="page">History</a><a href="/reading-guides/">Guides</a>', '<a href="/history/" aria-current="page">History</a><a href="/videos/">Videos</a><a href="/reading-guides/">Guides</a>');
  fs.writeFileSync(file,html);
}

// Add cover and preferred-image metadata to the two published book pages.
for (const b of [
  {file:'books/beale-treasure/index.html',asset:'beale-treasure-cover.jpg',title:'Tianna and the Mystery of the Beale Treasure',w:1280,h:2048},
  {file:'books/mask-of-a-faun/index.html',asset:'mask-of-a-faun-cover.jpg',title:'Tianna and Michelangelo’s Mask of a Faun',w:1365,h:2048}
]) {
  const p=path.join(ROOT,b.file); let html=fs.readFileSync(p,'utf8'); const image=`${ORIGIN}/assets/covers/${b.asset}`;
  html=html.replace('<meta property="og:site_name" content="Tianna Howard Adventures">',`<meta property="og:site_name" content="Tianna Howard Adventures">\n  <meta property="og:image" content="${image}">\n  <meta property="og:image:width" content="${b.w}">\n  <meta property="og:image:height" content="${b.h}">`);
  html=html.replace('<meta name="twitter:card" content="summary">','<meta name="twitter:card" content="summary_large_image">');
  html=html.replace(/(<meta name="twitter:description"[^>]+>)/,`$1\n  <meta name="twitter:image" content="${image}">`);
  html=html.replace(/("@type":"Book","@id":[^}]+?"description":"[^"]+")/,`$1,"image":"${image}"`);
  html=html.replace('<section class="prose"><p>',`<section class="prose book-intro"><img class="book-cover" src="/assets/covers/${b.asset}" alt="Book cover of ${b.title}" width="${b.w}" height="${b.h}" loading="eager"><div><p>`);
  html=html.replace('</p><h2>The history behind the fiction</h2>', '</p><h2>The history behind the fiction</h2>');
  html=html.replace('</p><p class="boundary"><strong>Fiction boundary:', '</p><p class="boundary"><strong>Fiction boundary:');
  const marker='</p></section><section class="section"><div class="section-head"><p class="eyebrow">Current editions</p>';
  html=html.replace(marker,'</p></div></section><section class="section"><div class="section-head"><p class="eyebrow">Current editions</p>');
  fs.writeFileSync(p,html);
}

// Add the free activity-pack landing page.
const resourceUrl=`${ORIGIN}/resources/teacher-reader-activity-pack/`;
const resourceSchema={'@context':'https://schema.org','@graph':[{'@type':'LearningResource','@id':`${resourceUrl}#resource`,name:'Tianna Howard Teacher and Reader Activity Pack',description:'A free spoiler-safe activity pack for readers aged 11–14, teachers, families and librarians.',url:resourceUrl,educationalLevel:'Ages 11–14',learningResourceType:'Activity guide',inLanguage:'en-GB',author:{'@id':`${ORIGIN}/author/#author`}},{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:`${ORIGIN}/`},{'@type':'ListItem',position:2,name:'Free activity pack',item:resourceUrl}]}]};
const resourceHtml=`<!doctype html><html lang="en-GB">${head({title:'Free Teacher and Reader Activity Pack',description:'Download a free spoiler-safe activity pack for readers aged 11–14, teachers, families and librarians.',url:resourceUrl,schema:resourceSchema})}<body><a class="skip" href="#content">Skip to content</a>${nav('Guides')}<main id="content"><section class="hero compact"><p class="eyebrow">Free resource · Ages 11–14</p><h1>Teacher and reader activity pack</h1><p class="lead">Explore codes, historical evidence and missing objects through spoiler-safe activities connected to the Tianna Howard Adventures.</p><div class="actions"><a class="button" href="/resources/tianna-howard-teacher-reader-activity-pack.pdf">Download the free PDF</a><a class="quiet" href="/books/">Explore the books</a></div></section><section class="prose"><h2>What is included?</h2><ul class="checks"><li>A starter cipher challenge</li><li>A source-reliability exercise</li><li>A missing-art provenance activity</li><li>Discussion and creative-writing prompts</li><li>A concise answer and facilitator guide</li></ul><p>No purchase or sign-up is required. The pack avoids plot spoilers and can be used without reading the novels first.</p></section></main>${footer()}</body></html>\n`;
fs.mkdirSync(path.join(ROOT,'resources','teacher-reader-activity-pack'),{recursive:true});
fs.writeFileSync(path.join(ROOT,'resources','teacher-reader-activity-pack','index.html'),resourceHtml);

// Add local cross-links from the relevant history pages.
for (const [rel,slug,label] of [
 ['history/beale-ciphers/index.html','beale-ciphers','Watch the Beale Ciphers video'],
 ['history/atahualpa-ransom/index.html','lost-inca-treasure','Watch the lost Inca treasure video'],
 ['history/michelangelo-mask-of-a-faun/index.html','mask-of-a-faun','Watch the Mask of a Faun video']
]) {
 const p=path.join(ROOT,rel); let html=fs.readFileSync(p,'utf8');
 html=html.replace('<section class="sources">',`<p><a class="button" href="/videos/${slug}/">${label}</a></p><section class="sources">`);
 fs.writeFileSync(p,html);
}

// Extend the sitemap without creating duplicate entries.
const sitemapPath=path.join(ROOT,'sitemap.xml'); let sitemap=fs.readFileSync(sitemapPath,'utf8');
const additions=['/videos/','/videos/beale-ciphers/','/videos/lost-inca-treasure/','/videos/mask-of-a-faun/','/videos/wwii-art-looting/','/resources/teacher-reader-activity-pack/'];
for(const rel of additions){const loc=`${ORIGIN}${rel}`; if(!sitemap.includes(`<loc>${loc}</loc>`)) sitemap=sitemap.replace('</urlset>',`  <url><loc>${loc}</loc><lastmod>${updated}</lastmod></url>\n</urlset>`)}
fs.writeFileSync(sitemapPath,sitemap);

function listHtml(dir){let out=[];for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())out=out.concat(listHtml(p));else if(e.name.endsWith('.html'))out.push(p)}return out}

console.log('Built video pages, book imagery metadata and activity-pack landing page.');
