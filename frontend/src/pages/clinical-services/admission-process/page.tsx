import { FC } from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/Heading';
import { FileText, Clock, Phone, CalendarDays, ClipboardList, ChevronRight } from 'lucide-react';
import InsuranceSlider from '@/components/InsuranceSlider';
import ClientsSay from '@/components/ClientsSay';
import TeamSection from '@/components/TeamSection';

const AdmissionProcess: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Heading
        image_url="/src/assets/heroimages/admission.jpg"
        title="Admission Process"
        description="Your guide to a smooth hospital admission"
        style="background"
      />

      <main role="main" className="pb-20">
        {/* Hero summary */}
        <section className="bg-white pt-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <p className="text-sm text-gray-500 mb-2">Patient Information</p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-red-900 leading-tight mb-4">
                    Simple Steps to Your Hospital Admission
                  </h1>
                  <p className="text-gray-700 max-w-2xl leading-relaxed mb-6">
                    We've streamlined our admission process to ensure a smooth and stress-free experience. Our dedicated admission team is here to guide you through each step and answer any questions you may have.
                  </p>
                  <div className="flex items-center gap-3">
                    <a href="#admission-steps" className="px-5 py-3 bg-red-900 text-white rounded-full font-medium hover:bg-red-800 transition">
                      View Steps
                    </a>
                    <a href="tel:+254703082300" className="px-4 py-3 border border-gray-200 rounded-full text-sm inline-flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Admissions Help
                    </a>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-5">
                <motion.div 
                  className="bg-gray-50 rounded-2xl p-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-lg font-semibold mb-4">Quick Contacts</h2>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-red-900" />
                      <div>
                        <p className="font-medium">Admissions Desk</p>
                        <p className="text-gray-600">+254 (0)703 082 300</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-red-900" />
                      <div>
                        <p className="font-medium">Operating Hours</p>
                        <p className="text-gray-600">24/7 Service</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Admission Steps */}
        <section id="admission-steps" className="container mx-auto px-4 mt-16">
          <motion.h2 
            className="text-2xl font-serif font-bold text-red-900 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Admission Process Steps
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Pre-Admission",
                icon: ClipboardList,
                steps: [
                  "Doctor's recommendation or referral",
                  "Insurance pre-authorization (if applicable)",
                  "Appointment scheduling",
                  "Initial documentation preparation",
                  "Medical history review"
                ]
              },
              {
                title: "Day of Admission",
                icon: CalendarDays,
                steps: [
                  "Report to admission desk",
                  "Submit required documents",
                  "Complete admission forms",
                  "Financial clearance",
                  "Room allocation"
                ]
              },
              {
                title: "Required Documents",
                icon: FileText,
                steps: [
                  "Government-issued ID",
                  "Insurance card (if applicable)",
                  "Doctor's admission note",
                  "Recent medical reports",
                  "Emergency contact information"
                ]
              }
            ].map((section, idx) => (
              <motion.div
                key={section.title}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <section.icon className="w-8 h-8 text-red-900 mb-4" />
                <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <ChevronRight className="w-4 h-4 text-red-900 mt-1 flex-shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Insurance & Payment */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <motion.h3 
              className="text-xl font-semibold text-red-900 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Insurance & Payment Information
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold mb-4">Accepted Insurance Providers</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>We work with all major insurance providers.</li>
                  <li>KKindly liaise with our Admissions Team to</li>
                  <li>confirm whether your specific insurance plan is accepted.</li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold mb-4">Payment Options</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>Credit/Debit Cards</li>
                  <li>Mobile Money (M-PESA)</li>
                  <li>Bank Transfer</li>
                  <li>Cash Payment</li>
                  <li>Insurance Coverage</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="container mx-auto px-4 mt-16">
          <motion.h3 
            className="text-2xl font-serif font-bold text-red-900 text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "What should I bring for admission?",
                a: "Bring your ID, insurance card, doctor's referral, current medications, and personal essentials."
              },
              {
                q: "How long does the admission process take?",
                a: "The process typically takes 30-60 minutes, depending on documentation and room availability."
              },
              {
                q: "Can I pre-register for admission?",
                a: "Yes, you can pre-register through our admissions desk to expedite the process."
              },
              {
                q: "What are the visiting hours?",
                a: "General visiting hours are from 11:00 AM to 8:00 PM daily."
              }
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <h4 className="font-semibold mb-2">{faq.q}</h4>
                <p className="text-sm text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-semibold text-red-900 mb-6">Need Assistance?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Admissions Office</h4>
                <p className="text-sm text-gray-700">
                  24/7 Service<br />
                  Tel: +254 (0)703 082 300<br />
                  Email: admissions@nairobihospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Insurance Desk</h4>
                <p className="text-sm text-gray-700">
                  Mon - Fri: 8:00 AM - 5:00 PM<br />
                  Tel: +254 (0)703 082 301<br />
                  Email: insurance@nairobihospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Customer Service</h4>
                <p className="text-sm text-gray-700">
                  24/7 Support<br />
                  Tel: +254 (0)703 082 000<br />
                  Email: info@nairobihospital.org
                </p>
              </div>
            </div>
          </div>
        </section>

  {/* Clinical Team (inserted before ClientsSay) */}
  <TeamSection
    title="Admissions Team"
    team={[
      { name: 'Joel Wasiche', title: 'Credit Controller', image: '/src/assets/doctorsImages/unknown.png', bio: '' },
      { name: 'Esther Odupoyi', title: 'Admissions Manager', image: '/src/assets/doctorsImages/unknown.png', bio: '' },
      { name: 'Kenneth Bodo', title: 'Senior Medical Records Officer', image: '/src/assets/doctorsImages/unknown.png', bio: '' },
      { name: 'Felister Githui', title: 'Patient Liason', image: '/src/assets/doctorsImages/unknown.png', bio: '' },
    ]}
  />

  {/* Client Testimonials */}
  <ClientsSay
    title="What our clients say"
    testimonials={[
      { quote: 'Smooth admission experience and helpful staff.', name: 'P. Ouma', avatar: '/src/assets/feedback/clients.png' },
      { quote: 'Clear pre-admission guidance and fast processing.', name: 'H. Wekesa', avatar: '/src/assets/feedback/clients.png' },
      { quote: 'Efficient payment and insurance handling.', name: 'L. Kamunge', avatar: '/src/assets/feedback/clients.png' },
    ]}
  />

  {/* Insurance Partners */}
  <InsuranceSlider />
      </main>
    </div>
  );
};

export default AdmissionProcess;