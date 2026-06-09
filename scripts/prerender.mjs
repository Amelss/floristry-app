/**
 * Post-build static prerendering.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server entry).
 * For every route in src/routes.js it renders the app to HTML and writes
 * dist/<path>/index.html with the page's title, meta description, canonical
 * and Open Graph tags baked in — so crawlers get full content without
 * executing any JavaScript. Also emits dist/404.html and dist/sitemap.xml.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROUTES, SITE_URL } from '../src/routes.js';
import { renderPage } from '../dist-ssr/entry-prerender.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const template = readFileSync(join(dist, 'index.html'), 'utf8');

const esc = (s) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function buildPage(appHtml, { title, description, canonical }) {
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${esc(description)}" />`,
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${esc(title)}" />`,
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${esc(description)}" />`,
  );
  const extra = canonical
    ? `<link rel="canonical" href="${canonical}" />\n    <meta property="og:url" content="${canonical}" />`
    : `<meta name="robots" content="noindex" />`;
  html = html.replace('</head>', `  ${extra}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  return html;
}

const canonicalFor = (path) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);

let count = 0;
for (const route of Object.values(ROUTES)) {
  const appHtml = await renderPage(route.path);
  const page = buildPage(appHtml, {
    title: route.title,
    description: route.description,
    canonical: canonicalFor(route.path),
  });
  const outDir = route.path === '/' ? dist : join(dist, route.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), page);
  count++;
}

// Real 404 page — Netlify serves dist/404.html with a 404 status automatically.
const notFoundHtml = await renderPage('/this-page-does-not-exist');
writeFileSync(
  join(dist, '404.html'),
  buildPage(notFoundHtml, {
    title: 'Page Not Found | My Floristry Helper',
    description: ROUTES.home.description,
    canonical: null, // noindex instead
  }),
);

// sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const urls = Object.values(ROUTES)
  .map(
    (r) =>
      `  <url>\n    <loc>${canonicalFor(r.path)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
  )
  .join('\n');
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

// robots.txt — generated here so SITE_URL in src/routes.js is the only
// place the domain is defined.
writeFileSync(
  join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);

rmSync(join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`Prerendered ${count} routes + 404.html, wrote sitemap.xml (${SITE_URL})`);
