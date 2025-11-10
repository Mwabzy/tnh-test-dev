import React, { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useLocation, useNavigate } from "react-router";
import clinicalServices from "@/data/clinicalServices2.json";
import { ClinicalService } from "@/types";
import { teamMembers } from "@/pages/about/DoctorProfiles";

interface CalendarWithTimesProps {
  onDateSelected?: (date: Date) => void;
  selectedTime?: string | null;
  onTimeSelected?: (time: string) => void;
}

const CalendarWithTimes: React.FC<CalendarWithTimesProps> = ({
  onDateSelected,
  selectedTime,
  onTimeSelected,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Example hourly slots (customize as needed)
  const timeSlots = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`); // 8 AM to 8 PM

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onDateSelected?.(date);
    }
  };

  return (
    <div className="mt-5 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Calendar - larger size with proper spacing */}
        <div className="shrink-0 w-full lg:w-auto">
          <Calendar
            mode="single"
            selected={selectedDate || undefined}
            onSelect={handleDateChange}
            className="rounded-md border p-6 mx-auto w-fit"
            disabled={(date: Date) => date < new Date()}
            showOutsideDays={true}
            classNames={{
              month: "space-y-4",
              caption_label: "text-lg font-semibold text-gray-800",
              table: "w-full border-collapse mt-2",
              head_row: "flex mb-2",
              head_cell:
                "text-muted-foreground rounded-md w-14 font-medium text-sm py-2 text-center",
              row: "flex w-full mt-1",
              cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
              day: "inline-flex items-center justify-center rounded-md text-sm font-normal h-14 w-14 p-0 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground transition-colors aria-selected:opacity-100",
              day_selected:
                "bg-red-900 text-white hover:bg-red-800 focus:bg-red-800 font-semibold",
              day_today: "bg-accent text-accent-foreground font-semibold",
              day_outside:
                "text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
              day_disabled: "text-muted-foreground opacity-50",
            }}
          />
        </div>

        {/* Available Times */}
        {selectedDate && (
          <div className="flex-1 min-w-0 w-full">
            <h3 className="text-xl font-semibold mb-4 text-red-900">
              Available times
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              {selectedDate.toDateString()}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-2xl">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => onTimeSelected?.(time)}
                  className={`px-4 py-3 border rounded-md text-center font-medium transition-all duration-200 ${
                    selectedTime === time
                      ? "bg-red-900 text-white border-red-900"
                      : "border-gray-300 hover:bg-red-50 hover:border-red-300 hover:shadow-sm"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
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
    };

    console.log("Booking confirmed", booking);
    const confirmationMessage = isDoctorBooking
      ? `Booking confirmed with ${booking.doctor} for ${booking.service} on ${booking.date} at ${booking.time} at ${booking.location}`
      : `Booking confirmed for ${booking.service} on ${booking.date} at ${booking.time} at ${booking.location}`;

    alert(confirmationMessage);
    // Optionally navigate to a thank-you page or reset state
    navigate("/", { replace: true });
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-semibold text-red-900 mb-4">
        {isDoctorBooking
          ? `Book with ${doctorInfo?.name}`
          : "Book an Appointment"}
      </h2>

      {/* Doctor Information (when booking from doctor profile) */}
      {isDoctorBooking && doctorInfo && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="font-semibold text-lg text-red-800">
            {doctorInfo.name}
          </h3>
          <p className="text-sm text-gray-700">{doctorInfo.title}</p>
          <p className="text-sm text-gray-600 mt-2">
            Available at: {doctorInfo.locations.join(", ")}
          </p>
        </div>
      )}

      {/* Service selector for doctor bookings */}
      {isDoctorBooking && doctorInfo && (
        <div className="mb-6">
          <label className="block font-medium mb-2">Select Clinic</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedService ?? ""}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="">-- choose a service --</option>
            {doctorInfo.services.map((service, idx) => (
              <option key={idx} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Service selector if none provided (regular service booking) */}
      {!isDoctorBooking && !selectedServiceFromList && (
        <div className="mb-6">
          <label className="block font-medium mb-2">Select Service</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedServiceId ?? ""}
            onChange={(e) => setSelectedServiceId(Number(e.target.value))}
          >
            <option value="">-- choose a service --</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Show selected service summary (regular service booking) */}
      {!isDoctorBooking && selectedServiceFromList && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="font-semibold text-lg">
            {selectedServiceFromList.title}
          </h3>
          <p className="text-sm text-gray-700">
            {selectedServiceFromList.overview}
          </p>
          {selectedServiceFromList.locations && (
            <p className="text-sm text-gray-600 mt-2">
              Available at: {selectedServiceFromList.locations.join(", ")}
            </p>
          )}
        </div>
      )}

      {/* Location selector for doctor bookings */}
      {isDoctorBooking && doctorInfo && selectedService && (
        <div className="mb-6">
          <label className="block font-medium mb-2">Select Location</label>
          <div className="flex gap-3 flex-wrap">
            {doctorInfo.locations.map((loc: string) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`px-4 py-2 rounded border ${
                  selectedLocation === loc
                    ? "bg-red-900 text-white border-red-900"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Location selector for regular service bookings */}
      {!isDoctorBooking && selectedServiceFromList && (
        <div className="mb-6">
          <label className="block font-medium mb-2">Select Location</label>
          <div className="flex gap-3 flex-wrap">
            {(selectedServiceFromList.locations || []).map((loc: string) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`px-4 py-2 rounded border ${
                  selectedLocation === loc
                    ? "bg-red-900 text-white border-red-900"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Calendar and time slots once location selected */}
      {selectedLocation && (
        <div className="mb-6">
          <CalendarWithTimes
            onDateSelected={(d) => setSelectedDate(d)}
            selectedTime={selectedTime}
            onTimeSelected={(t) => setSelectedTime(t)}
          />
        </div>
      )}

      {/* User details */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h4 className="font-semibold mb-3">Your details</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleConfirm}
          className="px-4 py-2 bg-red-900 text-white rounded"
        >
          Confirm Booking
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
