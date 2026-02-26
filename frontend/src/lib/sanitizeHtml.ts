import DOMPurify, { type Config } from "dompurify";

const htmlConfig: Config = {
  USE_PROFILES: { html: true },
  FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form"],
  FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "style"],
};

const plainTextConfig: Config = {
  ALLOWED_TAGS: [],
  ALLOWED_ATTR: [],
};

const sanitizeToString = (value: string, config: Config): string => {
  const sanitized = DOMPurify.sanitize(value, config);
  return typeof sanitized === "string" ? sanitized : String(sanitized);
};

export const sanitizeHtml = (value?: string | null): string =>
  sanitizeToString(value ?? "", htmlConfig).trim();

export const sanitizePlainText = (value?: string | null): string =>
  sanitizeToString(value ?? "", plainTextConfig).trim();

