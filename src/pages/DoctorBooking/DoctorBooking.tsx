// src/pages/DoctorBooking.tsx
import { CalendarIcon, Search } from 'lucide-react';
import React, { useState, FormEvent } from 'react';
// Define interfaces for type safety
interface Doctor {
  id: string;
  name: string;
  specialty: string;
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
}

const DoctorBooking: React.FC = () => {
  // Sample data (in real app, fetch from API)
  const doctors: Doctor[] = [
    { id: '1', name: 'Dr. John Smith', specialty: 'Cardiology' },
    { id: '2', name: 'Dr. Jane Doe', specialty: 'Pediatrics' },
    { id: '3', name: 'Dr. Mike Wilson', specialty: 'Neurology' },
  ];

  const timeSlots: TimeSlot[] = [
    { id: '1', date: '2025-06-15', time: '09:00 AM', available: true },
    { id: '2', date: '2025-06-15', time: '10:00 AM', available: true },
    { id: '3', date: '2025-06-15', time: '11:00 AM', available: false },
    { id: '4', date: '2025-06-16', time: '02:00 PM', available: true },
  ];

  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [formData, setFormData] = useState<BookingForm>({
    doctorId: '',
    timeSlotId: '',
    patientName: '',
    patientEmail: '',
  });
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Filter doctors based on search
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedSlot) return;

    try {
      // Simulate API call
      setBookingStatus('success');
      console.log('Booking submitted:', {
        ...formData,
        doctorId: selectedDoctor.id,
        timeSlotId: selectedSlot.id,
      });
      // Reset form
      setFormData({
        doctorId: '',
        timeSlotId: '',
        patientName: '',
        patientEmail: '',
      });
      setSelectedDoctor(null);
      setSelectedSlot(null);
    } catch (error) {
      setBookingStatus("error");
        console.error('Booking failed:', error);
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
              placeholder="Search by doctor name or specialty"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Doctor List */}
          {searchQuery && (
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
                    <p className="font-medium text-gray-900">{doctor.name}</p>
                    <p className="text-sm text-gray-500">{doctor.specialty}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No doctors found</p>
              )}
            </div>
          )}
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
                    onClick={() => setSelectedSlot(slot)}
                    disabled={!slot.available}
                  >
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <p className="text-sm">{slot.date}</p>
                      <p className="text-sm font-medium">{slot.time}</p>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Booking Form */}
        {selectedDoctor && selectedSlot && (
          <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Complete Your Booking
            </h2>
            <div className="space-y-4">
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
                  id="email"
                  type="email"
                  required
                  className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-blue-500"
                  value={formData.patientEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, patientEmail: e.target.value })
                  }
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Doctor:</span>{' '}
                  {selectedDoctor.name} ({selectedDoctor.specialty})
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Time:</span> {selectedSlot.date}{' '}
                  {selectedSlot.time}
                </p>
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
          <div className="mt-4 p-4 p-4 bg-red-100 text-red-700 rounded-md text-center">
            <p>An error occurred while booking. Please try again.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorBooking;