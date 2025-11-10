import { FC } from 'react';
import Heading from '@/components/Heading';
import { motion } from 'framer-motion';
import { Phone, Calendar, DownloadCloud, Users } from 'lucide-react';
import { useNavigate } from 'react-router';

const services = [
  {
    title: 'Medical Coordination',
    description:
      'Dedicated international patient coordinators to assist with appointment scheduling, medical records, and personalized care plans.',
    image: '/src/assets/images/coordination.jpg'
  },
  {
    title: 'Visa & Travel Assistance',
    description:
      'Support letters, visa documentation and guidance for travel and accommodation logistics.',
    image: '/src/assets/images/visa.jpg'
  },
  {
    title: 'Concierge Services',
    description:
      'Airport transfers, interpreter services, accommodation bookings and local transportation.',
    image: '/src/assets/images/concierge.jpg'
  }
];

// (We consolidated the journey into other sections; detailed step-by-step guidance is included elsewhere.)

const testimonials = [
  {
    quote:
      'Traveling from abroad was easy — the team took care of everything. The doctors were world class and the follow-up was excellent.',
    name: 'A. Rahman',
    country: 'United Kingdom'
  },
  {
    quote:
      'The concierge service made our stay comfortable and stress-free. Highly recommend The Nairobi Hospital for international patients.',
    name: 'M. Chen',
    country: 'China'
  }
];

const accreditations = [
  '/src/assets/images/accreditation1.png',
  '/src/assets/images/accreditation2.png',
  '/src/assets/images/accreditation3.png'
];

const InternationalPatientsPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <Heading
        image_url="/src/assets/heroimages/international-patients.jpg"
        title="International Patients"
        description="World-class care, seamless coordination — tailored services for patients visiting from abroad."
        style="background"
      />

      <main className="container mx-auto px-4 py-12">
        <section className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Seamless care for international patients
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            We provide a dedicated international patient service offering personalised
            medical coordination, travel assistance and end-to-end support to make
            your treatment journey effortless.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 bg-red-900 text-white rounded-lg font-semibold"
            >
              Contact Our Team
            </button>
            <a
              href="/assets/brochures/international-patients.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 border border-red-900 text-red-900 rounded-lg hover:bg-red-50"
            >
              <DownloadCloud className="w-4 h-4" />
              Download Brochure
            </a>
          </div>
        </section>

        {/* Why choose us */}
        <section className="mb-12">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 items-center">
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-2xl font-serif font-bold">Why choose The Nairobi Hospital?</h3>
              <p className="text-gray-600">
                We combine internationally-trained specialists, modern facilities, and a
                patient-first approach to deliver care that meets global standards.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-xl font-bold text-red-900">24/7</div>
                  <div className="text-xs text-gray-600">Specialist Access</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-xl font-bold text-red-900">100+</div>
                  <div className="text-xs text-gray-600">International Referrals/year</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-xl font-bold text-red-900">JCI</div>
                  <div className="text-xs text-gray-600">Standards Aligned</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-xl font-bold text-red-900">Concierge</div>
                  <div className="text-xs text-gray-600">Travel & Stay</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="/src/assets/images/international-desk.jpg"
                alt="International patient desk"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((s) => (
            <motion.div key={s.title} whileHover={{ y: -6 }} className="bg-white border rounded-xl p-6 shadow-md">
              <div className="relative overflow-hidden rounded-md mb-4 h-40">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{s.title}</h3>
              <p className="text-gray-600 text-sm text-center">{s.description}</p>
            </motion.div>
          ))}
        </section>

        {/* International Patient Desk */}
        <section className="mb-12 bg-gray-50 rounded-2xl p-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-3">International Patient Desk</h3>
              <p className="text-gray-600 mb-4">
                Our International Patient Desk is your single point of contact. We coordinate medical appointments,
                interpreters, accommodation, and logistics so you can focus on care and recovery.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-red-900 mt-1" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <a href="tel:+254202845000" className="text-gray-700">+254 20 2845000</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-red-900 mt-1" />
                  <div>
                    <div className="font-medium">Email</div>
                    <a href="mailto:international@tnh.co.ke" className="text-gray-700">international@tnh.co.ke</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-red-900 mt-1" />
                  <div>
                    <div className="font-medium">Desk Hours</div>
                    <div className="text-gray-700">Mon - Fri: 08:00 - 17:00 (24/7 on-call)</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button onClick={() => navigate('/contact')} className="px-5 py-3 bg-red-900 text-white rounded-lg">Contact Desk</button>
                <a href="/international-patients/brochure.pdf" className="px-5 py-3 border border-gray-300 rounded-lg">Download Brochure</a>
              </div>
            </div>

            <div className="space-y-4">
              <img src="/src/assets/images/desk-staff-1.jpg" alt="Desk staff" className="w-full h-48 object-cover rounded-lg" />
              <img src="/src/assets/images/desk-staff-2.jpg" alt="Concierge" className="w-full h-48 object-cover rounded-lg" />
            </div>
          </div>
        </section>

        {/* Testimonials & Accreditations */}
        <section className="mb-12">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-2xl font-serif font-bold">Patient stories</h3>
              {testimonials.map((t, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                  <p className="text-gray-800 italic">“{t.quote}”</p>
                  <div className="mt-4 text-sm font-medium">— {t.name}, <span className="text-gray-500">{t.country}</span></div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center">
              <h4 className="font-semibold mb-4">Our Accreditations</h4>
              <div className="flex items-center justify-center gap-4">
                {accreditations.map((src, idx) => (
                  <img key={idx} src={src} alt={`acc-${idx}`} className="h-12 object-contain" />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-3">Frequently asked questions</h4>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <strong>Q:</strong> What documents do I need? <br />
                  <strong>A:</strong> Recent medical records, imaging, and a referral letter. We can advise on specifics.
                </li>
                <li>
                  <strong>Q:</strong> Do you provide interpreters? <br />
                  <strong>A:</strong> Yes — interpreters available on request in major languages.
                </li>
                <li>
                  <strong>Q:</strong> Can you help with accommodation? <br />
                  <strong>A:</strong> Yes — our concierge will arrange recommended hotels and transport.
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Patient resources</h4>
              <div className="grid gap-3">
                <a href="/resources/ckd-guide" className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md">
                  <div>
                    <div className="text-sm font-medium">Understanding Kidney Disease</div>
                    <div className="text-xs text-gray-500">Guide for patients and families</div>
                  </div>
                  <DownloadCloud className="w-5 h-5 text-gray-400" />
                </a>

                <a href="/resources/renal-diet" className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md">
                  <div>
                    <div className="text-sm font-medium">Nutrition Guidelines</div>
                    <div className="text-xs text-gray-500">Diet advice for renal patients</div>
                  </div>
                  <DownloadCloud className="w-5 h-5 text-gray-400" />
                </a>

                <a href="/international-patients/brochure.pdf" className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md">
                  <div>
                    <div className="text-sm font-medium">International Patients Brochure</div>
                    <div className="text-xs text-gray-500">Download full brochure</div>
                  </div>
                  <DownloadCloud className="w-5 h-5 text-gray-400" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default InternationalPatientsPage;
