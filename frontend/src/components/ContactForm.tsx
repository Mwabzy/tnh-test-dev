import { Mail, Phone } from "lucide-react";
import { FormEvent, useState } from "react";
import { useIntlayer } from "react-intlayer";
import { sendEmail } from "@/api/api";
import toast from "react-hot-toast";

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

const CONTACT_FORM_RECIPIENT = "iansmithxv@gmail.com";

const ContactForm = ({
  contactInfo,
  title = "Contact Us",
}: ContactFormProps) => {
  const content = useIntlayer("contact_form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      toast.error("Please fill in all fields.");
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
            <td style="padding: 6px 0; font-weight: 600;">Subject</td>
            <td style="padding: 6px 0;">${escapeHtml(trimmedSubject)}</td>
          </tr>
        </table>

        <div style="margin-top: 16px;">
          <div style="font-weight: 600; margin-bottom: 6px;">Share Your Message</div>
          <div style="padding: 12px; border: 1px solid #e5e7eb; border-radius: 6px; background: #f9fafb;">
            ${formatMultiline(trimmedMessage)}
          </div>
        </div>
      </div>
    `;

    setSubmitting(true);
    try {
      await sendEmail({
        email: CONTACT_FORM_RECIPIENT,
        subject: trimmedSubject,
        body,
      });

      toast.success("sent");
      setName("");
      setEmail("");
      setSubject("");
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
            <span className="text-lg font-serif">{contactInfo.phone}</span>
          </div>
          {contactInfo.emails && contactInfo.emails.length > 0 ? (
            contactInfo.emails.map((email, index) => (
              <div
                key={`${email.type}-${index}`}
                className="flex flex-col md:flex-row items-center gap-2"
              >
                <Mail className="text-red-900" />
                <span className="text-lg font-serif font-medium text-red-900">
                  {email.type.charAt(0).toUpperCase() + email.type.slice(1)}
                  {content.formenquiries}
                </span>
                <span className="text-lg font-serif">{email.address}</span>
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
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 bg-white focus:ring-[#133f3f]"
            />
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
