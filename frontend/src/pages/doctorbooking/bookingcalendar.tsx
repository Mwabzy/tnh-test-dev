import React, { useState, useMemo, useEffect } from "react";
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
            className="rounded-xl border-2 border-gray-200 p-4 mx-auto w-fit max-w-sm shadow-md"
            disabled={(date: Date) => date < new Date() || (isDateAvailable ? !isDateAvailable(date) : false)}
            showOutsideDays={true}
            classNames={{
              month: "space-y-4",
              cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
              day: "inline-flex items-center justify-center rounded-lg text-sm font-normal h-11 w-11 p-0 hover:bg-red-50 hover:text-red-900 focus:bg-red-50 focus:text-red-900 transition-all aria-selected:opacity-100",
              day_selected: "bg-red-900 text-white hover:bg-red-800 focus:bg-red-800 font-semibold shadow-md",
              day_today: "bg-red-100 text-red-900 font-semibold border-2 border-red-900",
              day_outside: "text-muted-foreground opacity-50 aria-selected:bg-red-100/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
              day_disabled: "text-muted-foreground opacity-30",
            }}
          />
        </div>

        {/* Available Times */}
        {selectedDate && (
          <div className="flex-1 min-w-0 w-full">
            <h3 className="text-xl font-semibold mb-2 text-red-900">Available Times</h3>
            <p className="text-sm text-gray-500 mb-4 font-medium">
              📅 {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            {availableSlots.length === 0 ? (
              <div className="text-sm text-gray-500 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                ⏰ No slots available for this date and location. Please select another date.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => onTimeSelected?.(time)}
                    className={`px-4 py-3 text-sm rounded-lg font-semibold border-2 transition-all duration-300 ${selectedTime === time ? 'bg-red-900 text-white border-red-900 shadow-md scale-105' : 'bg-white border-gray-200 hover:bg-red-50 hover:border-red-300 hover:shadow-md'}`}
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

  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
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

  // Helper: parse query params for location/day/date/time and prefill state
  useEffect(() => {
    // location param
    const locParam = searchParams.get("location");
    const dayParam = searchParams.get("day");
    const dateParam = searchParams.get("date");
    const timeParam = searchParams.get("time");
    const serviceParam = searchParams.get("service");

    if (locParam) {
      try {
        setSelectedLocation(decodeURIComponent(locParam));
      } catch (e) {
        setSelectedLocation(locParam);
      }
    }

    // If a precise ISO date was passed, use it. Otherwise if a weekday name was passed, pick the next date for that weekday.
    if (dateParam) {
      const parsed = new Date(dateParam);
      if (!isNaN(parsed.getTime())) {
        setSelectedDate(parsed);
      }
    } else if (dayParam) {
      const wk = parseWeekday(dayParam);
      if (wk !== null) {
        const next = nextDateForWeekday(wk);
        setSelectedDate(next);
      }
    }

    if (timeParam) {
      setSelectedTime(timeParam);
    }

    if (serviceParam && !isDoctorBooking) {
      const sid = Number(serviceParam);
      if (!isNaN(sid)) setSelectedServiceId(sid);
    }

    // Service selection is now always blank - user must select manually
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorInfo]);

  // Helper functions
  const weekdays: { [k: string]: number } = {
    sunday: 0,
    sun: 0,
    monday: 1,
    mon: 1,
    tuesday: 2,
    tue: 2,
    wednesday: 3,
    wed: 3,
    thursday: 4,
    thu: 4,
    friday: 5,
    fri: 5,
    saturday: 6,
    sat: 6,
  };

  function parseWeekday(input: string | null): number | null {
    if (!input) return null;
    const key = input.trim().toLowerCase();
    return weekdays[key] ?? null;
  }

  function nextDateForWeekday(weekdayIndex: number): Date {
    const now = new Date();
    const today = now.getDay();
    let diff = weekdayIndex - today;
    if (diff <= 0) diff += 7; // next occurrence (not today)
    const result = new Date(now);
    result.setDate(now.getDate() + diff);
    result.setHours(9, 0, 0, 0);
    return result;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-red-900 mb-2">
            {isDoctorBooking ? `Book with ${doctorInfo?.name}` : "Book an Appointment"}
          </h1>
          <p className="text-lg text-gray-600">
            A simple, secure booking experience — follow the steps below to schedule your appointment.
          </p>
        </div>

        {/* Enhanced Step Indicator with Icons */}
        <div className="mb-10">
          <div className="flex gap-0 items-center justify-between max-w-2xl">
            {/* Step 1 */}
            <div className="flex flex-col items-center flex-1">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-300 ${(isDoctorBooking || selectedServiceId) ? 'bg-red-900 shadow-lg scale-110' : 'bg-gray-300'}`}>
                <span>1</span>
              </div>
              <p className="text-xs font-semibold mt-2 text-gray-700 text-center">Service</p>
            </div>

            {/* Connector 1-2 */}
            <div className={`flex-1 h-1 mx-2 transition-all duration-300 ${(isDoctorBooking || selectedServiceId) ? 'bg-red-900' : 'bg-gray-300'}`}></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center flex-1">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-300 ${selectedLocation ? 'bg-red-900 shadow-lg scale-110' : 'bg-gray-300'}`}>
                <span>2</span>
              </div>
              <p className="text-xs font-semibold mt-2 text-gray-700 text-center">Clinic</p>
            </div>

            {/* Connector 2-3 */}
            <div className={`flex-1 h-1 mx-2 transition-all duration-300 ${selectedLocation ? 'bg-red-900' : 'bg-gray-300'}`}></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center flex-1">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-300 ${selectedDate ? 'bg-red-900 shadow-lg scale-110' : 'bg-gray-300'}`}>
                <span>3</span>
              </div>
              <p className="text-xs font-semibold mt-2 text-gray-700 text-center">Date & Time</p>
            </div>

            {/* Connector 3-4 */}
            <div className={`flex-1 h-1 mx-2 transition-all duration-300 ${selectedDate && selectedTime ? 'bg-red-900' : 'bg-gray-300'}`}></div>

            {/* Step 4 */}
            <div className="flex flex-col items-center flex-1">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-300 ${selectedTime ? 'bg-red-900 shadow-lg scale-110' : 'bg-gray-300'}`}>
                <span>4</span>
              </div>
              <p className="text-xs font-semibold mt-2 text-gray-700 text-center">Details</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: main flow */}
        <div className="lg:col-span-2 space-y-6">
          {/* Doctor Info / Service Summary */}
          {isDoctorBooking && doctorInfo && (
            <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-xl shadow-md border-l-4 border-red-900 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-900 flex items-center justify-center text-white text-xl font-bold">
                  👨‍⚕️
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-red-900">{doctorInfo.name}</h3>
                  <p className="text-sm text-red-700 font-medium">{doctorInfo.title}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-semibold">Available at:</span> {doctorInfo.locations.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Service / Clinic selection */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            {!isDoctorBooking && (
              <div className="mb-6">
                <label className="block font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-900 text-white text-xs flex items-center justify-center">1</span>
                  Select Service
                </label>
                <select
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-red-900 focus:ring-2 focus:ring-red-100 transition font-medium"
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
              <div className="mb-6">
                <label className="block font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-900 text-white text-xs flex items-center justify-center">1</span>
                  Select Service
                </label>
                <select
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-red-900 focus:ring-2 focus:ring-red-100 transition font-medium"
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
                <label className="block font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-900 text-white text-xs flex items-center justify-center">2</span>
                  Select Clinic
                </label>
                <select
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-red-900 focus:ring-2 focus:ring-red-100 transition font-medium"
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
              <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200 text-sm text-blue-700 font-medium">
                ℹ️ Step 2: Select a service first to choose a clinic.
              </div>
            )}
          </div>

          {/* Calendar and time slots */}
          {selectedLocation ? (
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-900 text-white text-xs flex items-center justify-center">3</span>
                Select Date & Time
              </h2>
              <CalendarWithTimes
                onDateSelected={(d) => setSelectedDate(d)}
                selectedTime={selectedTime}
                onTimeSelected={(t) => setSelectedTime(t)}
                availableSlots={availableSlots}
                isDateAvailable={(d) => getSlotsForDate(d, selectedLocation).length > 0}
              />
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-md border-2 border-dashed border-gray-300">
              <h2 className="text-lg font-semibold mb-2 text-gray-600 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gray-300 text-white text-xs flex items-center justify-center">3</span>
                Select Date & Time
              </h2>
              <p className="text-sm text-gray-500">Choose a service and clinic to see available dates and times.</p>
            </div>
          )}
        </div>

        {/* Right column: details form */}
        <aside className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 sticky top-4">
            <h4 className="font-semibold text-lg mb-4 text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-red-900 text-white text-xs flex items-center justify-center">4</span>
              Your Details
            </h4>
            {isReadyForDetails ? (
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleConfirm(); }}>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 focus:border-red-900 focus:ring-2 focus:ring-red-100 transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input placeholder="+254 700 000 000" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 focus:border-red-900 focus:ring-2 focus:ring-red-100 transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 focus:border-red-900 focus:ring-2 focus:ring-red-100 transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes (Optional)</label>
                  <textarea placeholder="Describe your symptoms or any special requirements..." value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} rows={4} className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 focus:border-red-900 focus:ring-2 focus:ring-red-100 transition resize-none" />
                </div>

                {/* Booking Summary Preview */}
                <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg border border-red-200 my-4">
                  <h5 className="font-semibold text-red-900 mb-2 text-sm">📋 Booking Summary</h5>
                  <div className="space-y-1 text-xs text-red-800">
                    <p><span className="font-semibold">Service:</span> {isDoctorBooking ? selectedService : selectedServiceFromList?.title}</p>
                    <p><span className="font-semibold">Location:</span> {selectedLocation}</p>
                    <p><span className="font-semibold">Date:</span> {selectedDate?.toDateString()}</p>
                    <p><span className="font-semibold">Time:</span> {selectedTime}</p>
                    {isDoctorBooking && <p><span className="font-semibold">Doctor:</span> {doctorInfo?.name}</p>}
                  </div>
                </div>

                <button type="submit" disabled={!name || !phone || !email} className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${(!name || !phone || !email) ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-red-900 to-red-800 text-white hover:shadow-lg hover:scale-105 active:scale-95'}`}>
                  ✓ Confirm Booking
                </button>
              </form>
            ) : (
              <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <p className="text-sm text-blue-700 font-medium">ℹ️ Select a date and time in the calendar to proceed with entering your details.</p>
              </div>
            )}
          </div>
        </aside>
      </div>
      </div>
    </div>
  );
};

export default BookingPage;
