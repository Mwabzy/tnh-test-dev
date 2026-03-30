import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  buildCanonicalUrl,
  buildStructuredData,
  collectRoutes,
  DEFAULT_OG_IMAGE,
  DEFAULT_ROBOTS,
  distDir,
  NOINDEX_ROBOTS,
  readSeoContext,
  resolveStaticRouteSeo,
  SITE_NAME,
} from "./seo-utils.mjs";

const indexHtmlPath = path.join(distDir, "index.html");

const replaceOrInsert = (html, pattern, replacement, fallback) =>
  pattern.test(html) ? html.replace(pattern, replacement) : html.replace("</head>", `${fallback}\n  </head>`);

const setMetaTag = (html, selectorPattern, tag) =>
  replaceOrInsert(html, selectorPattern, tag, tag);

const setLinkTag = (html, selectorPattern, tag) =>
  replaceOrInsert(html, selectorPattern, tag, tag);

const setStructuredData = (html, schemaJson) => {
  const tag = `  <script type="application/ld+json" data-seo="structured-data">${schemaJson}</script>`;
  return replaceOrInsert(
    html,
    /<script[^>]*data-seo="structured-data"[^>]*>[\s\S]*?<\/script>/i,
    tag,
    tag,
  );
};

const applySeoToHtml = (html, routePath, staticSeoEntries) => {
  const seo = resolveStaticRouteSeo(routePath, staticSeoEntries);
  const canonicalUrl = buildCanonicalUrl(seo.canonicalPath);
  const robots = seo.noindex ? NOINDEX_ROBOTS : DEFAULT_ROBOTS;
  const structuredData = JSON.stringify(
    buildStructuredData(canonicalUrl, seo.title, seo.description),
  );

  let nextHtml = html.replace(/<html([^>]*)lang="[^"]*"/i, "<html$1lang=\"en\"");

  if (!/<html[^>]*lang=/i.test(nextHtml)) {
    nextHtml = nextHtml.replace(/<html(.*?)>/i, "<html$1 lang=\"en\">");
  }

  nextHtml = nextHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`);
  nextHtml = setMetaTag(
    nextHtml,
    /<meta[^>]+name="description"[^>]*>/i,
    `  <meta name="description" content="${seo.description}" />`,
  );
  nextHtml = setMetaTag(
    nextHtml,
    /<meta[^>]+name="robots"[^>]*>/i,
    `  <meta name="robots" content="${robots}" />`,
  );
  nextHtml = setLinkTag(
    nextHtml,
    /<link[^>]+rel="canonical"[^>]*>/i,
    `  <link rel="canonical" href="${canonicalUrl}" />`,
  );
  nextHtml = setMetaTag(
    nextHtml,
    /<meta[^>]+property="og:type"[^>]*>/i,
    '  <meta property="og:type" content="website" />',
  );
  nextHtml = setMetaTag(
    nextHtml,
    /<meta[^>]+property="og:site_name"[^>]*>/i,
    `  <meta property="og:site_name" content="${SITE_NAME}" />`,
  );
  nextHtml = setMetaTag(
    nextHtml,
    /<meta[^>]+property="og:title"[^>]*>/i,
    `  <meta property="og:title" content="${seo.title}" />`,
  );
  nextHtml = setMetaTag(
    nextHtml,
    /<meta[^>]+property="og:description"[^>]*>/i,
    `  <meta property="og:description" content="${seo.description}" />`,
  );
  nextHtml = setMetaTag(
    nextHtml,
    /<meta[^>]+property="og:url"[^>]*>/i,
    `  <meta property="og:url" content="${canonicalUrl}" />`,
  );
  nextHtml = setMetaTag(
    nextHtml,
    /<meta[^>]+property="og:image"[^>]*>/i,
    `  <meta property="og:image" content="${DEFAULT_OG_IMAGE}" />`,
  );
  nextHtml = setMetaTag(
    nextHtml,
    /<meta[^>]+name="twitter:card"[^>]*>/i,
    '  <meta name="twitter:card" content="summary_large_image" />',
  );
  nextHtml = setMetaTag(
    nextHtml,
    /<meta[^>]+name="twitter:title"[^>]*>/i,
    `  <meta name="twitter:title" content="${seo.title}" />`,
  );
  nextHtml = setMetaTag(
    nextHtml,
    /<meta[^>]+name="twitter:description"[^>]*>/i,
    `  <meta name="twitter:description" content="${seo.description}" />`,
  );
  nextHtml = setMetaTag(
    nextHtml,
    /<meta[^>]+name="twitter:image"[^>]*>/i,
    `  <meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`,
  );

  return setStructuredData(nextHtml, structuredData);
};

const writeRouteHtml = async (routePath, html) => {
  if (routePath === "/") {
    await writeFile(indexHtmlPath, html, "utf8");
    return;
  }

  const routeDir = path.join(distDir, routePath.replace(/^\/+/, ""));
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), html, "utf8");
};

const templateHtml = await readFile(indexHtmlPath, "utf8");
const { routeMatches, staticSeoEntries } = await readSeoContext();
const staticPublicRoutes = collectRoutes(routeMatches, staticSeoEntries, {
  excludeNoindex: false,
});

for (const routePath of staticPublicRoutes) {
  const prerenderedHtml = applySeoToHtml(templateHtml, routePath, staticSeoEntries);
  await writeRouteHtml(routePath, prerenderedHtml);
}

console.log(`Prerendered ${staticPublicRoutes.length} static public routes.`);
