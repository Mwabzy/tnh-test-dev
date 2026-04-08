import {
  buildCanonicalUrl,
  buildStructuredData,
  DEFAULT_OG_IMAGE,
  DEFAULT_ROBOTS,
  DEFAULT_SITE_URL,
  NOINDEX_ROBOTS,
  SITE_NAME,
} from "@/lib/seo";

type ApplyDocumentSeoOptions = {
  title: string;
  description: string;
  canonicalPath?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  image?: string;
};

const setMetaTag = (
  selector: string,
  attributes: Record<string, string>,
  content: string,
) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => {
      element?.setAttribute(key, value);
    });
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const setLinkTag = (
  selector: string,
  attributes: Record<string, string>,
  href: string,
) => {
  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement("link");
    Object.entries(attributes).forEach(([key, value]) => {
      element?.setAttribute(key, value);
    });
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

export const trimMetaDescription = (
  value: string,
  fallback: string,
  maxLength: number = 160,
): string => {
  const collapsed = value.replace(/\s+/g, " ").trim();

  if (!collapsed) return fallback;
  if (collapsed.length <= maxLength) return collapsed;

  return `${collapsed.slice(0, maxLength - 1).trimEnd()}…`;
};

export const applyDocumentSeo = ({
  title,
  description,
  canonicalPath,
  canonicalUrl,
  noindex = false,
  image,
}: ApplyDocumentSeoOptions) => {
  const siteUrl = (
    import.meta.env.VITE_SITE_URL || window.location.origin || DEFAULT_SITE_URL
  ).replace(/\/+$/, "");
  const resolvedCanonicalUrl =
    canonicalUrl ||
    buildCanonicalUrl(canonicalPath || window.location.pathname, siteUrl);
  const robotsContent = noindex ? NOINDEX_ROBOTS : DEFAULT_ROBOTS;
  const resolvedImage = image || DEFAULT_OG_IMAGE;
  const structuredData = buildStructuredData(
    resolvedCanonicalUrl,
    title,
    description,
  );

  document.title = title;
  document.documentElement.lang = "en";

  setMetaTag('meta[name="description"]', { name: "description" }, description);
  setMetaTag('meta[name="robots"]', { name: "robots" }, robotsContent);
  setMetaTag("meta[property='og:type']", { property: "og:type" }, "website");
  setMetaTag(
    "meta[property='og:site_name']",
    { property: "og:site_name" },
    SITE_NAME,
  );
  setMetaTag("meta[property='og:title']", { property: "og:title" }, title);
  setMetaTag(
    "meta[property='og:description']",
    { property: "og:description" },
    description,
  );
  setMetaTag(
    "meta[property='og:url']",
    { property: "og:url" },
    resolvedCanonicalUrl,
  );
  setMetaTag(
    "meta[property='og:image']",
    { property: "og:image" },
    resolvedImage,
  );
  setMetaTag(
    'meta[name="twitter:card"]',
    { name: "twitter:card" },
    "summary_large_image",
  );
  setMetaTag('meta[name="twitter:title"]', { name: "twitter:title" }, title);
  setMetaTag(
    'meta[name="twitter:description"]',
    { name: "twitter:description" },
    description,
  );
  setMetaTag(
    'meta[name="twitter:image"]',
    { name: "twitter:image" },
    resolvedImage,
  );
  setLinkTag("link[rel='canonical']", { rel: "canonical" }, resolvedCanonicalUrl);

  let schemaElement = document.head.querySelector<HTMLScriptElement>(
    'script[data-seo="structured-data"]',
  );

  if (!schemaElement) {
    schemaElement = document.createElement("script");
    schemaElement.type = "application/ld+json";
    schemaElement.setAttribute("data-seo", "structured-data");
    document.head.appendChild(schemaElement);
  }

  schemaElement.textContent = JSON.stringify(structuredData);
};
