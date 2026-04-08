import { FormEvent, useEffect, useState } from "react";
import { UserEnquiry, UserEnquiryCategory } from "@/types";
import { fetchRecipientEmailSettings } from "@/api/api";
import {
  buildRecipientEmailMap,
  USER_ENQUIRY_RECIPIENT_MAP,
} from "@/config/userEnquiries";
import toast from "react-hot-toast";

interface UserEnquiryFormProps {
  category: UserEnquiryCategory;
  initialData?: UserEnquiry | null;
  onSave: (payload: Partial<UserEnquiry>) => Promise<void>;
  onCancel: () => void;
}

const toTimeInputValue = (value?: string | null) =>
  value ? String(value).slice(0, 5) : "";

const formatDateTime = (value?: string | null) => {
  if (!value) return "-";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleString();
};

const UserEnquiryForm = ({
  category,
  initialData,
  onSave,
  onCancel,
}: UserEnquiryFormProps) => {
  const [recipientMap, setRecipientMap] = useState(USER_ENQUIRY_RECIPIENT_MAP);
  const [fullName, setFullName] = useState(initialData?.fullName ?? "");
  const [email, setEmail] = useState(initialData?.email ?? "");
  const [phone, setPhone] = useState(initialData?.phone ?? "");
  const [message, setMessage] = useState(initialData?.message ?? "");
  const [service, setService] = useState(initialData?.service ?? "");
  const [doctor, setDoctor] = useState(initialData?.doctor ?? "");
  const [location, setLocation] = useState(initialData?.location ?? "");
  const [appointmentDate, setAppointmentDate] = useState(
    initialData?.appointmentDate ?? "",
  );
  const [appointmentTime, setAppointmentTime] = useState(
    toTimeInputValue(initialData?.appointmentTime),
  );
  const [saving, setSaving] = useState(false);

  const isBookingCategory = category === "Bookings";
  const recipientEmail = initialData?.recipientEmail ?? recipientMap[category];

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fullName.trim() || !email.trim()) {
      toast.error("Full name and user email are required.");
      return;
    }

    if (isBookingCategory && (!service.trim() || !location.trim())) {
      toast.error("Service and location are required for bookings.");
      return;
    }

    setSaving(true);
    try {
      await onSave({
        category,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        recipientEmail,
        message: message.trim(),
        service: service.trim(),
        doctor: doctor.trim(),
        location: location.trim(),
        appointmentDate: appointmentDate || null,
        appointmentTime: appointmentTime || null,
      });
    } catch (error) {
      console.error("Failed to save user enquiry:", error);
      toast.error("Failed to save enquiry.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <h2 className="text-xl font-serif font-semibold">
        {initialData?.id ? `Edit ${category}` : `Add ${category}`}
      </h2>

      <div>
        <label className="font-medium block mb-1">Full Name</label>
        <input
          className="border p-2 w-full"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="font-medium block mb-1">User Email</label>
          <input
            type="email"
            className="border p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="font-medium block mb-1">Phone</label>
          <input
            type="tel"
            className="border p-2 w-full"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="font-medium block mb-1">Received Date & Time</label>
          <input
            type="text"
            className="border p-2 w-full bg-gray-100"
            value={formatDateTime(initialData?.createdAt)}
            readOnly
          />
        </div>

        <div>
          <label className="font-medium block mb-1">Last Updated</label>
          <input
            type="text"
            className="border p-2 w-full bg-gray-100"
            value={formatDateTime(initialData?.updatedAt)}
            readOnly
          />
        </div>
      </div>

      {isBookingCategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium block mb-1">Service</label>
            <input
              className="border p-2 w-full"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-medium block mb-1">Doctor</label>
            <input
              className="border p-2 w-full"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium block mb-1">Location</label>
            <input
              className="border p-2 w-full"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-medium block mb-1">Appointment Date</label>
            <input
              type="date"
              className="border p-2 w-full"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium block mb-1">Appointment Time</label>
            <input
              type="time"
              className="border p-2 w-full"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
            />
          </div>
        </div>
      )}

      {!isBookingCategory && (
        <input
          type="hidden"
          value={category}
          readOnly
        />
      )}

      <div>
        <label className="font-medium block mb-1">
          {isBookingCategory ? "Additional Info" : "Message"}
        </label>
        <textarea
          className="border p-2 w-full min-h-32"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 rounded text-white bg-green-600 disabled:bg-gray-400"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default UserEnquiryForm;
