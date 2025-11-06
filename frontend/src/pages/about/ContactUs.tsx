import Heading from "@/components/Heading";
import { useIntlayer } from "react-intlayer";

import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactUs() {
    const content = useIntlayer("aboutUsPage");
  return (
    <section className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-6">
      {/* Header */}
      <Heading
              image_url="https://cms.thenairobihosp.org/uploads/who_we_are_8fbeb1073c.jpg"
              style="image"
              title={content.headingTitle[0]?.value ?? ""}
              description={content.headingContent[0]?.value ?? ""}
            />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Get in Touch
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Have a question,  or just want to say hello? Fill out the form below and we’ll get back to you soon.
        </p>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl w-full">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <form className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                placeholder="Write your message..."
                rows={5}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300"
            >
              <Send size={18} />
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-3">
                <Phone className="text-blue-600" />
                <span>+254 712 345 678</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-blue-600" />
                <span>support@nnbihosp.org</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-blue-600" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Google Map Placeholder */}
          <div className="rounded-2xl overflow-hidden shadow-md">
            <iframe
              title="ExchangeHub Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.197838524713!2d36.8219466!3d-1.2920659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d9d3c4b1bf%3A0x1f50a17f53eb35f1!2sNairobi!5e0!3m2!1sen!2ske!4v1618971782902!5m2!1sen!2ske"
              width="100%"
              height="280"
              allowFullScreen
              loading="lazy"
              className="border-0 w-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
