import DOMPurify from "dompurify";

const htmlConfig: DOMPurify.Config = {
  USE_PROFILES: { html: true },
  FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form"],
  FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "style"],
};

const plainTextConfig: DOMPurify.Config = {
  ALLOWED_TAGS: [],
  ALLOWED_ATTR: [],
};

export const sanitizeHtml = (value?: string | null): string =>
  DOMPurify.sanitize(value ?? "", htmlConfig).trim();

export const sanitizePlainText = (value?: string | null): string =>
  DOMPurify.sanitize(value ?? "", plainTextConfig).trim();

