import { Mail, Phone } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useIntlayer } from "react-intlayer";
import { fetchRecipientEmailSettings, sendEmail } from "@/api/api";
import toast from "react-hot-toast";
import {
  buildRecipientEmailMap,
  getUserEnquiryRecipient,
  USER_ENQUIRY_SUBJECT_OPTIONS,
  USER_ENQUIRY_RECIPIENT_MAP,
} from "@/config/userEnquiries";

// Define the shape of an email entry
interface EmailEntry {
  type: string; // e.g., "general", "medical", "service", "clinic"
  address: string;
}

export interface ContactInfo {
  phone: string;
  emails?: EmailEntry[];
}

// Define the props for the component
interface ContactFormProps {
  contactInfo: ContactInfo;
  title?: string;
}

const ContactForm = ({
  contactInfo,
  title = "Contact Us",
}: ContactFormProps) => {
  const content = useIntlayer("contact_form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [recipientMap, setRecipientMap] = useState(USER_ENQUIRY_RECIPIENT_MAP);

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

  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const formatMultiline = (value: string) =>
    escapeHtml(value).replace(/\r?\n/g, "<br />");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedSubject = subject.trim();
    const trimmedJobTitle = jobTitle.trim();
    const trimmedMessage = message.trim();
    const recipientEmail =
      recipientMap[trimmedSubject as keyof typeof recipientMap] ??
      getUserEnquiryRecipient(trimmedSubject);
    const isJobEnquiry = trimmedSubject === "Job enquiries";
    const emailSubject =
      isJobEnquiry && trimmedJobTitle
        ? `${trimmedSubject} (${trimmedJobTitle})`
        : trimmedSubject;

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (isJobEnquiry && !trimmedJobTitle) {
      toast.error("Please enter the job title.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      toast.error("Enter a valid email.");
      return;
    }

    const body = `
      <div style="font-family: Arial, sans-serif; color: #111827;">
        <h2 style="margin: 0 0 12px;">Contact Enquiry</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
          <tr>
            <td style="padding: 6px 0; font-weight: 600; width: 180px;">Full Name</td>
            <td style="padding: 6px 0;">${escapeHtml(trimmedName)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 600;">Email</td>
            <td style="padding: 6px 0;">${escapeHtml(trimmedEmail)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 600;">Phone Number</td>
            <td style="padding: 6px 0;">${trimmedPhone ? escapeHtml(trimmedPhone) : "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 600;">Subject</td>
            <td style="padding: 6px 0;">${escapeHtml(emailSubject)}</td>
          </tr>
        </table>

        <div style="margin-top: 16px;">
          <div style="font-weight: 600; margin-bottom: 6px;">Message Below</div>
          <div style="padding: 12px; border: 1px solid #e5e7eb; border-radius: 6px; background: #f9fafb;">
            ${formatMultiline(trimmedMessage)}
          </div>
        </div>
      </div>
    `;

    setSubmitting(true);
    try {
      await sendEmail({
        email: recipientEmail,
        subject: emailSubject,
        body,
        enquiryCategory: trimmedSubject,
        enquiryName: trimmedName,
        enquiryEmail: trimmedEmail,
        enquiryPhone: trimmedPhone,
        enquiryMessage: trimmedMessage,
      });

      toast.success("sent");
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setJobTitle("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 w-full mt-8 flex flex-col gap-4 items-start">
      <div className="flex flex-col md:flex-row  items-start justify-center gap-6">
        <div className="flex flex-col items-cemter gap-6 w-full md:w-[80%] py-4">
          <h2 className="text-3xl md:text-5xl font-serif text-red-900">
            {title}
          </h2>
          <p className="text-lg font-serif">{content.formbody}</p>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <Phone className="text-red-900" />
            <span className="text-lg font-serif font-medium text-red-900">
              {content.formcontact}
            </span>
            <a
              href={`tel:${contactInfo.phone.replace(/[^+\\d]/g, "")}`}
              className="text-lg font-serif text-black hover:underline"
            >
              {contactInfo.phone}
            </a>
          </div>
          {contactInfo.emails && contactInfo.emails.length > 0 ? (
            contactInfo.emails.map((email, index) => (
              <div
                key={`${email.type}-${index}`}
                className="flex flex-col md:flex-row items-center gap-2"
              >
                <Mail className="text-red-900" />
                <span className="text-lg font-serif font-medium text-red-900">
                  {email.type.charAt(0).toUpperCase() + email.type.slice(1)}{" "}
                  {content.formenquiries}
                </span>
                <a
                  href={`mailto:${email.address}`}
                  className="text-lg font-serif text-black hover:underline"
                >
                  {email.address}
                </a>
              </div>
            ))
          ) : (
            <p className="text-lg font-serif text-gray-600">
              {content.formsenquiry}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-4 w-[95%] md:w-[50%] p-6 bg-gray-50 rounded-lg shadow-lg">
          <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
            <h2 className="text-xl font-serif text-red-900">
              {content.formfill}
            </h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 bg-white focus:ring-[#133f3f]"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 bg-white focus:ring-[#133f3f]"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (optional)"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 bg-white focus:ring-[#133f3f]"
            />
            <select
              value={subject}
              onChange={(e) => {
                const nextSubject = e.target.value;
                setSubject(nextSubject);
                if (nextSubject !== "Job enquiries") {
                  setJobTitle("");
                }
              }}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 bg-white focus:ring-[#133f3f]"
            >
              <option value="">Select a subject</option>
              {USER_ENQUIRY_SUBJECT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {subject === "Job enquiries" && (
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Job Title"
                className="p-3 border rounded-md focus:outline-none focus:ring-2 bg-white focus:ring-[#133f3f]"
              />
            )}
            <textarea
              placeholder="Message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 bg-white focus:ring-[#133f3f]"
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-red-900 text-white py-3 px-6 rounded-md cursor-pointer hover:bg-yellow-600 hover:text- transition"
            >
              {submitting ? "Submitting..." : content.formsubmit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
