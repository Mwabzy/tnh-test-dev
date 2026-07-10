import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, MapPin, Phone } from "lucide-react";
import DOMPurify from "dompurify";
import { addClassesToDescription } from "@/components/services/utilities";
import { fetchClinicalServices } from "@/api/api";
import { applyDocumentSeo, trimMetaDescription } from "@/lib/seoDom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchOutpatientCenters } from "@/store/outpatientCentersSlice";

const DAY_ORDER: Record<string, number> = {
  monday: 0, mon: 0,
  tuesday: 1, tue: 1,
  wednesday: 2, wed: 2,
  thursday: 3, thu: 3,
  friday: 4, fri: 4,
  saturday: 5, sat: 5,
  sunday: 6, sun: 6,
};

type ServiceSummary = {
  id: number;
  title: string;
  tagline?: string;
  overview?: string;
};

type Contact = {
  phone?: string;
  email?: string;
};

type CenterImage = {
  id?: number;
  url: string;
  alt?: string;
};

type Opc = {
  id: number;
  path?: string | null;
  slug?: string | null;
  name: string;
  description: string;
  contact?: Contact;
  location: string;
  images: CenterImage[];
  servicesOffered: number[];
  timings: Array<{
    clinicId: number | null;
    day: string;
    month: string;
    startTime: string;
    stopTime: string;
  }>;
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

const toMediaUrl = (url?: string | null) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  try {
    if (apiBaseUrl) return new URL(url, apiBaseUrl).toString();
  } catch {
    // no-op
  }
  return url;
};

const formatDayLabel = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const OutpatientCenterDetails = () => {
  const { id: rawId } = useParams();
  let id = rawId;

  if (rawId) {
    try {
      id = decodeURIComponent(rawId);
    } catch {
      id = rawId;
    }
  }

  const [details, setDetails] = useState<Opc | null>(null);
  const [services, setServices] = useState<ServiceSummary[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const {
    centers,
    loading: loadingCenters,
    error: centersError,
    initialized,
  } = useAppSelector((state) => state.outpatientCenters);

  useEffect(() => {
    if (!initialized && !loadingCenters) {
      void dispatch(fetchOutpatientCenters());
    }
  }, [dispatch, initialized, loadingCenters]);

  useEffect(() => {
    const parseContact = (value: any): Contact => {
      if (!value) return {};
      if (typeof value === "string") {
        try {
          const parsed = JSON.parse(value);
          if (parsed && typeof parsed === "object") {
            return {
              phone: parsed.phone ?? "",
              email: parsed.email ?? "",
            };
          }
        } catch {
          return { phone: value };
        }
        return {};
      }
      if (typeof value === "object") {
        return {
          phone: value.phone ?? "",
          email: value.email ?? "",
        };
      }
      return {};
    };

    if (!initialized && loadingCenters) {
      return;
    }

    if (centersError) {
      setError(centersError);
      return;
    }

    const found = centers.find(
      (item) => String(item.path ?? item.slug ?? item.id) === String(id ?? ""),
    );

    if (!found) {
      setDetails(null);
      if (initialized) {
        setError("Service not found.");
      }
      return;
    }

    const timingServiceIds = Array.isArray(found.timings)
      ? found.timings
          .map((timing: any) => {
            const clinicNumber = Number(timing?.clinicId ?? null);
            return Number.isFinite(clinicNumber) ? clinicNumber : null;
          })
          .filter((serviceId: number | null): serviceId is number =>
            Number.isFinite(serviceId),
          )
      : [];

    const declaredServiceIds = Array.isArray(found.services_offered)
      ? found.services_offered
          .map((service: any) =>
            typeof service === "object" ? service?.id : service,
          )
          .filter((serviceId: any) => Number.isFinite(Number(serviceId)))
          .map((serviceId: any) => Number(serviceId))
      : [];

    const mergedServiceIds = Array.from(
      new Set([...declaredServiceIds, ...timingServiceIds]),
    );

    const mapped: Opc = {
      id: Number(found.id),
      path: found.path ?? null,
      slug: found.slug ?? null,
      name: found.name ?? "",
      description: found.description ?? "",
      contact: parseContact(found.contact),
      location: found.location ?? "",
      images: Array.isArray(found.image)
        ? found.image
            .map((img) => ({
              id: Number(img?.id),
              url: toMediaUrl(img?.url ?? ""),
              alt: img?.alt ?? "",
            }))
            .filter((img: CenterImage) => Boolean(img.url))
        : [],
      servicesOffered: mergedServiceIds,
      timings: Array.isArray(found.timings)
        ? found.timings.map((timing: any) => {
            const clinicNumber = Number(timing?.clinicId ?? null);
            return {
              clinicId: Number.isFinite(clinicNumber) ? clinicNumber : null,
              day: formatDayLabel(String(timing?.day ?? "").trim()),
              month: String(timing?.month ?? "").trim(),
              startTime: String(timing?.startTime ?? "").trim(),
              stopTime: String(timing?.stopTime ?? "").trim(),
            };
          })
        : [],
    };

    setDetails(mapped);
    setError(null);
  }, [centers, centersError, id, initialized, loadingCenters]);

  useEffect(() => {
    const loadServices = async () => {
      if (!details || details.servicesOffered.length === 0) {
        setServices([]);
        return;
      }

      try {
        setLoadingServices(true);
        const servicesData = await fetchClinicalServices();
        const serviceList = Array.isArray(servicesData)
          ? servicesData
          : (servicesData?.results ?? servicesData?.data ?? []);
        const byId = new Map(
          serviceList.map((s: any) => [
            s.id,
            {
              id: s.id,
              title: s.title ?? "",
              tagline: s.tagline ?? "",
              overview: s.overview ?? "",
            },
          ]),
        );
        const matched = details.servicesOffered
          .map((serviceId) => byId.get(serviceId))
          .filter(Boolean) as ServiceSummary[];
        setServices(matched);
      } catch {
        setError("Failed to load outpatient center.");
      } finally {
        setLoadingServices(false);
      }
    };

    void loadServices();
  }, [details]);

  useEffect(() => {
    if (!details) return;

    const description = trimMetaDescription(
      `${details.description} ${details.location}`.trim(),
      `${details.name} outpatient center at The Nairobi Hospital.`,
    );

    applyDocumentSeo({
      title: `${details.name} | The Nairobi Hospital`,
      description,
      canonicalPath: window.location.pathname,
      image: details.images?.[0]?.url,
    });
  }, [details]);

  const timingsByServiceId = useMemo(() => {
    const map = new Map<
      number,
      Array<{
        day: string;
        month: string;
        startTime: string;
        stopTime: string;
      }>
    >();

    (details?.timings ?? []).forEach((timing) => {
      if (!timing.clinicId) return;
      if (!map.has(timing.clinicId)) map.set(timing.clinicId, []);
      map.get(timing.clinicId)?.push({
        day: timing.day,
        month: timing.month,
        startTime: timing.startTime,
        stopTime: timing.stopTime,
      });
    });

    map.forEach((entries) => {
      entries.sort((a, b) => {
        const aOrder = DAY_ORDER[a.day?.toLowerCase()] ?? 99;
        const bOrder = DAY_ORDER[b.day?.toLowerCase()] ?? 99;
        return aOrder - bOrder;
      });
    });

    return map;
  }, [details?.timings]);

  if (loadingCenters || loadingServices || (!initialized && !details))
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading outpatient center...
      </div>
    );

  if (error)
    return <div className="text-center mt-10 text-red-600">{error}</div>;

  if (!details)
    return (
      <div className="text-center mt-10 text-red-600">Service not found.</div>
    );

  const heroImage = details.images[0]?.url || "";
  const heroImageAlt = details.images[0]?.alt || details.name;

  return (
    <>
      <section
        className={`text-white p-5 md:p-16 ${
          heroImage
            ? "relative min-h-[260px] md:min-h-[360px] bg-cover bg-center bg-no-repeat"
            : "bg-red-900"
        }`}
        style={heroImage ? { backgroundImage: `url(${heroImage})` } : undefined}
        aria-label={heroImageAlt}
      >
        {heroImage && <div className="absolute inset-0 bg-black/45"></div>}
        <div className="relative grid md:grid-cols gap-2 lg:px-36">
          <div className="flex flex-col justify-center space-y-4 max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {details.name}
            </h1>
            <p className="text-lg md:text-xl">{details.location}</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">About the clinic</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  addClassesToDescription(details.description) ?? "",
                ),
              }}
              className="mt-2 prose prose-gray max-w-none text-gray-700 leading-relaxed prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6"
            ></div>
          </div>

          <h2 className="text-2xl text-red-900 font-bold underline">
            CLINICAL SERVICES OFFERED
          </h2>

          {/* Accordion */}
          <div className="">
            <Accordion type="single" collapsible className="w-full">
              {services.map((service, index) => {
                const serviceTimings = timingsByServiceId.get(service.id) ?? [];

                return (
                  <AccordionItem key={service.id} value={`item-${index}`}>
                    <AccordionTrigger>{service.title}</AccordionTrigger>
                    <AccordionContent>
                      <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
                        <p className="text-sm font-semibold text-gray-900">
                          Clinic timings
                        </p>

                        {serviceTimings.length === 0 ? (
                          <p className="text-sm text-gray-600 mt-2">
                            No timings set for this clinic service.
                          </p>
                        ) : (
                          <ul className="mt-2 space-y-1.5 text-sm text-gray-700">
                            {serviceTimings.map((timing, timingIndex) => {
                              const dayPart = timing.day
                                ? formatDayLabel(timing.day)
                                : "Day not set";
                              const monthPart = timing.month
                                ? ` (${timing.month})`
                                : "";
                              const fromPart =
                                timing.startTime || "Start not set";
                              const toPart = timing.stopTime || "End not set";

                              return (
                                <li
                                  key={`${service.id}-timing-${timingIndex}`}
                                  className="leading-relaxed"
                                >
                                  {dayPart}
                                  {monthPart}: {fromPart} - {toPart}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
            {services.length === 0 && (
              <p className="text-gray-600 mt-2">
                No clinical services listed yet.
              </p>
            )}
          </div>
        </div>

        {/* Contact Card */}
        {/* <div className="lg:w-[300px] w-full bg-red-50 h-min rounded-xl p-6 shadow-md text-sm text-gray-800">
          <h3 className="font-semibold mb-4">Have Additional Questions?</h3>
          <ul className="space-y-2">
            <li>📍 {details.location}</li>
            <li>📞 {details.contact}</li>
            <li>✉️ {details.email}</li>
          </ul>
          <button className="mt-4 text-green-700 hover:underline">
            Contact Us →
          </button>
        </div> */}
        <div className="w-full lg:w-[360px] flex flex-col gap-4">
          {heroImage && (
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <img
                src={heroImage}
                alt={heroImageAlt}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <p className="text-xl font-semibold text-gray-900 leading-tight">
                  {details.name}
                </p>
                <p className="text-sm text-gray-600 mt-1">{details.location}</p>
              </div>
            </div>
          )}

          <div className="w-full bg-red-50 h-min rounded-xl p-6 shadow-md text-sm text-gray-800">
            <h3 className="font-semibold mb-4 text-xl">
              Have Additional Questions?
            </h3>

            <div className="flex flex-col space-y-2 items-start text-lg">
              <span className="flex items-center gap-2">
                <Phone
                  className="h-5 w-5 text-red-900"
                  aria-label="Phone icon"
                />
                {details.contact?.phone ? (
                  <a className="text-sm " href={`tel:${details.contact.phone}`}>
                    {details.contact.phone}
                  </a>
                ) : (
                  <span className="text-sm text-gray-600">Not available</span>
                )}
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-red-900" aria-label="Mail icon" />
                {details.contact?.email ? (
                  <a
                    className="text-sm"
                    href={`mailto:${details.contact.email}`}
                  >
                    {details.contact.email}
                  </a>
                ) : (
                  <span className="text-sm text-gray-600">Not available</span>
                )}
              </span>
              <span className="flex items-center gap-2">
                <MapPin
                  className="h-5 w-5 text-red-900"
                  aria-label="Location icon"
                />
                <span className="text-sm">{details.location}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OutpatientCenterDetails;
