import { ClinicalService } from "@/types";
import Heading from "../Heading";
import { Mail, MapPin, Phone } from "lucide-react";
import ClientsSay from "../ClientsSay";
import { Link } from "react-router";

export interface ServiceTemplateProps {
  serviceTypes: ClinicalService;
}

const ServiceTemplate: React.FC<ServiceTemplateProps> = ({ serviceTypes }) => {
  const {
    images,
    title,
    tagline,
    detailedDescription,
    doctors,
    contact,
    features,
    testimonials,
    locations,
  } = serviceTypes;

  const mainImage = images?.[0];

  return (
    <>
      {mainImage && (
        <Heading
          image_url={mainImage.url}
          title={title}
          description={tagline}
          style="background"
        />
      )}

      {/* Main Content (Simple Professional Layout) */}
      <div className="bg-white w-full">
        <div className="max-w-6xl mx-auto px-6 py-12">

          {/* Two-column: Main + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">About this service</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{detailedDescription}</p>

              {features && features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key offerings</h3>
                  <ul className="space-y-3">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-red-900 rounded-full flex items-center justify-center mt-1 text-white text-xs">✓</div>
                        <div>
                          <div className="font-medium text-gray-900">{f.title}</div>
                          {f.description && <div className="text-sm text-gray-600">{f.description}</div>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Our Clinic Timings (compact) */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Clinic Timings</h3>
                <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-gray-700">
                        <tr>
                          <th className="px-4 py-3 text-left">Location</th>
                          <th className="px-4 py-3 text-left">Day</th>
                          <th className="px-4 py-3 text-left">Time</th>
                          <th className="px-4 py-3 text-center">Book an appointment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          ((): any[] => {
                            const locs = (locations && locations.length > 0 ? locations.slice() : ["Main Hospital"]);
                            locs.sort((a,b) => a === 'Anderson Specialty' ? -1 : b === 'Anderson Specialty' ? 1 : a.localeCompare(b));

                            const rows: any[] = [];
                            locs.forEach((loc) => {
                              let schedules = (serviceTypes as any).locationTimings?.[loc] as Array<any> | undefined;

                              // If not found, try alternate keys (strip trailing words like 'Clinic', 'OPC', or common punctuation)
                              if ((!schedules || schedules.length === 0) && (serviceTypes as any).locationTimings) {
                                const candidates = [
                                  loc,
                                  loc.replace(/\s*Clinic$/i, '').trim(),
                                  loc.replace(/\s*OPC$/i, '').trim(),
                                  loc.replace(/\s*Outpatient Clinic$/i, '').trim(),
                                  loc.replace(/\s*Clinic$/i, '').replace(/\s*OPC$/i, '').trim(),
                                ];
                                for (const c of candidates) {
                                  if (!c) continue;
                                  const found = (serviceTypes as any).locationTimings?.[c];
                                  if (found && found.length > 0) {
                                    schedules = found as Array<any>;
                                    break;
                                  }
                                }
                              }

                              if (schedules && schedules.length > 0) {
                                schedules.forEach((s, i) => {
                                  // Normalize day and time display: if day is missing (or '—'), try to extract from the from field
                                  let dayDisplay = s.day && String(s.day).trim() && String(s.day).trim() !== '—' ? String(s.day).trim() : '';
                                  let fromRaw = s.from ? String(s.from) : '';
                                  let toRaw = s.to ? String(s.to) : '';

                                  // If day is empty, look for weekday name in the fromRaw string (e.g. 'Fridays 9am – 11am (Room 6)')
                                  if (!dayDisplay) {
                                    const dayMatch = fromRaw.match(/\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Mon|Tue|Wed|Thu|Fri|Sat|Sun)s?\b/i);
                                    if (dayMatch) {
                                      // Normalize to singular day name (e.g. 'Fridays' -> 'Friday')
                                      dayDisplay = dayMatch[1].replace(/s$/i, '');
                                      fromRaw = fromRaw.replace(dayMatch[0], '').trim();
                                    }
                                  }

                                  // Remove room numbers or parenthetical notes from time strings
                                  fromRaw = fromRaw.replace(/\s*\([^)]*\)/g, '').trim();
                                  toRaw = toRaw.replace(/\s*\([^)]*\)/g, '').trim();

                                  // If there's no explicit toRaw but fromRaw contains a range like '9am – 11am', split it
                                  if ((!toRaw || toRaw === '') && /\d/.test(fromRaw) && /[-–—]/.test(fromRaw)) {
                                    const parts = fromRaw.split(/[-–—]/).map(p => p.trim());
                                    if (parts.length >= 2) {
                                      fromRaw = parts[0];
                                      toRaw = parts[1];
                                    }
                                  }

                                  // Remove any lingering weekday words from the time strings
                                  const weekdayRegex = /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Mon|Tue|Wed|Thu|Fri|Sat|Sun)s?\b/i;
                                  fromRaw = fromRaw.replace(weekdayRegex, '').trim();
                                  toRaw = toRaw.replace(weekdayRegex, '').trim();

                                  rows.push(
                                    <tr key={`${loc}-${i}`} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                          <td className="px-4 py-3 font-medium text-gray-900">{i === 0 ? loc : ''}</td>
                                          <td className="px-4 py-3 text-gray-700">{dayDisplay || '—'}</td>
                                          <td className="px-4 py-3 text-gray-700">{fromRaw}{toRaw ? ` — ${toRaw}` : ''}</td>
                                          <td className="px-4 py-3 text-center">
                                            <Link to={`/booking?serviceId=${serviceTypes.id}&location=${encodeURIComponent(loc)}&day=${encodeURIComponent(dayDisplay || '')}`} className="text-red-900 font-medium">Book Appointment →</Link>
                                          </td>
                                        </tr>
                                  );
                                });
                              } else {
                                // No structured location timings: try to parse `timingsOnOverview` for day and times
                                const overview = (serviceTypes.timingsOnOverview || 'Contact clinic').replace(/\s*\([^)]*\)/g, '').trim();
                                let dayDisplay = '';
                                let timeDisplay = overview;
                                const dayMatch = overview.match(/\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Mon|Tue|Wed|Thu|Fri|Sat|Sun)s?\b/i);
                                if (dayMatch) {
                                  dayDisplay = dayMatch[1].replace(/s$/i, '');
                                  timeDisplay = overview.replace(dayMatch[0], '').trim();
                                  // Clean leading separators
                                  timeDisplay = timeDisplay.replace(/^[:,-–—\s]+/, '').trim();
                                }

                                // Remove any weekday words left in the timeDisplay
                                timeDisplay = timeDisplay.replace(/\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Mon|Tue|Wed|Thu|Fri|Sat|Sun)s?\b/i, '').trim();

                                // If timeDisplay contains a range embedded, normalize spacing
                                timeDisplay = timeDisplay.replace(/\s*[-–—]\s*/g, ' — ');

                                rows.push(
                                  <tr key={loc} className="bg-white hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">{loc}</td>
                                    <td className="px-4 py-3 text-gray-700">{dayDisplay || '—'}</td>
                                    <td className="px-4 py-3 text-gray-700">{timeDisplay || overview || 'Contact clinic'}</td>
                                    <td className="px-4 py-3 text-center">
                                      <Link to={`/booking?serviceId=${serviceTypes.id}&location=${encodeURIComponent(loc)}`} className="text-red-900 font-medium">Book Appointment →</Link>
                                    </td>
                                  </tr>
                                );
                              }
                            });

                            return rows;
                          })()
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Team (two aligned cards) */}
              {doctors && doctors.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Specialists</h3>
                  <p className="text-sm text-gray-600 mb-4">Experienced clinical team delivering compassionate care.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {doctors.slice(0,2).map((d, idx) => (
                      <div key={idx} className="flex gap-4 items-start bg-gray-50 rounded-lg p-4">
                        {d.image ? (
                          <img src={d.image} alt={d.name} className="w-16 h-16 rounded-full object-cover" />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">Dr</div>
                        )}
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{d.name}</div>
                          <div className="text-xs text-gray-600 mb-2">{d.title}</div>
                          {d.bio && <div className="text-sm text-gray-700">{d.bio}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-4">
              {/* Image card (separate) */}
              {mainImage && (
                <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                  <img src={mainImage.url} alt={mainImage.alt || title} className="w-full h-48 object-cover" />
                  <div className="p-3">
                    <div className="text-sm font-medium text-gray-900">Neurologist consulting patient</div>
                    <div className="text-xs text-gray-500">{mainImage.alt || title}</div>
                  </div>
                </div>
              )}

              {/* Contact card (separate) */}
              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Contact</h4>
                <div className="space-y-3 mb-4">
                  <a href={`tel:${contact?.phone?.trim() || "+254700000001"}`} className="flex items-center gap-3 text-sm text-gray-700">
                    <Phone className="h-4 w-4 text-red-900" />
                    <span className="font-medium">{contact?.phone?.trim() || "+254 700 000 001"}</span>
                  </a>
                  <a href={`mailto:${contact?.email?.trim() || "neurology@nbihosp.org"}`} className="flex items-center gap-3 text-sm text-gray-700">
                    <Mail className="h-4 w-4 text-red-900" />
                    <span className="font-medium">{contact?.email?.trim() || "neurology@nbihosp.org"}</span>
                  </a>
                  <div className="flex items-start gap-3 text-sm text-gray-700">
                    <MapPin className="h-4 w-4 text-red-900 mt-0.5" />
                    <span className="font-medium">{(locations && locations.length > 0) ? locations.join(", ") : "Anderson Specialty, Main Hospital, Capital Center OPC"}</span>
                  </div>
                </div>

                {/* Booking via the booking flow is available from the clinic timings table; contact card button removed as requested. */}
              </div>

              {/* Explore Speciality Clinics */}
              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Explore Speciality Clinics</h4>
                <p className="text-sm text-gray-600 mb-3">Browse all speciality clinics under Anderson Specialty.</p>
                <Link to={`/clinical-services`} className="text-red-900 font-medium">View clinics →</Link>
              </div>
            </aside>
          </div>

          {/* Full-width testimonials */}
          {testimonials && testimonials.length > 0 && (
            <div className="mt-8">
              <ClientsSay title="What Our Patients Say" testimonials={testimonials.map(t => ({ quote: t.quote, name: t.name, avatar: t.image, subtitle: t.title }))} />
            </div>
          )}

        </div>

      </div>
    </>
  );
};

export default ServiceTemplate;
