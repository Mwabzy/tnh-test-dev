import { FC } from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/Heading';
import { Calendar, Clock, Check, Phone, ChevronRight } from 'lucide-react';
import InsuranceSlider from '@/components/InsuranceSlider';

const AntenatalServices: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Heading
        image_url="https://medstarhealth-delivery.sitecorecontenthub.cloud/api/public/content/services%2Fmaternity-services?v=da1cbac4"
        title="Antenatal Care Services"
        description="World-class maternity care for mothers and babies"
        style="background"
      />

      <main role="main" aria-label="Antenatal Services" className="pb-20">
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
                  <p className="text-sm text-gray-500 mb-2">Expert Maternity Care</p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-red-900 leading-tight mb-4">
                    World-Class Antenatal Care Services
                  </h1>
                  <p className="text-gray-700 max-w-2xl leading-relaxed mb-6">
                    Experience exceptional care throughout your pregnancy journey at The Nairobi Hospital. Our dedicated team of obstetricians, midwives, and specialists provide comprehensive antenatal care, ensuring the health and well-being of both mother and baby.
                  </p>
                  <div className="flex items-center gap-3">
                    <a href="#book-appointment" className="px-5 py-3 bg-red-900 text-white rounded-full font-medium hover:bg-red-800 transition">
                      Book Appointment
                    </a>
                    <a href="tel:+254703082622" className="px-4 py-3 border border-gray-200 rounded-full text-sm inline-flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Contact Maternity Unit
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
                    src="https://motherandchildhospital.com/wp-content/uploads/2020/09/why-antenatal-care-1.jpg" 
                    alt="Antenatal Care at TNH" 
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
                { value: "25+", label: "Specialist Obstetricians" },
                { value: "24/7", label: "Maternity Care" },
                { value: "5000+", label: "Annual Deliveries" },
                { value: "99%", label: "Patient Satisfaction" }
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

        {/* Main Services */}
        <section className="container mx-auto px-4 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              {/* Services Grid */}
              <div className="space-y-8">
                <motion.h2 
                  className="text-2xl font-serif font-bold text-red-900"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Our Services
                </motion.h2>
                
                {[{
                  title: 'Comprehensive Antenatal Care',
                  image: 'https://triowellnessclinic.com/wp-content/uploads/2021/11/antenatal-care.jpg',
                  description: 'Regular monitoring and care throughout your pregnancy journey.',
                  features: [
                    'Routine health checks and monitoring',
                    'Fetal growth assessment',
                    'Risk assessment and management',
                    'Nutritional guidance and support'
                  ]
                }, {
                  title: 'Advanced Diagnostics',
                  image: 'https://prolificlondon.co.uk/wp-content/uploads/2024/07/materinity.jpeg',
                  description: 'State-of-the-art diagnostic services for comprehensive fetal assessment.',
                  features: [
                    'High-resolution ultrasound scanning',
                    'Genetic screening options',
                    'Fetal wellbeing monitoring',
                    'Laboratory services'
                  ]
                }, {
                  title: 'Pregnancy Support',
                  image: 'https://stpsupport.nice.org.uk/transforming-maternity-services/assets/c8H9NtXhWb/istock-1056977996-750x500.jpeg',
                  description: 'Complete support system for a healthy pregnancy journey.',
                  features: [
                    'Antenatal classes and education',
                    'Nutritional counseling',
                    'Mental health support',
                    'Birth plan development'
                  ]
                }].map((service, idx) => (
                  <motion.article 
                    key={service.title} 
                    className={`grid ${idx % 2 === 0 ? 'md:grid-cols-2' : 'md:grid-cols-2 md:flex-row-reverse'} gap-6 items-center`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="rounded-xl overflow-hidden shadow-md">
                      <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-red-900 mb-2 font-serif">{service.title}</h3>
                      <p className="text-gray-700 mb-4">{service.description}</p>
                      <ul className="text-sm text-gray-700 space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-red-900 mt-1" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Education & Support */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-red-900 mb-6">Education & Support Programs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1wO_X74wfGzMBRAjD7EiVlRMSaMtoz3EtPw&s" 
                      alt="Antenatal Classes" 
                      className="rounded-xl w-full h-48 object-cover mb-4"
                    />
                    <h4 className="font-semibold mb-2">Antenatal Classes</h4>
                    <p className="text-sm text-gray-700">
                      Comprehensive education covering pregnancy, childbirth, and early parenting skills.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <img 
                      src="https://media.licdn.com/dms/image/v2/D5612AQHEUe1i2nYCFw/article-cover_image-shrink_720_1280/B56Zj4ThNYG4AM-/0/1756512524579?e=2147483647&v=beta&t=ABaBeaIp2V_tR9jzdG6o2bksy83gVXWc7ZHbgRpjCAI" 
                      alt="Nutritional Support" 
                      className="rounded-xl w-full h-48 object-cover mb-4"
                    />
                    <h4 className="font-semibold mb-2">Nutritional Guidance</h4>
                    <p className="text-sm text-gray-700">
                      Expert dietary advice and supplementation guidance for optimal maternal health.
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Clinic Schedule */}
              <motion.div 
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-red-900 mb-4">Clinic Schedule</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Regular Clinic Hours</h4>
                    <table className="w-full text-sm">
                      <tbody className="space-y-2">
                        <tr><td className="py-1">Monday</td><td className="py-1">12:00pm - 4:00pm</td></tr>
                        <tr><td className="py-1">Tuesday</td><td className="py-1">8:00am - 4:00pm</td></tr>
                        <tr><td className="py-1">Wednesday</td><td className="py-1">8:00am - 12:00pm</td></tr>
                        <tr><td className="py-1">Thursday</td><td className="py-1">1:00pm - 4:00pm</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Special Services</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-red-900" />
                        24/7 Emergency Care
                      </li>
                      <li className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-red-900" />
                        Weekend Appointments Available
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-4">
                {/* Appointment Booking */}
                <motion.div 
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h5 className="font-semibold text-red-900">Book an Appointment</h5>
                  <p className="text-sm text-gray-700 mt-2">
                    Schedule your antenatal consultation with our specialist team.
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    <a href="#book-appointment" className="px-4 py-2 bg-red-900 text-white rounded-md text-center">
                      Book Appointment
                    </a>
                    <a href="tel:+254703082622" className="px-4 py-2 border rounded-md text-center">
                      Call +254 703 082 622
                    </a>
                  </div>
                </motion.div>

                {/* Packages */}
                <motion.div 
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <h5 className="font-semibold text-red-900">Antenatal Packages</h5>
                  <ul className="mt-3 text-sm text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                      Basic Care Package
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                      Comprehensive Package
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                      Premium Maternity Package
                    </li>
                  </ul>
                  <a href="/maternity-packages" className="mt-4 text-red-900 text-sm font-medium inline-flex items-center">
                    View package details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </motion.div>

                {/* Contact */}
                <motion.div 
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h5 className="font-semibold text-red-900">Contact Us</h5>
                  <p className="text-sm text-gray-700 mt-2">
                    Antenatal Clinic<br/>
                    The Nairobi Hospital<br/>
                    Argwings Kodhek Road, Nairobi
                  </p>
                  <p className="text-sm text-gray-700 mt-3">
                    Appointments: +254 (0)703 082 622<br/>
                    Emergency: +254 (0)20 2845 000<br/>
                    Email: antenatal@nairobihospital.org
                  </p>
                </motion.div>
              </div>
            </aside>
          </div>
        </section>

        {/* Insurance Partners */}
        <InsuranceSlider />
      </main>
    </div>
  );
};

export default AntenatalServices;
