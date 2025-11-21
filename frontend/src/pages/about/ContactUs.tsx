import Heading from "@/components/Heading";
import { useIntlayer } from "react-intlayer";

import { Mail, Phone, MapPin, Send, Check, Globe, Users } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export default function ContactUs() {
    const content = useIntlayer("aboutUsPage");
    const [selectedDesk, setSelectedDesk] = useState<string>("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [consent, setConsent] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [statusMsg, setStatusMsg] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string,string>>({});
    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
      // scroll to form when desk selected
      if (selectedDesk) {
        const el = document.getElementById("contact-form");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, [selectedDesk]);

    // auto-hide status message (toast)
    useEffect(() => {
      if (!statusMsg) return;
      const t = setTimeout(() => setStatusMsg(null), 5000);
      return () => clearTimeout(t);
    }, [statusMsg]);

    const validate = () => {
      const e: Record<string,string> = {};
      if (!name.trim()) e.name = "Please enter your name.";
      if (!email.trim()) e.email = "Please enter an email.";
      else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email.";
      // Phone is optional to reduce friction on the form
      if (!message.trim()) e.message = "Please enter a message.";
      if (!consent) e.consent = "Please confirm we may contact you back.";
      setErrors(e);
      return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev?: React.FormEvent) => {
      ev?.preventDefault();
      setStatusMsg(null);
      if (!validate()) return;
      setSubmitting(true);
      try {
        const payload = { name, email, phone, message, desk: selectedDesk };
        const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload) });
        if (res.ok) {
          setStatusMsg('Thanks — your message has been sent. We will respond within 24–48 hours.');
          setName(''); setEmail(''); setPhone(''); setMessage(''); setConsent(false); setSelectedDesk(''); setErrors({});
        } else {
          // fallback to mailto
          const subj = encodeURIComponent(`Contact (${selectedDesk || 'General'})`);
          const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email}, ${phone})`);
          window.location.href = `mailto:contact@tnh.org?subject=${subj}&body=${body}`;
        }
      } catch (err) {
        const subj = encodeURIComponent(`Contact (${selectedDesk || 'General'})`);
        const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email}, ${phone})`);
        window.location.href = `mailto:contact@tnh.org?subject=${subj}&body=${body}`;
      } finally {
        setSubmitting(false);
      }
    };

  return (
    <section className="relative min-h-screen bg-gray-50 flex flex-col items-center py-16 px-6">
      {/* Header (call-center image) */}
      <Heading
              image_url="https://images.unsplash.com/photo-1588776814546-1c8df9c2f1b8?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=5a6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e"
              style="image"
              title={content.headingTitle[0]?.value ?? ""}
              description={content.headingContent[0]?.value ?? ""}
            />
      <div className="text-center mt-8 mb-8">
        <h1 className="text-4xl font-bold font-serif text-gray-800 mb-3">
          Get in Touch
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Have a question, or need support? Use the quick links below to reach the right desk, or send us a message.
        </p>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">The Nairobi Hospital is a leading non-profit medical centre in East Africa, offering advanced diagnostics, treatment and coordinated care.</p>
      </div>

      {/* Desk cards (more descriptive) */}
      <div className="max-w-6xl w-full mb-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Card - General */}
          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setSelectedDesk('General Enquiries'); const el = document.querySelector('#contact-form textarea') as HTMLTextAreaElement | null; if (el) el.focus(); } }}
            onClick={() => { setSelectedDesk('General Enquiries'); const el = document.querySelector('#contact-form textarea') as HTMLTextAreaElement | null; if (el) el.focus(); }}
            aria-pressed={selectedDesk === 'General Enquiries'}
            className={`relative flex items-start gap-4 p-5 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer border ${selectedDesk === 'General Enquiries' ? 'ring-2 ring-red-100 border-transparent bg-gradient-to-tr from-white to-red-50' : 'border-gray-100' } focus:outline-none focus:ring-2 focus:ring-red-200`}
          >
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-900">
                <Users size={20} />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">General Enquiries</h4>
                  <p className="text-sm text-gray-600 mt-2">Questions about hospital services, visiting hours, directions and general information.</p>
                </div>
                {selectedDesk === 'General Enquiries' && (
                  <span className="ml-4 text-green-600"><Check size={20} /></span>
                )}
              </div>
              <div className="mt-4 flex justify-end">
                <span className="px-3 py-1 rounded-full bg-red-50 text-red-900 text-sm">Select</span>
              </div>
            </div>
          </div>

          {/* Card - International */}
          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setSelectedDesk('International Patients Desk'); const el = document.querySelector('#contact-form textarea') as HTMLTextAreaElement | null; if (el) el.focus(); } }}
            onClick={() => { setSelectedDesk('International Patients Desk'); const el = document.querySelector('#contact-form textarea') as HTMLTextAreaElement | null; if (el) el.focus(); }}
            aria-pressed={selectedDesk === 'International Patients Desk'}
            className={`relative flex items-start gap-4 p-5 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer border ${selectedDesk === 'International Patients Desk' ? 'ring-2 ring-red-100 border-transparent bg-gradient-to-tr from-white to-red-50' : 'border-gray-100' } focus:outline-none focus:ring-2 focus:ring-red-200`}
          >
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-900">
                <Globe size={18} />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">International Patients Desk</h4>
                  <p className="text-sm text-gray-600 mt-2">Assistance for international patients with appointments, travel, visas and accommodation logistics.</p>
                </div>
                {selectedDesk === 'International Patients Desk' && (
                  <span className="ml-4 text-green-600"><Check size={20} /></span>
                )}
              </div>
              <div className="mt-4 flex justify-end">
                <span className="px-3 py-1 rounded-full bg-red-50 text-red-900 text-sm">Select</span>
              </div>
            </div>
          </div>

          {/* Card - Medical Liaison */}
          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setSelectedDesk('Medical Liaison Desk'); const el = document.querySelector('#contact-form textarea') as HTMLTextAreaElement | null; if (el) el.focus(); } }}
            onClick={() => { setSelectedDesk('Medical Liaison Desk'); const el = document.querySelector('#contact-form textarea') as HTMLTextAreaElement | null; if (el) el.focus(); }}
            aria-pressed={selectedDesk === 'Medical Liaison Desk'}
            className={`relative flex items-start gap-4 p-5 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer border ${selectedDesk === 'Medical Liaison Desk' ? 'ring-2 ring-red-100 border-transparent bg-gradient-to-tr from-white to-red-50' : 'border-gray-100' } focus:outline-none focus:ring-2 focus:ring-red-200`}
          >
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-900">
                <Users size={18} />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Medical Liaison Desk</h4>
                  <p className="text-sm text-gray-600 mt-2">Clinical coordination, referrals, second opinions and multidisciplinary liaison services.</p>
                </div>
                {selectedDesk === 'Medical Liaison Desk' && (
                  <span className="ml-4 text-green-600"><Check size={20} /></span>
                )}
              </div>
              <div className="mt-4 flex justify-end">
                <span className="px-3 py-1 rounded-full bg-red-50 text-red-900 text-sm">Select</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl w-full px-4">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          {/* toast */}
          {statusMsg && (
            <div className="absolute top-6 right-6 z-50">
              <div className="flex items-center gap-3 bg-white border border-gray-200 shadow-lg px-4 py-3 rounded-full text-sm text-gray-800">
                <Check className="text-green-600" />
                <div>{statusMsg}</div>
              </div>
            </div>
          )}
          <form id="contact-form" ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Your name" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-900 focus:outline-none" />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="you@example.com" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-900 focus:outline-none" />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone (optional)</label>
                <input value={phone} onChange={(e)=>setPhone(e.target.value)} type="tel" placeholder="e.g. +254 7xx xxx xxx" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-900 focus:outline-none" />
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Department</label>
              <select value={selectedDesk} onChange={(e)=>setSelectedDesk(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-900 focus:outline-none">
                <option value="">Select a department</option>
                <option value="General Enquiries">General Enquiries</option>
                <option value="International Patients Desk">International Patients Desk</option>
                <option value="Medical Liaison Desk">Medical Liaison Desk</option>
                <option value="Billing & Insurance">Billing & Insurance</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Write your message..." rows={6} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-900 focus:outline-none" maxLength={1200}></textarea>
              <div className="flex justify-between mt-1 text-xs text-gray-500"><span>{selectedDesk || 'Selected: General'}</span><span>{message.length}/1200</span></div>
              {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
            </div>

            <div className="flex items-start space-x-2">
              <input id="consent" checked={consent} onChange={(e)=>setConsent(e.target.checked)} type="checkbox" className="h-4 w-4 text-red-600 border-gray-300 rounded" />
              <label htmlFor="consent" className="text-sm text-gray-700">I agree to be contacted about this enquiry.</label>
            </div>
            {errors.consent && <p className="text-xs text-red-600">{errors.consent}</p>}

            <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-semibold py-3 rounded-full shadow-md transition duration-300 disabled:opacity-60">
              <Send size={18} />
              {submitting ? 'Sending...' : 'Send Message'}
            </button>

            {statusMsg && <p className="text-sm text-green-700">{statusMsg}</p>}
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-4">Contact Information</h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-3">
                <Phone className="text-red-900" />
                <span>+254 20 2845000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-red-900" />
                <span>support@nbihosp.org</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-red-900" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Quick contacts were removed to simplify the page; use the desk cards or the form above */}

          {/* Google Map Placeholder */}
          <div className="rounded-2xl overflow-hidden shadow-md">
            <iframe title="The Nairobi Hospital"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.197838524713!2d36.8219466!3d-1.2920659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d9d3c4b1bf%3A0x1f50a17f53eb35f1!2sNairobi!5e0!3m2!1sen!2ske!4v1618971782902!5m2!1sen!2ske"
              width="100%" height="280" allowFullScreen loading="lazy" className="border-0 w-full"></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
