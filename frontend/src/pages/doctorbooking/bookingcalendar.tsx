import React, { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useLocation, useNavigate } from "react-router";
import clinicalServices from "@/data/clinicalServices2.json";
import clinicTimings from "@/data/clinicTimings.json";
import { ClinicalService } from "@/types";
import { teamMembers } from "@/pages/about/DoctorProfiles";

interface CalendarWithTimesProps {
  onDateSelected?: (date: Date) => void;
  selectedTime?: string | null;
  onTimeSelected?: (time: string) => void;
  availableSlots?: string[];
  isDateAvailable?: (date: Date) => boolean;
}

const CalendarWithTimes: React.FC<CalendarWithTimesProps> = ({
  onDateSelected,
  selectedTime,
  onTimeSelected,
  availableSlots = [],
  isDateAvailable,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onDateSelected?.(date);
    }
  };

  return (
    <div className="mt-5 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <div className="shrink-0 w-full lg:w-auto">
          <Calendar
            mode="single"
            selected={selectedDate || undefined}
            onSelect={handleDateChange}
            className="rounded-md border p-4 mx-auto w-fit max-w-sm"
            disabled={(date: Date) => date < new Date() || (isDateAvailable ? !isDateAvailable(date) : false)}
            showOutsideDays={true}
            classNames={{
              month: "space-y-4",
              cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
              day: "inline-flex items-center justify-center rounded-md text-sm font-normal h-11 w-11 p-0 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground transition-colors aria-selected:opacity-100",
              day_selected: "bg-red-900 text-white hover:bg-red-800 focus:bg-red-800 font-semibold",
              day_today: "bg-accent text-accent-foreground font-semibold",
              day_outside: "text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
              day_disabled: "text-muted-foreground opacity-50",
            }}
          />
        </div>

        {/* Available Times */}
        {selectedDate && (
          <div className="flex-1 min-w-0 w-full">
            <h3 className="text-xl font-semibold mb-2 text-red-900">Available times</h3>
            <p className="text-sm text-gray-600 mb-4">{selectedDate.toDateString()}</p>

            {availableSlots.length === 0 ? (
              <div className="text-sm text-gray-500">No slots available for this date and location.</div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {availableSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => onTimeSelected?.(time)}
                    className={`px-4 py-3 text-sm rounded-md border transition ${selectedTime === time ? 'bg-red-900 text-white border-red-900' : 'bg-white border-gray-200 hover:bg-red-50 hover:border-red-300'}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const BookingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  // Check if booking from service or doctor
  const serviceIdParam = searchParams.get("serviceId");
  const doctorIdParam = searchParams.get("doctorId");
  const doctorNameParam = searchParams.get("doctorName");
  const doctorTitleParam = searchParams.get("doctorTitle");

  const serviceId = serviceIdParam ? Number(serviceIdParam) : null;
  const isDoctorBooking = Boolean(doctorIdParam);

  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    serviceId
  );
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const services = clinicalServices as ClinicalService[];

  const selectedServiceFromList = useMemo(
    () => services.find((s) => s.id === selectedServiceId) || null,
    [services, selectedServiceId]
  );

  // Get doctor information for doctor bookings
  const doctorInfo = useMemo(() => {
    if (!isDoctorBooking || !doctorIdParam) return null;

    const doctor = teamMembers.find((member) => member.id === doctorIdParam);

    if (doctor) {
      return {
        id: doctor.id,
        name: doctor.name,
        title: doctor.title,
        services:
          doctor.servicesOffered.length > 0
            ? doctor.servicesOffered
            : [
                "General Consultation",
                "Follow-up Consultation",
                "Specialist Assessment",
                "Treatment Planning",
              ],
        locations: [doctor.location], // Use the doctor's primary location
      };
    }

    // Fallback if doctor not found
    return {
      id: doctorIdParam,
      name: doctorNameParam || "Doctor",
      title: doctorTitleParam || "Specialist",
      services: [
        "General Consultation",
        "Follow-up Consultation",
        "Specialist Assessment",
        "Treatment Planning",
      ],
      locations: ["Main Hospital"],
    };
  }, [isDoctorBooking, doctorIdParam, doctorNameParam, doctorTitleParam]);

  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  // derived UI state
  const isReadyForDetails = Boolean(selectedLocation && selectedDate && selectedTime);

  const handleConfirm = () => {
    // For now, just show a simple mock confirmation. Integration with backend can be added later.
    const serviceName = isDoctorBooking
      ? selectedService
      : selectedServiceFromList?.title;

    if (!serviceName || !selectedLocation || !selectedDate || !selectedTime) {
      alert(
        "Please select service, location, date and time before confirming."
      );
      return;
    }

    const booking = {
      service: serviceName,
      doctor: isDoctorBooking ? doctorInfo?.name : undefined,
      location: selectedLocation,
      date: selectedDate.toDateString(),
      time: selectedTime,
      name,
      phone,
      email,
      additionalInfo,
    };

    console.log("Booking confirmed", booking);
    const confirmationMessage = isDoctorBooking
      ? `Booking confirmed with ${booking.doctor} for ${booking.service} on ${booking.date} at ${booking.time} at ${booking.location}`
      : `Booking confirmed for ${booking.service} on ${booking.date} at ${booking.time} at ${booking.location}`;

    alert(confirmationMessage);
    // Optionally navigate to a thank-you page or reset state
    navigate("/", { replace: true });
  };

  // Helper: compute slots for an arbitrary date + location using clinicTimings
  const getSlotsForDate = (date: Date | null, location: string | null) => {
    if (!date || !location) return [] as string[];
    try {
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

      const svcId = selectedServiceId ?? (serviceId ?? null);
      if (svcId && (clinicTimings as any).services && (clinicTimings as any).services[svcId]) {
        const byLocation = (clinicTimings as any).services[svcId];
        const normalize = (s: string) => s.trim().toLowerCase();

        // Try exact key
        const exactKey = Object.keys(byLocation).find((k) => normalize(k) === normalize(location));
        if (exactKey && byLocation[exactKey] && byLocation[exactKey][dayName]) {
          return byLocation[exactKey][dayName] as string[];
        }

        // If location contains multiple comma-separated names, try each
        const candidates = location.split(",").map((s) => s.trim()).filter(Boolean);
        for (const cand of candidates) {
          const key = Object.keys(byLocation).find((k) => normalize(k) === normalize(cand));
          if (key && byLocation[key] && byLocation[key][dayName]) return byLocation[key][dayName] as string[];
        }

        // Try fuzzy includes
        const fuzzyKey = Object.keys(byLocation).find((k) => normalize(k).includes(normalize(location)) || normalize(location).includes(normalize(k)));
        if (fuzzyKey && byLocation[fuzzyKey] && byLocation[fuzzyKey][dayName]) {
          return byLocation[fuzzyKey][dayName] as string[];
        }

        // fallback to any location that has the day
        for (const l in byLocation) {
          if (Object.prototype.hasOwnProperty.call(byLocation, l)) {
            const loc = byLocation[l];
            if (loc && loc[dayName] && loc[dayName].length) return loc[dayName] as string[];
          }
        }
      }

      return [] as string[];
    } catch (e) {
      return [] as string[];
    }
  };

  // compute available slots for selected date & location using clinicTimings
  const availableSlots = useMemo(() => {
    return getSlotsForDate(selectedDate, selectedLocation);
  }, [selectedDate, selectedLocation, selectedServiceId, serviceId]);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-red-900">
          {isDoctorBooking ? `Book with ${doctorInfo?.name}` : "Book an Appointment"}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          A simple, secure booking experience — choose a service or doctor, pick a clinic, then select a convenient date and time.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex gap-2 mb-8 text-sm">
        <span className={`px-3 py-1 rounded-full ${(isDoctorBooking || selectedServiceId) ? 'bg-red-900 text-white' : 'bg-gray-200 text-gray-700'}`}>1. Service</span>
        <span className={`px-3 py-1 rounded-full ${selectedLocation ? 'bg-red-900 text-white' : 'bg-gray-200 text-gray-700'}`}>2. Clinic</span>
        <span className={`px-3 py-1 rounded-full ${selectedDate ? 'bg-red-900 text-white' : 'bg-gray-200 text-gray-700'}`}>3. Date</span>
        <span className={`px-3 py-1 rounded-full ${selectedTime ? 'bg-red-900 text-white' : 'bg-gray-200 text-gray-700'}`}>4. Time</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: main flow */}
        <div className="lg:col-span-2 space-y-6">
          {/* Doctor Info / Service Summary */}
          {isDoctorBooking && doctorInfo && (
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-start gap-4">
                <div>
                  <h3 className="font-semibold text-lg text-red-800">{doctorInfo.name}</h3>
                  <p className="text-sm text-gray-700">{doctorInfo.title}</p>
                  <p className="text-sm text-gray-600 mt-2">Available at: {doctorInfo.locations.join(", ")}</p>
                </div>
              </div>
            </div>
          )}

          {/* Service / Clinic selection */}
          <div className="bg-white p-4 rounded-lg shadow">
            {!isDoctorBooking && (
              <div className="mb-4">
                <label className="block font-medium mb-2">Step 1: Select Service</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={selectedServiceId ?? ""}
                  onChange={(e) => setSelectedServiceId(Number(e.target.value))}
                >
                  <option value="">-- choose a service --</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>
            )}

            {isDoctorBooking && doctorInfo && (
              <div className="mb-4">
                <label className="block font-medium mb-2">Step 1: Select Service</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={selectedService ?? ""}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <option value="">-- choose a service --</option>
                  {doctorInfo.services.map((service, idx) => (
                    <option key={idx} value={service}>{service}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Location selector - dropdown */}
            {(isDoctorBooking && doctorInfo && selectedService) || (!isDoctorBooking && selectedServiceFromList) ? (
              <div>
                <label className="block font-medium mb-2">Step 2: Select Clinic</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={selectedLocation ?? ""}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">-- choose a clinic --</option>
                  {((isDoctorBooking && doctorInfo ? doctorInfo.locations : selectedServiceFromList?.locations) || []).map((loc: string) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="p-3 bg-gray-100 rounded border border-gray-300 text-sm text-gray-500">
                Step 2: Select a service first to choose a clinic.
              </div>
            )}
          </div>

          {/* Calendar and time slots */}
          {selectedLocation ? (
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Step 3: Select Date & Time</h2>
              <CalendarWithTimes
                onDateSelected={(d) => setSelectedDate(d)}
                selectedTime={selectedTime}
                onTimeSelected={(t) => setSelectedTime(t)}
                availableSlots={availableSlots}
                isDateAvailable={(d) => getSlotsForDate(d, selectedLocation).length > 0}
              />
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2 text-gray-500">Step 3: Select Date & Time</h2>
              <p className="text-sm text-gray-500">Choose a service and clinic to see available dates and times.</p>
            </div>
          )}
        </div>

        {/* Right column: summary & details form */}
        <aside className="space-y-6">
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-lg shadow-md border-l-4 border-red-900">
            <h4 className="font-bold text-lg mb-4 text-red-900">Booking Summary</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 pb-3 border-b border-red-200">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-900 text-white text-sm font-semibold">1</span>
                <div>
                  <p className="text-xs text-red-700 font-semibold uppercase tracking-wide">Service</p>
                  <p className="text-sm font-medium text-red-900">{isDoctorBooking ? (selectedService || '—') : (selectedServiceFromList?.title || '—')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b border-red-200">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-900 text-white text-sm font-semibold">2</span>
                <div>
                  <p className="text-xs text-red-700 font-semibold uppercase tracking-wide">Clinic</p>
                  <p className="text-sm font-medium text-red-900">{selectedLocation || '—'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b border-red-200">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-900 text-white text-sm font-semibold">3</span>
                <div>
                  <p className="text-xs text-red-700 font-semibold uppercase tracking-wide">Date</p>
                  <p className="text-sm font-medium text-red-900">{selectedDate ? selectedDate.toDateString() : '—'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-900 text-white text-sm font-semibold">4</span>
                <div>
                  <p className="text-xs text-red-700 font-semibold uppercase tracking-wide">Time</p>
                  <p className="text-sm font-medium text-red-900">{selectedTime || '—'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold text-md mb-3">Step 4: Your Details</h4>
            {isReadyForDetails ? (
              <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); handleConfirm(); }}>
                <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-3 py-2" />
                <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border rounded px-3 py-2" />
                <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-3 py-2" />
                <textarea placeholder="Additional information (symptoms, notes, preferences)" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} rows={4} className="w-full border rounded px-3 py-2" />

                <button type="submit" disabled={!name || !phone || !email} className={`w-full py-2 rounded ${(!name || !phone || !email) ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-red-900 text-white hover:bg-red-800'}`}>
                  Confirm Booking
                </button>
              </form>
            ) : (
              <div className="p-3 bg-gray-100 rounded border border-gray-300 text-sm text-gray-500">
                Select a date and time to enter your details and confirm the booking.
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BookingPage;
