import React, { useState, useMemo, useEffect, useRef } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useLocation, useNavigate } from "react-router";
import { createBooking, fetchClinicalServices } from "@/api/api"; // Add this import
import { ClinicalService, Doctor } from "@/types";
import { fetchDoctorById } from "@/api/api";
import { useIntlayer } from "react-intlayer";

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
            disabled={(date: Date) =>
              date < new Date() ||
              (isDateAvailable ? !isDateAvailable(date) : false)
            }
            showOutsideDays={true}
            classNames={{
              month: "space-y-4",
              cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
              day: "inline-flex items-center justify-center rounded-lg text-sm font-normal h-11 w-11 p-0 hover:bg-red-50 hover:text-red-900 focus:bg-red-50 focus:text-red-900 transition-all aria-selected:opacity-100",
              day_selected:
                "bg-red-900 text-white hover:bg-red-800 focus:bg-red-800 font-semibold shadow-md",
              day_today:
                "bg-red-100 text-red-900 font-semibold border-2 border-red-900",
              day_outside:
                "text-muted-foreground opacity-50 aria-selected:bg-red-100/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
              day_disabled: "text-muted-foreground opacity-30",
            }}
          />
        </div>

        {/* Available Times */}
        {selectedDate && (
          <div className="flex-1 min-w-0 w-full">
            <h3 className="text-xl font-semibold mb-2 text-red-900">
              Available Times
            </h3>
            <p className="text-sm text-gray-500 mb-4 font-medium">
              📅{" "}
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            {availableSlots.length === 0 ? (
              <div className="text-sm text-gray-500 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                ⏰ No slots available for this date and location. Please select
                another date.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => onTimeSelected?.(time)}
                    className={`px-4 py-3 text-sm rounded-lg font-semibold border-2 transition-all duration-300 ${
                      selectedTime === time
                        ? "bg-red-900 text-white border-red-900 shadow-md scale-105"
                        : "bg-white border-gray-200 hover:bg-red-50 hover:border-red-300 hover:shadow-md"
                    }`}
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

interface BookingPageProps {
  doctors?: Doctor[]; // Pass via props or fetch from API
  services?: ClinicalService[]; // Pass via props or fetch from API
}

const BookingPage: React.FC<BookingPageProps> = ({
  doctors = [],
  services = [],
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const serviceIdParam = searchParams.get("serviceId");
  const doctorIdParam = searchParams.get("doctorId");
  const doctorNameParam = searchParams.get("doctorName");
  const doctorTitleParam = searchParams.get("doctorTitle");

  const [clinicalServices, setClinicalServices] =
    useState<ClinicalService[]>(services);
  const [isLoadingServices, setIsLoadingServices] = useState(false);

  const serviceId = serviceIdParam ? Number(serviceIdParam) : null;
  const isDoctorBooking = Boolean(doctorIdParam);

  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    serviceId,
  );
  const doctorServicesParam = searchParams.get("doctorServices");
  const doctorServices = doctorServicesParam
    ? JSON.parse(decodeURIComponent(doctorServicesParam))
    : [];
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const doctorIdNum = doctorIdParam ? Number(doctorIdParam) : null;

  const [fetchedDoctor, setFetchedDoctor] = useState<Doctor | null>(null);
  const [isLoadingDoctor, setIsLoadingDoctor] = useState(false);

  // Get doctor information
  const doctorInfo = useMemo(() => {
    if (!isDoctorBooking || !doctorIdParam) return null;

    // Priority 1: Use fetched doctor data (has complete services_offered)
    if (fetchedDoctor) {
      console.log("Using fetched doctor:", fetchedDoctor); // Debug log
      return fetchedDoctor;
    }

    // Priority 2: Check props
    const doctor = doctors.find((d) => d.id === doctorIdNum);
    if (doctor) return doctor;

    // Priority 3: Fallback with URL params
    return {
      id: Number(doctorIdParam),
      name: doctorNameParam || "Doctor",
      role: doctorTitleParam || "Specialist",
      services_offered: doctorServices.length > 0 ? doctorServices : [],
      locations: ["Main Hospital"],
      bio: "Biography not available",
    } as Doctor;
  }, [
    isDoctorBooking,
    doctorIdParam,
    fetchedDoctor, // Add this dependency
    doctorNameParam,
    doctorTitleParam,
    doctorServices,
    doctors,
    doctorIdNum,
  ]);

  const selectedServiceFromList = useMemo(
    () => clinicalServices.find((s) => s.id === selectedServiceId) || null,
    [clinicalServices, selectedServiceId],
  );
  const availableLocations = useMemo(() => {
    // Priority 1: If doctor booking AND service is selected, get locations from that service
    if (isDoctorBooking && selectedService && doctorInfo?.services_offered) {
      const matchedService = doctorInfo.services_offered.find(
        (s) => s.title === selectedService,
      );
      if (matchedService?.locations) {
        return matchedService.locations;
      }
    }

    // Priority 2: Service booking flow - get locations from the selected service
    if (selectedServiceFromList) {
      return selectedServiceFromList.locations ?? [];
    }

    // Priority 3: Fallback to doctor's general locations (should rarely reach here)
    if (isDoctorBooking && doctorInfo) {
      return doctorInfo.locations ?? [];
    }

    return [];
  }, [isDoctorBooking, doctorInfo, selectedServiceFromList, selectedService]);

  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const isReadyForDetails = Boolean(
    selectedLocation && selectedDate && selectedTime,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Replace your entire handleConfirm function with this:
  const handleConfirm = async () => {
    const serviceName = isDoctorBooking
      ? selectedService
      : selectedServiceFromList?.title;

    if (!serviceName || !selectedLocation || !selectedDate || !selectedTime) {
      alert(
        "Please select service, location, date and time before confirming.",
      );
      return;
    }

    // Validate user details
    if (!name || !phone || !email) {
      alert("Please fill in all required details (Name, Phone, Email).");
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

    setIsSubmitting(true);
    try {
      const response = await createBooking(booking);
      console.log("Booking created successfully:", response);

      const confirmationMessage = isDoctorBooking
        ? `Booking confirmed with ${booking.doctor} for ${booking.service} on ${booking.date} at ${booking.time} at ${booking.location}`
        : `Booking confirmed for ${booking.service} on ${booking.date} at ${booking.time} at ${booking.location}`;

      alert(confirmationMessage);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSlotsForDate = (date: Date | null, location: string | null) => {
    if (!date || !location) return [] as string[];
    const times = [
      "09:00 AM",
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "01:00 PM",
      "01:30 PM",
      "02:00 PM",
      "02:30 PM",
      "03:00 PM",
      "03:30 PM",
      "04:00 PM",
      "04:30 PM",
    ];
    return times;
  };

  const availableSlots = useMemo(
    () => getSlotsForDate(selectedDate, selectedLocation),
    [selectedDate, selectedLocation],
  );

  // Prefill state from query params
  useEffect(() => {
    const locParam = searchParams.get("location");
    // const dayParam = searchParams.get("day");
    const dateParam = searchParams.get("date");
    const timeParam = searchParams.get("time");
    const serviceParam = searchParams.get("service");

    if (locParam) setSelectedLocation(decodeURIComponent(locParam));
    if (dateParam) {
      const parsed = new Date(dateParam);
      if (!isNaN(parsed.getTime())) setSelectedDate(parsed);
    }
    if (timeParam) setSelectedTime(timeParam);
    if (serviceParam && !isDoctorBooking) {
      const sid = Number(serviceParam);
      if (!isNaN(sid)) setSelectedServiceId(sid);
    }
  }, [doctorInfo]);

  // Fetch clinical services when not in doctor booking mode
  useEffect(() => {
    const loadClinicalServices = async () => {
      if (isDoctorBooking || clinicalServices.length > 0) return;

      setIsLoadingServices(true);
      try {
        const data = await fetchClinicalServices();
        setClinicalServices(data);
      } catch (error) {
        console.error("Error fetching clinical services:", error);
        // Optionally show error message to user
      } finally {
        setIsLoadingServices(false);
      }
    };

    loadClinicalServices();
  }, [isDoctorBooking]);

  useEffect(() => {
    // Auto-select service when serviceId is in URL
    if (serviceId && clinicalServices.length > 0 && !selectedServiceId) {
      setSelectedServiceId(serviceId);
    }
  }, [serviceId, clinicalServices]);

  // Weekday helpers
  // const weekdays: { [k: string]: number } = {
  //   sunday: 0,
  //   sun: 0,
  //   monday: 1,
  //   mon: 1,
  //   tuesday: 2,
  //   tue: 2,
  //   wednesday: 3,
  //   wed: 3,
  //   thursday: 4,
  //   thu: 4,
  //   friday: 5,
  //   fri: 5,
  //   saturday: 6,
  //   sat: 6,
  // };

  // const parseWeekday = (input: string | null): number | null => {
  //   if (!input) return null;
  //   const key = input.trim().toLowerCase();
  //   return weekdays[key] ?? null;
  // };

  // const nextDateForWeekday = (weekdayIndex: number): Date => {
  //   const now = new Date();
  //   const today = now.getDay();
  //   let diff = weekdayIndex - today;
  //   if (diff <= 0) diff += 7;
  //   const result = new Date(now);
  //   result.setDate(now.getDate() + diff);
  //   result.setHours(9, 0, 0, 0);
  //   return result;
  // };
  const locationSectionRef = useRef<HTMLDivElement | null>(null);
  const calendarSectionRef = useRef<HTMLDivElement | null>(null);

  const content = useIntlayer("calenderContent");
  // 1. Scroll to Clinic when Service is selected
  useEffect(() => {
    if (!selectedLocation) return;

    const el = calendarSectionRef.current;
    if (!el) return;

    setTimeout(() => {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, [selectedLocation]);

  useEffect(() => {
    setSelectedLocation(null);
    setSelectedDate(null);
    setSelectedTime(null);
  }, [selectedServiceId]);

  // Fetch doctor data when doctorId is in URL
  // Fetch doctor data when doctorId is in URL
  useEffect(() => {
    const loadDoctor = async () => {
      if (!doctorIdParam) return;

      setIsLoadingDoctor(true);
      try {
        const doctorData = await fetchDoctorById(Number(doctorIdParam));
        console.log("=== DOCTOR DATA FETCHED ===");
        console.log("Full doctor data:", doctorData);
        console.log("Services offered:", doctorData.services_offered);
        console.log("Services length:", doctorData.services_offered?.length);

        // ADD THESE NEW LOGS
        if (
          doctorData.services_offered &&
          doctorData.services_offered.length > 0
        ) {
          console.log("First service object:", doctorData.services_offered[0]);
          console.log("First service ID:", doctorData.services_offered[0]?.id);
          console.log(
            "First service title:",
            doctorData.services_offered[0]?.title,
          );
        }

        console.log("=========================");
        setFetchedDoctor(doctorData);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      } finally {
        setIsLoadingDoctor(false);
      }
    };

    loadDoctor();
  }, [doctorIdParam]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-red-900 mb-2">
            {isDoctorBooking
              ? `Book with ${doctorInfo?.name}`
              : content.bookappoint}
          </h1>
          <p className="text-lg text-gray-600">{content.bookingdescription}</p>
        </div>

        {/* Stepper */}
        <div className="mb-10">
          <div className="flex gap-0 items-center justify-between max-w-2xl">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-300 ${
                  isDoctorBooking || selectedServiceId
                    ? "bg-red-900 shadow-lg scale-110"
                    : "bg-gray-300"
                }`}
              >
                <span>1</span>
              </div>
              <p className="text-xs font-semibold mt-2 text-gray-700 text-center">
                {content.service}
              </p>
            </div>
            <div
              className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                isDoctorBooking || selectedServiceId
                  ? "bg-red-900"
                  : "bg-gray-300"
              }`}
            ></div>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-300 ${
                  selectedLocation
                    ? "bg-red-900 shadow-lg scale-110"
                    : "bg-gray-300"
                }`}
              >
                <span>2</span>
              </div>
              <p className="text-xs font-semibold mt-2 text-gray-700 text-center">
                {content.bookinglocation}
              </p>
            </div>
            <div
              className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                selectedLocation ? "bg-red-900" : "bg-gray-300"
              }`}
            ></div>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-300 ${
                  selectedDate
                    ? "bg-red-900 shadow-lg scale-110"
                    : "bg-gray-300"
                }`}
              >
                <span>3</span>
              </div>
              <p className="text-xs font-semibold mt-2 text-gray-700 text-center">
                {content.bookingdateandtime}
              </p>
            </div>
            <div
              className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                selectedDate && selectedTime ? "bg-red-900" : "bg-gray-300"
              }`}
            ></div>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-300 ${
                  selectedTime
                    ? "bg-red-900 shadow-lg scale-110"
                    : "bg-gray-300"
                }`}
              >
                <span>4</span>
              </div>
              <p className="text-xs font-semibold mt-2 text-gray-700 text-center">
                {content.detailsform}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Info */}
            {isDoctorBooking && (
              <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-xl shadow-md border-l-4 border-red-900 hover:shadow-lg transition-shadow">
                {isLoadingDoctor ? (
                  <div className="text-center py-4 text-gray-600">
                    {content.loadingDoctorInfo}
                  </div>
                ) : doctorInfo ? (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-900 flex items-center justify-center text-white text-xl font-bold">
                      👨‍⚕️
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-red-900">
                        {doctorInfo.name}
                      </h3>
                      <p className="text-sm text-red-700 font-medium">
                        {doctorInfo.role}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            {/* Service & Location */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              {/* DOCTOR BOOKING - Show service selector */}
              {isDoctorBooking && doctorInfo && !isLoadingDoctor && (
                <div className="mb-6">
                  <label className="block font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-red-900 text-white text-xs flex items-center justify-center">
                      1
                    </span>
                    {content.servicewith} {doctorInfo.name}
                  </label>
                  <select
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-red-900 focus:ring-2 focus:ring-red-100 transition font-medium"
                    value={selectedService ?? ""}
                    onChange={(e) => setSelectedService(e.target.value)}
                  >
                    <option value="">
                      -{content.chooseservice}
                      {doctorInfo.services_offered &&
                      doctorInfo.services_offered.length > 0
                        ? ""
                        : "-- no services available --"}
                    </option>
                    {doctorInfo.services_offered?.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* GENERAL BOOKING - Show clinical service selector */}
              {!isDoctorBooking && (
                <div className="mb-6">
                  <label className="block font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-red-900 text-white text-xs flex items-center justify-center">
                      1
                    </span>
                    {content.selectservice}
                  </label>
                  <select
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-red-900 focus:ring-2 focus:ring-red-100 transition font-medium"
                    value={selectedServiceId ?? ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSelectedServiceId(val ? Number(val) : null);
                    }}
                    disabled={isLoadingServices}
                  >
                    <option value="">
                      {isLoadingServices
                        ? "Loading services..."
                        : "-- choose a service --"}
                    </option>
                    {clinicalServices.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {/* Location selector */}
              {(isDoctorBooking && doctorInfo && selectedService) ||
              (!isDoctorBooking &&
                (selectedServiceId || selectedServiceFromList)) ? (
                /* ADDED ref={locationSectionRef} HERE */
                <div ref={locationSectionRef}>
                  <label className="block font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-red-900 text-white text-xs flex items-center justify-center">
                      2
                    </span>
                    {content.selectlocation}
                  </label>
                  <select
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-red-900 focus:ring-2 focus:ring-red-100 transition font-medium"
                    value={selectedLocation ?? ""}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="">-- choose a location --</option>
                    {availableLocations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
            </div>

            {/* Calendar & Times */}
            {selectedLocation && (
              /* WRAPPED CALENDAR IN A DIV WITH ref={calendarSectionRef} */
              <div ref={calendarSectionRef} className="mt-8">
                <CalendarWithTimes
                  availableSlots={availableSlots}
                  onDateSelected={setSelectedDate}
                  selectedTime={selectedTime}
                  onTimeSelected={setSelectedTime}
                  isDateAvailable={(d) =>
                    getSlotsForDate(d, selectedLocation).length > 0
                  }
                />
              </div>
            )}

            {/* Details Form */}
            {isReadyForDetails && (
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold text-red-900 mb-4">
                  {content.details}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-red-900 focus:ring-2 focus:ring-red-100 transition font-medium"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-red-900 focus:ring-2 focus:ring-red-100 transition font-medium"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-red-900 focus:ring-2 focus:ring-red-100 transition font-medium"
                  />
                  <textarea
                    placeholder="Additional Info"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-red-900 focus:ring-2 focus:ring-red-100 transition font-medium col-span-1 md:col-span-2"
                  />
                </div>

                <button
                  className="mt-6 w-full bg-red-900 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-red-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Confirm Booking"}
                  {content.confirmbooking}
                </button>
              </div>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1 sticky top-20 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-semibold text-lg text-red-900 mb-4">
                {content.bookingsummary}
              </h3>
              <p className="text-gray-700">
                <span className="font-semibold">Service:</span>{" "}
                {isDoctorBooking
                  ? selectedService
                  : selectedServiceFromList?.title || "-"}
              </p>
              {isDoctorBooking && (
                <p className="text-gray-700">
                  <span className="font-semibold">Doctor:</span>{" "}
                  {doctorInfo?.name}
                </p>
              )}
              <p className="text-gray-700">
                <span className="font-semibold">Clinic:</span>{" "}
                {selectedLocation || "-"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Date:</span>{" "}
                {selectedDate ? selectedDate.toDateString() : "-"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Time:</span>{" "}
                {selectedTime || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
