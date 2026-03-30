import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const projectRoot = path.resolve(__dirname, "..");
export const publicDir = path.join(projectRoot, "public");
export const distDir = path.join(projectRoot, "dist");
export const routesFile = path.join(projectRoot, "src", "routes", "routes-path.ts");
export const seoFile = path.join(projectRoot, "src", "lib", "seo.ts");

export const DEFAULT_SITE_URL = "https://thenairobihosp.org";
export const SITE_NAME = "The Nairobi Hospital";
export const DEFAULT_DESCRIPTION =
  "The Nairobi Hospital offers specialist care, diagnostics, outpatient services, inpatient treatment, and patient support in Nairobi, Kenya.";
export const DEFAULT_OG_IMAGE =
  "https://cms.thenairobihosp.org/uploads/nai_hospital_1ce6949b74.jpg";
export const DEFAULT_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
export const NOINDEX_ROBOTS = "noindex, nofollow";

export const getSiteUrl = () =>
  (process.env.VITE_SITE_URL || process.env.SITE_URL || DEFAULT_SITE_URL).replace(
    /\/+$/,
    "",
  );

export const normalizePath = (routePath) => {
  if (!routePath) return null;
  const normalized = routePath.startsWith("/") ? routePath : `/${routePath}`;
  if (normalized.length > 1 && normalized.endsWith("/")) {
    return normalized.slice(0, -1);
  }
  return normalized;
};

const stripComments = (source) =>
  source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

const extractStaticSeoBlock = (source) => {
  const match = source.match(
    /const STATIC_SEO:[\s\S]*?=\s*\{([\s\S]*?)\};\n\ntype DynamicSeoEntry/u,
  );

  return match?.[1] ?? "";
};

export const parseStaticSeoEntries = (source) => {
  const entries = new Map();
  const block = extractStaticSeoBlock(source);
  const entryPattern = /^\s*"([^"]+)":\s*\{([\s\S]*?)^\s*\},?/gmu;

  for (const match of block.matchAll(entryPattern)) {
    const [, routePath, body] = match;
    const titleMatch = body.match(/title:\s*"([^"]+)"/u);
    const descriptionMatch = body.match(/description:\s*"([^"]+)"/u);
    const noindex = /noindex:\s*true/u.test(body);

    if (!titleMatch || !descriptionMatch) continue;

    entries.set(routePath, {
      title: titleMatch[1],
      description: descriptionMatch[1],
      noindex,
    });
  }

  return entries;
};

export const readSeoContext = async () => {
  const [routeSource, seoSource] = await Promise.all([
    readFile(routesFile, "utf8"),
    readFile(seoFile, "utf8"),
  ]);
  const routeMatches = [
    ...stripComments(routeSource).matchAll(/path:\s*["'`]([^"'`]+)["'`]/g),
  ].map(([, routePath]) => routePath);
  const staticSeoEntries = parseStaticSeoEntries(seoSource);

  return {
    routeMatches,
    staticSeoEntries,
  };
};

const shouldIncludeRoute = (routePath, { includeDynamic = false } = {}) =>
  Boolean(routePath) &&
  routePath !== "/dashboard" &&
  !routePath.startsWith("/dashboard/") &&
  (includeDynamic || !routePath.includes(":")) &&
  !routePath.includes("*");

export const collectRoutes = (
  routeMatches,
  staticSeoEntries,
  { includeDynamic = false, excludeNoindex = false } = {},
) =>
  Array.from(
    new Set(
      routeMatches
        .map(normalizePath)
        .filter((routePath) => shouldIncludeRoute(routePath, { includeDynamic }))
        .filter(
          (routePath) =>
            !excludeNoindex || !Boolean(staticSeoEntries.get(routePath)?.noindex),
        ),
    ),
  ).sort((left, right) => {
    if (left === "/") return -1;
    if (right === "/") return 1;

    const depthDifference =
      left.split("/").filter(Boolean).length - right.split("/").filter(Boolean).length;

    if (depthDifference !== 0) return depthDifference;

    return left.localeCompare(right);
  });

const formatTitle = (title) =>
  title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

const humanizeFallbackTitle = (pathname) => {
  const segment = normalizePath(pathname)
    .split("/")
    .filter(Boolean)
    .pop();

  if (!segment) return SITE_NAME;

  return segment
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

export const buildCanonicalUrl = (pathname, siteUrl = getSiteUrl()) =>
  new URL(normalizePath(pathname), `${siteUrl}/`).toString();

export const resolveStaticRouteSeo = (routePath, staticSeoEntries) => {
  const normalizedPath = normalizePath(routePath);
  const staticEntry = staticSeoEntries.get(normalizedPath);

  if (staticEntry) {
    return {
      title: formatTitle(staticEntry.title),
      description: staticEntry.description,
      canonicalPath: normalizedPath,
      noindex: Boolean(staticEntry.noindex),
    };
  }

  return {
    title: formatTitle(humanizeFallbackTitle(normalizedPath)),
    description: DEFAULT_DESCRIPTION,
    canonicalPath: normalizedPath,
    noindex: false,
  };
};

export const buildStructuredData = (canonicalUrl, title, description) => {
  const siteOrigin = new URL(canonicalUrl).origin;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Hospital",
        "@id": `${siteOrigin}#hospital`,
        name: SITE_NAME,
        url: siteOrigin,
        image: DEFAULT_OG_IMAGE,
        telephone: "+254 703 082 000",
        email: "hosp@nbihosp.org",
        address: {
          "@type": "PostalAddress",
          postOfficeBoxNumber: "P.O. Box 30026 - 00100 GPO",
          addressLocality: "Nairobi",
          addressCountry: "KE",
        },
        sameAs: [
          "https://www.facebook.com/TheNairobiHosp",
          "https://twitter.com/thenairobihosp",
          "https://www.linkedin.com/company/thenairobihospital",
          "https://www.youtube.com/channel/UChUuucNLoxQqFKgVW2G5AlA",
          "https://www.instagram.com/nairobihosp/",
          "https://www.tiktok.com/@thenairobihospital/",
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteOrigin}#website`,
          name: SITE_NAME,
          url: siteOrigin,
        },
        about: {
          "@id": `${siteOrigin}#hospital`,
        },
      },
    ],
  };
};

export const getPriority = (routePath) => {
  if (routePath === "/") return "1.0";

  if (
    [
      "/about-us",
      "/clinical-services",
      "/contact-us",
      "/doctor-profiles",
      "/outpatient-centers",
    ].includes(routePath)
  ) {
    return "0.9";
  }

  if (routePath.startsWith("/news") || routePath.startsWith("/blogs")) {
    return "0.7";
  }

  return "0.8";
};

export const getChangeFreq = (routePath) => {
  if (routePath === "/") return "weekly";
  if (routePath.startsWith("/news") || routePath.startsWith("/blogs")) {
    return "weekly";
  }
  return "monthly";
};

export const buildSitemapXml = (routes, siteUrl, lastmod) => {
  const sitemapEntries = routes
    .map((routePath) => {
      const url = buildCanonicalUrl(routePath, siteUrl);

      return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${getChangeFreq(routePath)}</changefreq>
    <priority>${getPriority(routePath)}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`;
};

export const buildRobotsTxt = (siteUrl) => `User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /dashboard/
Disallow: /dashboard/auth

Sitemap: ${siteUrl}/sitemap.xml
`;
