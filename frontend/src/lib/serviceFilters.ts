import { ClinicalService } from "@/types";

export const hasAndersonLocation = (
  service: Pick<ClinicalService, "locations">,
) =>
  Array.isArray(service.locations) &&
  service.locations.some((location) =>
    String(location ?? "").toLowerCase().includes("anderson"),
  );
