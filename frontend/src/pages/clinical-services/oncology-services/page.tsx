import { FC } from 'react';
import Heading from '@/components/Heading';
import { motion } from 'framer-motion';
import { DownloadCloud } from 'lucide-react';
import { useNavigate } from 'react-router';
import InsuranceSlider from '@/components/InsuranceSlider';

const services = [
  {
    id: 'chemotherapy',
    title: 'Medical Oncology (Chemotherapy)',
    description:
      'Personalised chemotherapy delivered in a comfortable, monitored infusion suite with experienced oncology nurses.',
    image: 'https://365cps.org.sg/resourcehub/wp-content/uploads/2025/06/Chemotherapy-scaled-e1748915432822.jpg'
  },
  {
    id: 'radiotherapy',
    title: 'Radiation Oncology',
    description:
      'Advanced image-guided radiotherapy (IGRT), intensity-modulated (IMRT) and stereotactic techniques for precise treatment.',
    image: 'https://radonc.uchicago.edu/sites/radonc/files/styles/large/public/images/2019-07/shutterstock_1095820520_radiation_oncology.jpg?h=a141e9ea&amp;itok=oEjlhZYu'
  },
  {
    id: 'surgical',
    title: 'Surgical Oncology',
    description:
      'Multidisciplinary surgical teams offering minimally invasive and complex oncologic surgery with high safety standards.',
    image: 'https://sindhuhospitals.com/wp-content/uploads/2024/11/Surgical-Oncology.jpg'
  }
];

const sessions = [
  { type: 'Chemotherapy Infusion', frequency: 'Weekly / Bi-weekly', medianDuration: '2–4 hours' },
  { type: 'Radiotherapy Fraction', frequency: 'Daily (Mon–Fri)', medianDuration: '10–30 minutes' },
  { type: 'Immunotherapy', frequency: 'Every 2–4 weeks', medianDuration: '1–2 hours' }
];

const team = [
  { name: 'Dr. Grace Mwangi', role: 'Lead Medical Oncologist' },
  { name: 'Dr. Robert Kimani', role: 'Radiation Oncologist' },
  { name: 'Prof. David Otieno', role: 'Surgical Oncologist' }
];

const testimonials = [
  {
    quote:
      'The oncology team at The Nairobi Hospital felt like family — world-class care and clear communication every step of the way.',
    name: 'L. Patel'
  },
  {
    quote:
      'Precise radiotherapy and excellent supportive care helped me return to normal life quickly. Highly recommended.',
    name: 'S. Mensah'
  }
];

const OncologyServicesPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <Heading
        image_url="/src/assets/heroimages/oncology-hero.jpg"
        title="Comprehensive Oncology Services"
        description="Compassionate, multidisciplinary cancer care — advanced treatments, precision radiotherapy, and holistic supportive services."
        style="background"
      />

      {/* Hero overlay image (floating) */}
      <div className="relative -mt-20 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <motion.img
                src="https://www.excelsior.edu/wp-content/uploads/2022/07/oncology-nursing.jpg"
                alt="Oncology care overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="hidden md:block absolute -right-8 top-0 w-80 h-56 object-cover rounded-xl shadow-2xl border-4 border-white"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <section className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              World-class cancer care,<br className="hidden md:block" /> close to home
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg max-w-3xl mx-auto">
              Our Oncology Centre offers integrated cancer services — from screening and diagnosis to complex surgery, chemotherapy,
              radiotherapy and survivorship programs. Care is coordinated by an experienced multidisciplinary team.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/contact')} 
                className="px-8 py-4 bg-red-900 text-white rounded-lg font-semibold shadow-lg hover:bg-red-800 transition-all">
                Contact Oncology Team
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="/assets/brochures/oncology-services.pdf" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-red-900 text-red-900 rounded-lg hover:bg-red-50 transition-all">
                <DownloadCloud className="w-5 h-5" />
                Download Brochure
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* Quick stats */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-red-50 via-white to-red-50 rounded-2xl p-8 shadow-xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm"
                >
                  <div className="text-4xl font-bold text-red-900 mb-2">24/7</div>
                  <div className="text-gray-700 font-medium">Oncology nursing support</div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm"
                >
                  <div className="text-4xl font-bold text-red-900 mb-2">IGRT / IMRT</div>
                  <div className="text-gray-700 font-medium">Advanced radiotherapy techniques</div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm"
                >
                  <div className="text-4xl font-bold text-red-900 mb-2">Multidisciplinary</div>
                  <div className="text-gray-700 font-medium">Medical, Radiation & Surgical teams</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-serif font-bold mb-4">Our Services</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive cancer care through our integrated treatment services</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((s) => (
                <motion.div 
                  key={s.id} 
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden group"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={s.image} 
                      alt={s.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-8">
                    <h4 className="text-xl font-semibold mb-3">{s.title}</h4>
                    <p className="text-gray-600 mb-6 leading-relaxed">{s.description}</p>
                    <div className="flex justify-between items-center">
                      <motion.button 
                        whileHover={{ x: 4 }}
                        onClick={() => navigate(`/services/oncology/${s.id}`)} 
                        className="text-red-900 font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
                      >
                        Learn more →
                      </motion.button>
                      <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">Available</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Visual highlight: infusion suite image with brief copy */}
        <section className="mb-12">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img src="https://images.squarespace-cdn.com/content/v1/5f0f46d38c399f45c729e192/cbc9c597-fea7-48b2-9701-e41093fabdde/497-n-wendover-int0823.jpg" />
            </div>
            <div>
              <h4 className="text-2xl font-semibold mb-3">Comfortable infusion suites</h4>
              <p className="text-gray-600 mb-4">Our infusion suites are designed for patient comfort with recliner chairs, entertainment, private spaces, and continuous monitoring by trained oncology nurses.</p>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Personalised treatment planning and monitoring</li>
                <li>Amenities for family members and companions</li>
                <li>Infection control and safety protocols</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Treatment sessions schedule */}
        <section className="mb-16">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-serif font-bold mb-3">Treatment Sessions</h3>
                <p className="text-gray-600">What to expect during your treatment journey</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {sessions.map((s) => (
                  <motion.div 
                    key={s.type} 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                  >
                    <div className="flex flex-col h-full">
                      <div className="font-semibold text-lg mb-2">{s.type}</div>
                      <div className="flex-grow">
                        <div className="text-red-900 font-medium mb-1">{s.frequency}</div>
                        <div className="text-sm text-gray-600">Average duration: {s.medianDuration}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 bg-white px-4 py-2 rounded-full inline-block shadow-sm">
                  Treatment schedules are personalized based on your care plan
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16 bg-gradient-to-br from-red-50 via-white to-red-50 py-16 rounded-2xl">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif font-bold mb-4">Our Expert Team</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experienced specialists working together to provide comprehensive cancer care
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((m) => (
                <motion.div 
                  key={m.name} 
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-8 text-center shadow-lg backdrop-blur-sm"
                >
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-red-100 to-red-200 mb-6 flex items-center justify-center text-red-900 text-2xl font-bold shadow-inner"
                  >
                    {m.name.split(' ').map(n => n[0]).join('')}
                  </motion.div>
                  <div className="font-semibold text-xl mb-2">{m.name}</div>
                  <div className="text-red-900 font-medium mb-4">{m.role}</div>
                  <button 
                    onClick={() => navigate(`/team/${m.name.toLowerCase().replace(' ', '-')}`)}
                    className="text-sm text-red-900 hover:text-red-700 transition-colors"
                  >
                    View profile →
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Clinical trials & supportive care */}
        <section className="mb-12 bg-gradient-to-br from-red-50 to-white rounded-xl p-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">Clinical trials</h4>
              <p className="text-gray-600">Our centre participates in select clinical trials offering access to novel therapies under strict ethical oversight. Contact the oncology research team to learn about current trials and eligibility.</p>
              <button onClick={() => navigate('/research/clinical-trials')} className="mt-4 px-4 py-2 bg-red-900 text-white rounded-lg">View trials</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <img src="https://guidewaycare.com/wp-content/themes/yootheme/cache/04/what-sets-oncology-nurses-apart-from-other-nursing-specialties_-unique-skills-and-insights-049d3736.jpeg" alt="Supportive care" className="w-full h-40 object-cover rounded-lg shadow-sm" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Supportive care</h4>
                <p className="text-gray-600">Comprehensive supportive services including symptom management, nutrition, physiotherapy, pain management and psycho-social support for patients and families.</p>
                <button onClick={() => navigate('/supportive-care')} className="mt-4 px-4 py-2 border border-gray-300 rounded-lg">Learn more</button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials & resources */}
        <section className="mb-12">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-2xl font-serif font-bold">Patient stories</h3>
              {testimonials.map((t, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                  <p className="text-gray-800 italic">“{t.quote}”</p>
                  <div className="mt-4 text-sm font-medium">— {t.name}</div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center">
              <h4 className="font-semibold mb-4">Resources</h4>
              <a href="/resources/oncology-guide.pdf" className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm w-full justify-center">
                <DownloadCloud className="w-4 h-4" />
                Download Patient Guide
              </a>
            </div>
          </div>
        </section>

        {/* Contact banner */}
        <section className="mb-12">
          <div className="max-w-6xl mx-auto overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-2xl p-12 relative"
            >
              <div className="absolute inset-0 bg-[url('/src/assets/images/pattern-dot.png')] opacity-10"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="text-2xl font-serif font-bold mb-3">Ready to discuss treatment options?</h3>
                  <p className="text-white/90 text-lg">Contact our oncology coordinators to arrange a consultation or second opinion.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="tel:+254202845000" 
                    className="inline-flex items-center gap-2 bg-white text-red-900 px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-red-50 transition-colors"
                  >
                    Call Oncology Team
                  </motion.a>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/book-appointment')} 
                    className="inline-flex items-center gap-2 border-2 border-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
                  >
                    Book Appointment
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Insurance Partners */}
        <InsuranceSlider />
      </main>
    </div>
  );
};

export default OncologyServicesPage;
