import { ClinicalService } from "@/types";

export const hasAndersonLocation = (
  service: Pick<ClinicalService, "locations">,
) =>
  Array.isArray(service.locations) &&
  service.locations.some((location) =>
    String(location ?? "").toLowerCase().includes("anderson"),
  );

export const hasNonAndersonLocation = (
  service: Pick<ClinicalService, "locations">,
) =>
  Array.isArray(service.locations) &&
  service.locations.some((location) => {
    const normalized = String(location ?? "").toLowerCase().trim();
    return normalized.length > 0 && !normalized.includes("anderson");
  });

export const isAndersonOnlyService = (
  service: Pick<ClinicalService, "locations">,
) => hasAndersonLocation(service) && !hasNonAndersonLocation(service);
