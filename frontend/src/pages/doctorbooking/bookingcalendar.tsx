import React, { useState, useMemo, useEffect, useRef } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useLocation, useNavigate } from "react-router";
import {
  sendEmail,
  fetchRecipientEmailSettings,
  fetchBookedSlots,
} from "@/api/api";
import { useDispatch, useSelector } from "react-redux";
import { ClinicalService, Doctor } from "@/types";
import { useIntlayer } from "react-intlayer";
import toast from "react-hot-toast";
import {
  buildRecipientEmailMap,
  getUserEnquiryRecipient,
  USER_ENQUIRY_RECIPIENT_MAP,
} from "@/config/userEnquiries";
import type { AppDispatch, RootState } from "@/store";
import { fetchDoctorEntry, fetchDoctorsList } from "@/store/doctorsSlice";
import { fetchOutpatientCenters } from "@/store/outpatientCentersSlice";
import { fetchServices } from "@/store/servicesSlice";

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
  const dispatch = useDispatch<AppDispatch>();
  const storedDoctors = useSelector((state: RootState) => state.doctors.doctors);
  const doctorsLoading = useSelector((state: RootState) => state.doctors.loading);
  const doctorsInitialized = useSelector(
    (state: RootState) => state.doctors.initialized,
  );
  const storedServices = useSelector((state: RootState) => state.services.services);
  const servicesLoading = useSelector((state: RootState) => state.services.loading);
  const outpatientCenters = useSelector(
    (state: RootState) => state.outpatientCenters.centers,
  );
  const timingsLoading = useSelector(
    (state: RootState) => state.outpatientCenters.loading,
  );
  const timingsInitialized = useSelector(
    (state: RootState) => state.outpatientCenters.initialized,
  );
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const serviceIdParam = searchParams.get("serviceId");
  const doctorIdParam = searchParams.get("doctorId");
  const doctorNameParam = searchParams.get("doctorName");
  const doctorTitleParam = searchParams.get("doctorTitle");

  const clinicalServices = useMemo(
    () => (storedServices.length > 0 ? storedServices : services),
    [services, storedServices],
  );
  const availableDoctors = useMemo(
    () => (storedDoctors.length > 0 ? storedDoctors : doctors),
    [doctors, storedDoctors],
  );

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

  // Get doctor information
  const doctorInfo = useMemo(() => {
    if (!isDoctorBooking || !doctorIdParam) return null;

    const doctor = availableDoctors.find((d) => d.id === doctorIdNum);
    if (doctor) return doctor;

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
    doctorNameParam,
    doctorTitleParam,
    doctorServices,
    availableDoctors,
    doctorIdNum,
  ]);

  const selectedServiceFromList = useMemo(
    () => clinicalServices.find((s) => s.id === selectedServiceId) || null,
    [clinicalServices, selectedServiceId],
  );
  const activeServiceId = useMemo(() => {
    if (isDoctorBooking) {
      if (!selectedService) return null;
      const match = doctorInfo?.services_offered?.find(
        (service) => service.title === selectedService,
      );
      return match?.id ?? null;
    }
    return selectedServiceId;
  }, [isDoctorBooking, selectedService, selectedServiceId, doctorInfo]);
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

  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const formatMultiline = (value: string) =>
    escapeHtml(value).replace(/\r?\n/g, "<br />");

  const formatDateKey = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(date.getDate()).padStart(2, "0")}`;

  const SLOT_INTERVAL_MINUTES = 30;
  const DAY_INDEX: Record<string, number> = {
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

  const MONTH_INDEX: Record<string, number> = {
    january: 0,
    jan: 0,
    february: 1,
    feb: 1,
    march: 2,
    mar: 2,
    april: 3,
    apr: 3,
    may: 4,
    june: 5,
    jun: 5,
    july: 6,
    jul: 6,
    august: 7,
    aug: 7,
    september: 8,
    sept: 8,
    sep: 8,
    october: 9,
    oct: 9,
    november: 10,
    nov: 10,
    december: 11,
    dec: 11,
  };

  const normalizeDay = (value: string) =>
    value.toLowerCase().replace(/\s+/g, " ").trim();

  const normalizeMonth = (value: string) =>
    value.toLowerCase().replace(/\s+/g, " ").trim();

  const parseMonthToken = (value: string) => {
    const normalized = normalizeMonth(value);
    if (!normalized) return null;
    if (MONTH_INDEX[normalized] !== undefined) return MONTH_INDEX[normalized];
    const num = Number(normalized);
    if (!Number.isNaN(num) && num >= 1 && num <= 12) return num - 1;
    return null;
  };

  const expandMonths = (value?: string): number[] | null => {
    if (!value) return null;
    const normalized = normalizeMonth(value);
    if (!normalized) return null;

    const rangeMatch = normalized.match(
      /(january|february|march|april|may|june|july|august|september|sept|sep|october|november|december|jan|feb|mar|apr|jun|jul|aug|oct|nov|dec|\d{1,2})\s*[-to]+\s*(january|february|march|april|may|june|july|august|september|sept|sep|october|november|december|jan|feb|mar|apr|jun|jul|aug|oct|nov|dec|\d{1,2})/i,
    );
    if (rangeMatch) {
      const start = parseMonthToken(rangeMatch[1]);
      const end = parseMonthToken(rangeMatch[2]);
      if (start === null || end === null) return null;
      const months: number[] = [];
      let current = start;
      while (true) {
        months.push(current);
        if (current === end) break;
        current = (current + 1) % 12;
      }
      return months;
    }

    if (normalized.includes(",") || normalized.includes(" and ")) {
      const tokens = normalized
        .split(/,|and/)
        .map((part) => part.trim())
        .filter(Boolean);
      const months = tokens
        .map(parseMonthToken)
        .filter((m): m is number => m !== null);
      return months.length > 0 ? months : null;
    }

    const single = parseMonthToken(normalized);
    return single !== null ? [single] : null;
  };

  const expandDays = (value: string): number[] => {
    const normalized = normalizeDay(value);
    if (!normalized) return [];

    // Handle ranges like "monday - friday"
    const rangeMatch = normalized.match(
      /(sunday|monday|tuesday|wednesday|thursday|friday|saturday|sun|mon|tue|wed|thu|fri|sat)\s*-\s*(sunday|monday|tuesday|wednesday|thursday|friday|saturday|sun|mon|tue|wed|thu|fri|sat)/i,
    );
    if (rangeMatch) {
      const start = DAY_INDEX[rangeMatch[1]];
      const end = DAY_INDEX[rangeMatch[2]];
      if (start === undefined || end === undefined) return [];
      const days: number[] = [];
      let current = start;
      while (true) {
        days.push(current);
        if (current === end) break;
        current = (current + 1) % 7;
      }
      return days;
    }

    // Handle multiple days separated by commas or "and"
    if (normalized.includes(",") || normalized.includes(" and ")) {
      return normalized
        .split(/,|and/)
        .map((part) => part.trim())
        .filter(Boolean)
        .flatMap((part) =>
          DAY_INDEX[part] !== undefined ? [DAY_INDEX[part]] : [],
        );
    }

    return DAY_INDEX[normalized] !== undefined ? [DAY_INDEX[normalized]] : [];
  };

  const parseTimeToMinutes = (value: string) => {
    const match = value
      .trim()
      .match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
    if (!match) return null;
    let hour = Number(match[1]);
    const minutes = Number(match[2] ?? "0");
    const meridian = match[3].toUpperCase();
    if (meridian === "PM" && hour !== 12) hour += 12;
    if (meridian === "AM" && hour === 12) hour = 0;
    return hour * 60 + minutes;
  };

  const formatMinutesToTime = (totalMinutes: number) => {
    const hour24 = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const meridian = hour24 >= 12 ? "PM" : "AM";
    const hour12 = ((hour24 + 11) % 12) + 1;
    return `${String(hour12).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0",
    )} ${meridian}`;
  };

  const buildSlotsFromRanges = (
    ranges: Array<{ start: number; end: number }>,
  ) => {
    const slotSet = new Set<number>();
    ranges.forEach((range) => {
      if (range.end <= range.start) return;
      for (
        let t = range.start;
        t < range.end;
        t += SLOT_INTERVAL_MINUTES
      ) {
        slotSet.add(t);
      }
    });
    return Array.from(slotSet)
      .sort((a, b) => a - b)
      .map(formatMinutesToTime);
  };

  const normalizeLocation = (value: string) =>
    value
      .toLowerCase()
      .replace(/\s*(clinic|opc|outpatient clinic)\b/gi, "")
      .replace(/\s+/g, " ")
      .trim();

  const timingsByLocation = useMemo(() => {
    const map: Record<
      string,
      Array<{ day: string; month?: string; startTime: string; stopTime: string }>
    > = {};

    if (!activeServiceId) return map;

    outpatientCenters.forEach((center) => {
      const timings = Array.isArray(center?.timings) ? center.timings : [];
      const matches = timings.filter((t: any) => {
        const clinicId =
          t?.clinic ?? t?.clinicId ?? t?.clinic_id ?? t?.clinic?.id;
        return String(clinicId ?? "") === String(activeServiceId);
      });

      if (matches.length === 0) return;

      const label = center?.name ?? center?.location ?? "";
      if (!label) return;

      if (!map[label]) map[label] = [];

      matches.forEach((t: any) => {
        map[label].push({
          day: t?.day ?? "",
          month: t?.month ?? "",
          startTime: t?.startTime ?? t?.start_time ?? "",
          stopTime: t?.stopTime ?? t?.stop_time ?? "",
        });
      });
    });

    return map;
  }, [outpatientCenters, activeServiceId]);

  const locationTimings = useMemo(() => {
    if (!selectedLocation) return [];
    if (timingsByLocation[selectedLocation]) {
      return timingsByLocation[selectedLocation];
    }
    const normalized = normalizeLocation(selectedLocation);
    const match = Object.entries(timingsByLocation).find(
      ([key]) => normalizeLocation(key) === normalized,
    );
    return match ? match[1] : [];
  }, [selectedLocation, timingsByLocation]);

  const timingRulesByDay = useMemo(() => {
    const rules: Record<
      number,
      Array<{ start: number; end: number; months: number[] | null }>
    > = {};
    locationTimings.forEach((timing) => {
      const days = expandDays(timing.day);
      const start = parseTimeToMinutes(timing.startTime);
      const end = parseTimeToMinutes(timing.stopTime);
      const months = expandMonths(timing.month);
      if (start === null || end === null) return;
      days.forEach((dayIndex) => {
        if (!rules[dayIndex]) rules[dayIndex] = [];
        rules[dayIndex].push({ start, end, months });
      });
    });
    return rules;
  }, [locationTimings]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [recipientMap, setRecipientMap] = useState(USER_ENQUIRY_RECIPIENT_MAP);

  const isReadyForDetails = Boolean(
    selectedLocation && selectedDate && selectedTime,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceName = useMemo(
    () => (isDoctorBooking ? selectedService : selectedServiceFromList?.title),
    [isDoctorBooking, selectedService, selectedServiceFromList],
  );

  // Replace your entire handleConfirm function with this:
  const handleConfirm = async () => {
    if (!serviceName || !selectedLocation || !selectedDate || !selectedTime) {
      toast.error(
        "Please select service, location, date and time before confirming.",
      );
      return;
    }

    // Validate user details
    if (!name || !phone || !email) {
      toast.error("Please fill in all required details (Name, Phone, Email).");
      return;
    }

    const appointmentDate = formatDateKey(selectedDate);

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
      const safeName = escapeHtml(name.trim());
      const safeEmail = escapeHtml(email.trim());
      const safePhone = escapeHtml(phone.trim());
      const safeService = escapeHtml(serviceName);
      const safeDoctor = booking.doctor ? escapeHtml(booking.doctor) : "";
      const safeLocation = escapeHtml(booking.location);
      const safeDate = escapeHtml(booking.date);
      const safeTime = escapeHtml(booking.time);
      const safeMessage = additionalInfo.trim()
        ? formatMultiline(additionalInfo.trim())
        : "N/A";

      const body = `
        <div style="font-family: Arial, sans-serif; color: #111827;">
          <h2 style="margin: 0 0 8px;">Confirm Booking Request</h2>
          <p style="margin: 0 0 16px; color: #6b7280;">So our team can reach out to you on time.</p>
          <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
            <tr>
              <td style="padding: 6px 0; font-weight: 600; width: 180px;">Full Name</td>
              <td style="padding: 6px 0;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600;">Email</td>
              <td style="padding: 6px 0;">${safeEmail}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600;">Phone Number</td>
              <td style="padding: 6px 0;">${safePhone}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600;">Service</td>
              <td style="padding: 6px 0;">${safeService}</td>
            </tr>
            ${
              safeDoctor
                ? `<tr><td style="padding: 6px 0; font-weight: 600;">Doctor</td><td style="padding: 6px 0;">${safeDoctor}</td></tr>`
                : ""
            }
            <tr>
              <td style="padding: 6px 0; font-weight: 600;">Location</td>
              <td style="padding: 6px 0;">${safeLocation}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600;">Available Date</td>
              <td style="padding: 6px 0;">${safeDate}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600;">Time</td>
              <td style="padding: 6px 0;">${safeTime}</td>
            </tr>
          </table>

          <div style="margin-top: 16px;">
            <div style="font-weight: 600; margin-bottom: 6px;">Message Below</div>
            <div style="padding: 12px; border: 1px solid #e5e7eb; border-radius: 6px; background: #f9fafb;">
              ${safeMessage}
            </div>
          </div>
        </div>
      `;

      const response = await sendEmail({
        email:
          recipientMap.Bookings ?? getUserEnquiryRecipient("Bookings"),
        subject: `Booking Request - ${serviceName}`,
        body,
        enquiryCategory: "Bookings",
        enquiryName: booking.name,
        enquiryEmail: booking.email,
        enquiryPhone: booking.phone,
        enquiryMessage: booking.additionalInfo,
        service: booking.service,
        doctor: booking.doctor,
        location: booking.location,
        appointmentDate,
        appointmentTime: booking.time,
        name: booking.name,
        phone: booking.phone,
        patientEmail: booking.email,
        additionalInfo: booking.additionalInfo,
      });
      console.log("Booking email sent successfully:", response);

      const confirmationMessage = isDoctorBooking
        ? `Booking confirmed with ${booking.doctor} for ${booking.service} on ${booking.date} at ${booking.time} at ${booking.location}`
        : `Booking confirmed for ${booking.service} on ${booking.date} at ${booking.time} at ${booking.location}`;

      toast.success(confirmationMessage);
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 600);
    } catch (error: any) {
      console.error("Error creating booking:", error);
      const statusCode = error?.response?.status;
      const apiError = error?.response?.data?.error;

      if (statusCode === 409) {
        toast.error(apiError || "This slot is already booked. Choose another.");
      } else {
        toast.error(apiError || "Failed to create booking. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSlotsForDate = (date: Date | null) => {
    if (!date) return [] as string[];
    const monthIndex = date.getMonth();
    const ranges = (timingRulesByDay[date.getDay()] || [])
      .filter((rule) => !rule.months || rule.months.includes(monthIndex))
      .map((rule) => ({ start: rule.start, end: rule.end }));
    if (ranges.length === 0) return [] as string[];
    return buildSlotsFromRanges(ranges);
  };

  // Times already taken for this service/location/date, so the calendar can
  // hide them instead of failing on submit.
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  useEffect(() => {
    if (!serviceName || !selectedLocation || !selectedDate) {
      setBookedSlots([]);
      return;
    }

    let cancelled = false;
    fetchBookedSlots({
      service: serviceName,
      location: selectedLocation,
      date: formatDateKey(selectedDate),
    })
      .then((booked) => {
        if (!cancelled) setBookedSlots(booked);
      })
      .catch((error) => {
        // Fall back to showing every slot; submitting still guards against
        // double booking.
        console.error("Could not load booked slots:", error);
        if (!cancelled) setBookedSlots([]);
      });

    return () => {
      cancelled = true;
    };
  }, [serviceName, selectedLocation, selectedDate]);

  const availableSlots = useMemo(
    () =>
      getSlotsForDate(selectedDate).filter(
        (slot) => !bookedSlots.includes(slot),
      ),
    [selectedDate, timingRulesByDay, bookedSlots],
  );

  // Drop a selection that has just been taken by someone else.
  useEffect(() => {
    if (selectedTime && bookedSlots.includes(selectedTime)) {
      setSelectedTime(null);
    }
  }, [bookedSlots, selectedTime]);

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

  useEffect(() => {
    if (!isDoctorBooking && clinicalServices.length === 0 && !servicesLoading) {
      void dispatch(fetchServices());
    }
  }, [clinicalServices.length, dispatch, isDoctorBooking, servicesLoading]);

  useEffect(() => {
    if (!timingsInitialized && !timingsLoading) {
      void dispatch(fetchOutpatientCenters());
    }
  }, [dispatch, timingsInitialized, timingsLoading]);

  useEffect(() => {
    if (!doctorsInitialized && !doctorsLoading) {
      void dispatch(fetchDoctorsList());
    }
  }, [dispatch, doctorsInitialized, doctorsLoading]);

  useEffect(() => {
    let active = true;
    const loadRecipientSettings = async () => {
      try {
        const settings = await fetchRecipientEmailSettings();
        if (active) {
          setRecipientMap(buildRecipientEmailMap(settings));
        }
      } catch (error) {
        console.error("Failed to load recipient email settings:", error);
      }
    };

    loadRecipientSettings();
    return () => {
      active = false;
    };
  }, []);

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

  useEffect(() => {
    if (!doctorIdParam || doctorInfo) return;
    void dispatch(fetchDoctorEntry(Number(doctorIdParam)));
  }, [dispatch, doctorIdParam, doctorInfo]);

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
                {doctorsLoading && !doctorInfo?.services_offered?.length ? (
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
              {isDoctorBooking && doctorInfo && (
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
                    disabled={servicesLoading}
                  >
                    <option value="">
                      {servicesLoading
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
                    !timingsLoading && getSlotsForDate(d).length > 0
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
                  {isSubmitting ? "Submitting..." : content.confirmbooking}
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
