import { FC } from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/Heading';
import { Globe2, Plane, Phone, ChevronRight, Stethoscope, Wallet, Languages } from 'lucide-react';
import InsuranceSlider from '@/components/InsuranceSlider';
import ClientsSay from '@/components/ClientsSay';
import TeamSection from '@/components/TeamSection';

const MedicalTourism: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Heading
        image_url="/src/assets/heroimages/medical-tourism.jpg"
        title="Medical Tourism at TNH"
        description="World-class healthcare in the heart of East Africa"
        style="background"
      />

      <main role="main" aria-label="Medical Tourism Services" className="pb-20">
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
                  <p className="text-sm text-gray-500 mb-2">International Patient Services</p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-red-900 leading-tight mb-4">
                    Your Journey to Health Excellence
                  </h1>
                  <p className="text-gray-700 max-w-2xl leading-relaxed mb-6">
                    Experience world-class healthcare at The Nairobi Hospital, where cutting-edge medical expertise meets exceptional patient care. Our international patient program ensures a seamless healthcare journey from consultation to recovery.
                  </p>
                  <div className="flex items-center gap-3">
                    <a href="#services" className="px-5 py-3 bg-red-900 text-white rounded-full font-medium hover:bg-red-800 transition">
                      Our Services
                    </a>
                    <a href="tel:+254703082000" className="px-4 py-3 border border-gray-200 rounded-full text-sm inline-flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Contact Us
                    </a>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-5">
                <motion.div 
                  className="rounded-2xl overflow-hidden shadow-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2940" 
                    alt="Medical Excellence" 
                    className="w-full h-64 object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-50 py-12 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "30+", label: "Countries Served" },
                { value: "24/7", label: "International Support" },
                { value: "150+", label: "Medical Specialists" },
                { value: "98%", label: "Patient Satisfaction" }
              ].map((stat, idx) => (
                <motion.div 
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="text-3xl font-bold text-red-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Medical Services */}
        <section className="container mx-auto px-4 mt-16">
          <motion.h2 
            className="text-2xl font-serif font-bold text-red-900 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            World-Class Medical Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Specialized Healthcare",
                image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2940",
                description: "Access to advanced medical treatments and specialized care.",
                features: [
                  "Multi-specialty medical teams",
                  "State-of-the-art facilities",
                  "Advanced diagnostic services",
                  "Cutting-edge treatments",
                  "Evidence-based protocols",
                  "Quality assurance standards"
                ]
              },
              {
                title: "International Patient Support",
                image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2940",
                description: "Comprehensive assistance for international patients.",
                features: [
                  "Visa assistance",
                  "Travel arrangements",
                  "Airport transfers",
                  "Language support",
                  "Cultural liaison",
                  "Family accommodation"
                ]
              },
              {
                title: "Premium Care Experience",
                image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2940",
                description: "Exceptional care in a comfortable environment.",
                features: [
                  "Luxury private rooms",
                  "Personal care coordinator",
                  "Concierge services",
                  "International cuisine",
                  "Family support services",
                  "Recovery assistance"
                ]
              }
            ].map((service, idx) => (
              <motion.div
                key={service.title}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-red-900 mt-1 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Patient Journey */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <motion.h3 
              className="text-xl font-semibold text-red-900 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Your Medical Journey
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Initial Consultation",
                  icon: Globe2,
                  description: "Start your journey with a virtual consultation",
                  features: [
                    "Medical records review",
                    "Treatment plan discussion",
                    "Cost estimation",
                    "Travel planning"
                  ]
                },
                {
                  title: "Travel Support",
                  icon: Plane,
                  description: "Seamless travel assistance",
                  features: [
                    "Visa processing support",
                    "Flight arrangements",
                    "Airport pickup service",
                    "Accommodation booking"
                  ]
                },
                {
                  title: "Treatment & Care",
                  icon: Stethoscope,
                  description: "Expert medical care and support",
                  features: [
                    "Specialist consultations",
                    "Treatment procedures",
                    "Recovery monitoring",
                    "Follow-up care"
                  ]
                }
              ].map((phase, idx) => (
                <motion.div
                  key={phase.title}
                  className="bg-white p-6 rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <phase.icon className="w-8 h-8 text-red-900 mb-4" />
                  <h4 className="font-semibold mb-2">{phase.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{phase.description}</p>
                  <ul className="space-y-2">
                    {phase.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-red-900 mt-1 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Services */}
        <section className="container mx-auto px-4 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Language & Cultural Support */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Languages className="w-8 h-8 text-red-900 mb-4" />
              <h3 className="text-lg font-semibold mb-4">Language & Cultural Support</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                  Multilingual staff
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                  Translation services
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                  Cultural sensitivity training
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                  Religious support
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                  Dietary accommodations
                </li>
              </ul>
            </motion.div>

            {/* Financial Services */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Wallet className="w-8 h-8 text-red-900 mb-4" />
              <h3 className="text-lg font-semibold mb-4">Financial Services</h3>
              <div className="space-y-4 text-sm text-gray-700">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                    Transparent cost estimates
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                    Insurance coordination
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                    Multiple payment options
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                    Financial counseling
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                    Package pricing available
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-semibold text-red-900 mb-6">Contact Our International Patient Office</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">24/7 Assistance</h4>
                <p className="text-sm text-gray-700">
                  International Helpline<br />
                  Tel: +254 (0)703 082 000<br />
                  Email: international@nairobihospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Travel Support</h4>
                <p className="text-sm text-gray-700">
                  Mon - Fri: 8:00 AM - 5:00 PM<br />
                  Tel: +254 (0)703 082 301<br />
                  Email: travel@nairobihospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">WhatsApp Support</h4>
                <p className="text-sm text-gray-700">
                  24/7 WhatsApp Line<br />
                  Tel: +254 (0)703 082 000<br />
                  Available in multiple languages
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <TeamSection
          title="International Patient Care Team"
          team={[
            { name: 'Dr. Sarah Kimani', title: 'Head of International Services', image: '/src/assets/images/image1.png', bio: 'Leading our international patient program with 15+ years of experience.' },
            { name: 'Ms. Jane Muthoni', title: 'Patient Experience Manager', image: '/src/assets/images/image2.png', bio: 'Ensures seamless patient journey and satisfaction.' },
            { name: 'Mr. Ahmed Hassan', title: 'Medical Travel Coordinator', image: '/src/assets/images/image3.png', bio: 'Handles travel logistics and accommodation.' },
            { name: 'Ms. Lucy Chen', title: 'International Liaison Officer', image: '/src/assets/images/image4.png', bio: 'Provides multilingual support and cultural assistance.' }
          ]}
        />

        {/* Client Testimonials */}
        <ClientsSay
          title="What Our International Patients Say"
          testimonials={[
            { quote: 'World-class care with exceptional personal attention.', name: 'Ahmed Al-Sayed', avatar: '/src/assets/images/image1.png', subtitle: 'UAE' },
            { quote: 'The support team made everything so easy.', name: 'Maria Rodriguez', avatar: '/src/assets/images/image2.png', subtitle: 'Spain' },
            { quote: 'Excellent medical facilities and caring staff.', name: 'John Smith', avatar: '/src/assets/images/image3.png', subtitle: 'USA' }
          ]}
        />

        {/* Insurance Partners */}
        <InsuranceSlider />
      </main>
    </div>
  );
};

export default MedicalTourism;