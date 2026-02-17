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
import { fetchClinicalServices, fetchOutpatientCenter } from "@/api/api";

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

type Opc = {
  id: number;
  slug?: string | null;
  name: string;
  description: string;
  contact?: Contact;
  location: string;
  servicesOffered: number[];
  timings: Array<{
    clinicId: number | null;
    day: string;
    month: string;
    startTime: string;
    stopTime: string;
  }>;
};

const OutpatientCenterDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState<Opc | null>(null);
  const [services, setServices] = useState<ServiceSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

    const loadDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchOutpatientCenter();
        const list = Array.isArray(data)
          ? data
          : data?.results ?? data?.data ?? [];
        const found = list.find(
          (item: any) =>
            String(item.slug ?? item.id) === String(id ?? ""),
        );

        if (!found) {
          setDetails(null);
          setError("Service not found.");
          return;
        }

        const timingServiceIds = Array.isArray(found.timings)
          ? found.timings
              .map((timing: any) => {
                const clinicRaw =
                  timing?.clinicId ??
                  timing?.clinic_id ??
                  timing?.clinic?.id ??
                  timing?.clinic ??
                  null;
                const clinicNumber = Number(clinicRaw);
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
              .filter((serviceId: any) =>
                Number.isFinite(Number(serviceId)),
              )
              .map((serviceId: any) => Number(serviceId))
          : [];

        const mergedServiceIds = Array.from(
          new Set([...declaredServiceIds, ...timingServiceIds]),
        );

        const mapped: Opc = {
          id: found.id,
          slug: found.slug ?? null,
          name: found.name ?? found.title ?? "",
          description: found.description ?? "",
          contact: parseContact(found.contact),
          location: found.location ?? "",
          servicesOffered: mergedServiceIds,
          timings: Array.isArray(found.timings)
            ? found.timings.map((timing: any) => {
                const clinicRaw =
                  timing?.clinicId ??
                  timing?.clinic_id ??
                  timing?.clinic?.id ??
                  timing?.clinic ??
                  null;
                const clinicNumber = Number(clinicRaw);
                return {
                  clinicId: Number.isFinite(clinicNumber) ? clinicNumber : null,
                  day: String(timing?.day ?? "").trim(),
                  month: String(timing?.month ?? "").trim(),
                  startTime: String(
                    timing?.startTime ?? timing?.start_time ?? "",
                  ).trim(),
                  stopTime: String(
                    timing?.stopTime ?? timing?.stop_time ?? "",
                  ).trim(),
                };
              })
            : [],
        };

        setDetails(mapped);
        setError(null);

        if (mapped.servicesOffered.length > 0) {
          const servicesData = await fetchClinicalServices();
          const serviceList = Array.isArray(servicesData)
            ? servicesData
            : servicesData?.results ?? servicesData?.data ?? [];
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
          const matched = mapped.servicesOffered
            .map((serviceId) => byId.get(serviceId))
            .filter(Boolean) as ServiceSummary[];
          setServices(matched);
        } else {
          setServices([]);
        }
      } catch {
        setError("Failed to load outpatient center.");
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [id]);

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

    return map;
  }, [details?.timings]);

  if (loading)
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

  return (
    <>
      <section className="bg-red-900 text-white p-5 md:p-16  ">
        <div className="grid md:grid-cols gap-2 lg:px-36">
          {/* Text Content */}
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
                              const dayPart = timing.day || "Day not set";
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
        <div className="w-full lg:w-[300px] bg-red-50 h-min rounded-xl p-6 shadow-md text-sm text-gray-800">
          <h3 className="font-semibold mb-4 text-xl">
            Have Additional Questions?
          </h3>

          <div className="flex flex-col space-y-2 items-start text-lg">
            <span className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-red-900" aria-label="Phone icon" />
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
    </>
  );
};

export default OutpatientCenterDetails;
