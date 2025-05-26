import { Mail, Phone } from "lucide-react";

// Define the shape of an email entry
interface EmailEntry {
  type: string; // e.g., "general", "medical", "service", "clinic"
  address: string;
}

// Define the shape of the contact information
export interface ContactInfo {
  phone: string;
  emails?: EmailEntry[]; // Optional array of email entries
}

// Define the props for the component
interface ContactFormProps {
  contactInfo: ContactInfo;
}

const ContactForm = ({ contactInfo }: ContactFormProps) => {
  return (
    <div className="max-w-7xl mx-auto p-4 w-full mt-8 flex flex-col gap-4 items-start">
      <div className="flex flex-col md:flex-row  items-start justify-center gap-6">
        <div className="flex flex-col items-cemter gap-6 w-full md:w-[80%] py-4">
          <h2 className="text-4xl text-center font-serif text-red-900">Book an appointment</h2>
          <p className="text-lg font-serif">
            Our dedicated customer support team is here to assist you every step of the way, ensuring you have the guidance and assistance you need.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <Phone className="text-red-900" />
            <span className="text-lg font-serif font-medium text-red-900">Call support:</span>
            <span className="text-lg font-serif">{contactInfo.phone}</span>
          </div>
          {contactInfo.emails && contactInfo.emails.length > 0 ? (
            contactInfo.emails.map((email, index) => (
              <div key={`${email.type}-${index}`} className="flex flex-col md:flex-row items-center gap-2">
                <Mail className="text-red-900" />
                <span className="text-lg font-serif font-medium text-red-900">
                  {email.type.charAt(0).toUpperCase() + email.type.slice(1)} enquiries:
                </span>
                <span className="text-lg font-serif">{email.address}</span>
              </div>
            ))
          ) : (
            <p className="text-lg font-serif text-gray-600">No email contacts available.</p>
          )}
        </div>
        <div className="flex flex-col gap-4 w-[95%] md:w-[50%] p-6 bg-gray-50 rounded-lg shadow-lg">
          <form className="grid grid-cols-1 gap-4">
            <h2 className="text-xl font-serif text-red-900">Fill in the form below with your information and enquiry</h2>
            <input
              type="text"
              placeholder="Name"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 bg-white focus:ring-[#133f3f]"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 bg-white focus:ring-[#133f3f]"
            />
            <input
              type="text"
              placeholder="Subject"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 bg-white focus:ring-[#133f3f]"
            />
            <textarea
              placeholder="Message"
              rows={5}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 bg-white focus:ring-[#133f3f]"
            />
            <button
              type="submit"
              className="bg-red-900 text-white py-3 px-6 rounded-md cursor-pointer hover:bg-yellow-600 hover:text- transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;