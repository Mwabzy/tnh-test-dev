// src/pages/DoctorBooking.tsx
import { CalendarIcon, Search } from 'lucide-react';
import React, { useState, FormEvent, useEffect } from 'react';
import { useLocation } from 'react-router';
import doctor_data from '@/data/doctors.json';

// Define interfaces for type safety
interface Doctor {
  id: string;
  name: string;
  specialization: string;
  title: string;
  image: string;
  bio: string;
  medicalQualifications: string;
  yearsOfExperience: string;
  languagesSpoken: string;
  contactEmail: string;
  contactPhone: string;
  clinicDepartment: string;
  schedule: string;
  location: string;
  licensingDetails: string;
  servicesOffered: string[];
  awardsAndRecognition: string;
  researchAndPublications: string;
  socialMedia: string;
}

interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

interface BookingForm {
  doctorId: string;
  timeSlotId: string;
  patientName: string;
  patientEmail: string;
  service?: string;
  additionalInfo?: string;
}

// Ensure each doctor has an 'id' property; generate one if missing
const doctors: Doctor[] = doctor_data.map((doctor: Partial<Doctor>, idx) => ({
  id: doctor.id ?? `doctor-${idx + 1}`,
  name: doctor.name ?? 'Unknown Name',
  specialization: doctor.specialization ?? 'General',
  title: doctor.title ?? '',
  image: doctor.image ?? '',
  bio: doctor.bio ?? '',
  medicalQualifications: doctor.medicalQualifications ?? '',
  yearsOfExperience: doctor.yearsOfExperience ?? '',
  languagesSpoken: doctor.languagesSpoken ?? '',
  contactEmail: doctor.contactEmail ?? '',
  contactPhone: doctor.contactPhone ?? '',
  clinicDepartment: doctor.clinicDepartment ?? '',
  schedule: doctor.schedule ?? '',
  location: doctor.location ?? '',
  licensingDetails: doctor.licensingDetails ?? '',
  servicesOffered: doctor.servicesOffered ?? [],
  awardsAndRecognition: doctor.awardsAndRecognition ?? '',
  researchAndPublications: doctor.researchAndPublications ?? '',
  socialMedia: doctor.socialMedia ?? '',
}));

const DoctorBooking: React.FC = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [formData, setFormData] = useState<BookingForm>({
    doctorId: '',
    timeSlotId: '',
    patientName: '',
    patientEmail: '',
    service: '',
    additionalInfo: '',
  });
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Function to parse schedule and generate time slots
  const generateTimeSlots = (schedule: string): TimeSlot[] => {
    const timeSlots: TimeSlot[] = [];
    const today = new Date('2025-08-01T14:20:00+03:00'); // Current date: August 1, 2025, 2:20 PM EAT
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Handle special cases
    if (!schedule || schedule.toLowerCase() === 'on request') {
      return [{ id: '1', date: '2025-08-02', time: 'Contact for availability', available: false }];
    }
    if (schedule.toLowerCase() === 'available everyday') {
      // Generate slots for all days, e.g., 8 AM to 5 PM
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        for (let hour = 8; hour <= 17; hour++) {
          const time = `${hour % 12 || 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
          timeSlots.push({
            id: `${dateStr}-${hour}`,
            date: dateStr,
            time,
            available: true,
          });
        }
      }
      return timeSlots;
    }

    // Split multiple schedules (e.g., "Tuesday 10 am-3 pm, Friday 11 am-3 pm")
    const scheduleParts = schedule.split(',').map((part) => part.trim());

    scheduleParts.forEach((part, index) => {
      // Enhanced regex to handle varied formats (e.g., "Noon to 5 pm", "10 am-3 pm", "8.00am-5.00pm")
      const match = part.match(/(\w+.*?\w*)\s*(noon|\d{1,2}(?:\.\d{2})?)\s*(am|pm)?\s*(?:to|-)\s*(noon|\d{1,2}(?:\.\d{2})?)\s*(am|pm)?/i);
      if (!match) return;

      const dayRange = match[1];
      let startTime = match[2];
      let startPeriod = match[3]?.toLowerCase();
      let endTime = match[4];
      let endPeriod = match[5]?.toLowerCase();

      // Handle "Noon"
      if (startTime.toLowerCase() === 'noon') {
        startTime = '12';
        startPeriod = 'pm';
      }
      if (endTime.toLowerCase() === 'noon') {
        endTime = '12';
        endPeriod = 'pm';
      }

      // Parse day range (e.g., "Mon-Friday", "Monday", or "Monday to Friday")
      let days: string[] = [];
      const dayRangeClean = dayRange.replace(/\s*to\s*/i, '-').trim();
      if (dayRangeClean.includes('-')) {
        const [startDay, endDay] = dayRangeClean.split('-').map((d) => d.trim());
        const startIndex = daysOfWeek.findIndex((day) => day.toLowerCase().startsWith(startDay.toLowerCase()));
        const endIndex = daysOfWeek.findIndex((day) => day.toLowerCase().startsWith(endDay.toLowerCase()));
        if (startIndex !== -1 && endIndex !== -1 && startIndex <= endIndex) {
          days = daysOfWeek.slice(startIndex, endIndex + 1);
        }
      } else {
        const dayIndex = daysOfWeek.findIndex((day) => day.toLowerCase().startsWith(dayRangeClean.toLowerCase()));
        if (dayIndex !== -1) days = [daysOfWeek[dayIndex]];
      }

      // Parse start and end times
      const parseTime = (timeStr: string, period?: string): number => {
        const [hours, minutes] = timeStr.includes('.') ? timeStr.split('.').map(Number) : [parseInt(timeStr), 0];
        let adjustedHours = hours;
        if (period === 'pm' && adjustedHours !== 12) adjustedHours += 12;
        if (period === 'am' && adjustedHours === 12) adjustedHours = 0;
        return adjustedHours + (minutes / 60);
      };

      const startHour = parseTime(startTime, startPeriod);
      const endHour = parseTime(endTime, endPeriod);

      // Generate hourly time slots for the next 7 days
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dayName = daysOfWeek[date.getDay()];

        if (days.includes(dayName)) {
          for (let hour = Math.ceil(startHour); hour < endHour; hour++) {
            const time = `${hour % 12 || 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
            const dateStr = date.toISOString().split('T')[0];
            timeSlots.push({
              id: `${index}-${dateStr}-${hour}`,
              date: dateStr,
              time,
              available: true,
            });
          }
        }
      }
    });

    return timeSlots.length > 0 ? timeSlots : [{ id: '1', date: '2025-08-02', time: 'No slots available', available: false }];
  };

  // Get time slots for the selected doctor
  const timeSlots = selectedDoctor ? generateTimeSlots(selectedDoctor.schedule) : [];

  // When selectedDoctor changes, prefill service if available
  React.useEffect(() => {
    if (selectedDoctor) {
      const svc = selectedDoctor.servicesOffered && selectedDoctor.servicesOffered.length > 0 ? selectedDoctor.servicesOffered[0] : '';
      setFormData((prev) => ({ ...prev, doctorId: selectedDoctor.id, service: svc }));
    } else {
      setFormData((prev) => ({ ...prev, doctorId: '', service: '' }));
    }
  }, [selectedDoctor]);

  // Prefill from query params (doctorId, date, time)
  const locationHook = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(locationHook.search);
    const doctorIdParam = params.get('doctorId') || params.get('doctor');

    if (doctorIdParam) {
      const found = doctors.find(d => d.id === doctorIdParam || d.name === doctorIdParam);
      if (found) setSelectedDoctor(found);
    }

    // If date/time provided but doctor already selected, try to preselect slot below when timeSlots available
    // The actual slot selection happens in the next effect which listens to `selectedDoctor` and `timeSlots`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationHook.search]);

  // When timeSlots update (after selectedDoctor), try to match date/time from query params
  useEffect(() => {
    const params = new URLSearchParams(locationHook.search);
    const dateParam = params.get('date');
    const timeParam = params.get('time');
    if ((dateParam || timeParam) && timeSlots.length > 0) {
      const match = timeSlots.find(s => {
        const dateMatch = dateParam ? s.date === dateParam : true;
        const timeMatch = timeParam ? s.time === timeParam : true;
        return dateMatch && timeMatch;
      });
      if (match) {
        setSelectedSlot(match);
        setFormData(prev => ({ ...prev, timeSlotId: match.id, doctorId: selectedDoctor?.id || '' }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeSlots]);

  // Filter doctors based on search
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle form submission
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  if (!selectedDoctor || !selectedSlot || !selectedSlot.available) return;

  try {
    const response = await fetch("http://localhost:3000/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientName: formData.patientName,
        patientEmail: formData.patientEmail,
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        doctorEmail: selectedDoctor.contactEmail,
        timeSlot: `${selectedSlot.date} ${selectedSlot.time}`,
        service: formData.service,
        additionalInfo: formData.additionalInfo,
      }),
    });

    const result = await response.json();
    if (result.success) {
      setBookingStatus("success");
    } else {
      setBookingStatus("error");
    }
  } catch (error) {
    setBookingStatus("error");
    console.error("Booking failed:", error);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Book Your Doctor Appointment
        </h1>

        {/* Search Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by doctor name or specialization"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Doctor List */}
          <div className="mt-4 max-h-64 overflow-y-auto">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className={`p-3 cursor-pointer hover:bg-gray-100 rounded-md ${
                    selectedDoctor?.id === doctor.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <p className="font-medium text-gray-900">{doctor.title} {doctor.name}</p>
                  <p className="text-sm text-gray-500">{doctor.specialization}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No doctors found</p>
            )}
          </div>
        </div>

        {/* Time Slots Section */}
        {selectedDoctor && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Available Time Slots for {selectedDoctor.name}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {timeSlots
                .filter((slot) => slot.available)
                .map((slot) => (
                  <button
                    key={slot.id}
                    className={`flex items-center p-3 border rounded-md ${
                      selectedSlot?.id === slot.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => { setSelectedSlot(slot); setFormData(prev => ({ ...prev, timeSlotId: slot.id })); }}
                    disabled={!slot.available}
                  >
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <p className="text-sm">{slot.date}</p>
                      <p className="text-sm font-medium">{slot.time}</p>
                    </div>
                  </button>
                ))}
              {timeSlots.every((slot) => !slot.available) && (
                <p className="text-gray-500 text-center col-span-full">
                  No available time slots. Please contact the doctor for scheduling.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Booking Form */}
        {selectedDoctor && selectedSlot && selectedSlot.available && (
          <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Complete Your Booking
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="patientName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="patientName"
                    type="text"
                    required
                    className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-blue-500"
                    value={formData.patientName}
                    onChange={(e) =>
                      setFormData({ ...formData, patientName: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="patientEmail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="patientEmail"
                    type="email"
                    required
                    className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-blue-500"
                    value={formData.patientEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, patientEmail: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Service selector narrowed to this doctor's services */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                  Select Service
                </label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-blue-500"
                >
                  {selectedDoctor.servicesOffered && selectedDoctor.servicesOffered.length > 0 ? (
                    selectedDoctor.servicesOffered.map((s, i) => (
                      <option key={i} value={s}>{s}</option>
                    ))
                  ) : (
                    <option value="">General Consultation</option>
                  )}
                </select>
              </div>

              <div className="bg-white p-2 rounded-md border">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Doctor:</span>{' '}
                  {selectedDoctor.name} ({selectedDoctor.specialization})
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Time:</span> {selectedSlot.date}{' '}
                  {selectedSlot.time}
                </p>
              </div>

              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
                  Additional Information
                </label>
                <textarea
                  id="additionalInfo"
                  rows={4}
                  className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-blue-500"
                  placeholder="Enter any relevant details (symptoms, history, preferred contact)..."
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        )}

        {/* Booking Status */}
        {bookingStatus === 'success' && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md text-center">
            <p>Booking confirmed successfully!</p>
          </div>
        )}
        {bookingStatus === 'error' && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md text-center">
            <p>An error occurred while booking. Please try again.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorBooking;