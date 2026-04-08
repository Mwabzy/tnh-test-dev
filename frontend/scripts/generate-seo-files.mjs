import { writeFile } from "node:fs/promises";
import path from "node:path";
import {
  buildRobotsTxt,
  buildSitemapXml,
  collectRoutes,
  getSiteUrl,
  publicDir,
  readSeoContext,
} from "./seo-utils.mjs";

const siteUrl = getSiteUrl();
const today = new Date().toISOString().slice(0, 10);
const { routeMatches, staticSeoEntries } = await readSeoContext();
const uniqueRoutes = collectRoutes(routeMatches, staticSeoEntries, {
  excludeNoindex: true,
});

const sitemapXml = buildSitemapXml(uniqueRoutes, siteUrl, today);
const robotsTxt = buildRobotsTxt(siteUrl);

await writeFile(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
await writeFile(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");

console.log(
  `Generated SEO assets for ${uniqueRoutes.length} public routes using ${siteUrl}`,
);
