import { FC } from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/Heading';
import { Shield, Award, Activity } from 'lucide-react';
import InsuranceSlider from '@/components/InsuranceSlider';
import ClientsSay from '@/components/ClientsSay';
import TeamSection from '@/components/TeamSection';

const EndoscopyServices: FC = () => {
  const procedures = [
    {
      name: 'Endoscopy',
      description: 'Visual examination of the upper digestive system.',
      icon: 'M9 6v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M9 19h.01M12 19h.01M15 19h.01M5 19h.01M5 16h.01M5 13h.01M19 19h.01M19 16h.01M19 13h.01M5 3h.01M19 3h.01',
      category: 'diagnostic'
    },
    {
      name: 'Colonoscopy',
      description: 'Examination of the large intestine and rectum.',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      category: 'diagnostic'
    },
    {
      name: 'Bronchoscopy',
      description: 'Examination of the airways and lungs.',
      icon: 'M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
      category: 'diagnostic'
    },
    {
      name: 'ERCP',
      description: 'Advanced imaging of bile and pancreatic ducts.',
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      category: 'diagnostic'
    },
    {
      name: 'Stenting',
      description: 'Placement of stents to maintain organ patency.',
      icon: 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z',
      category: 'therapeutic'
    },
    {
      name: 'Band Ligation',
      description: 'Treatment for bleeding varices.',
      icon: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z',
      category: 'therapeutic'
    },
    {
      name: 'Thermal Heat Probe',
      description: 'Treatment of bleeding ulcers.',
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      category: 'therapeutic'
    },
    {
      name: 'Sclerotherapy',
      description: 'Treatment of varices and hemorrhoids.',
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      category: 'therapeutic'
    },
    {
      name: 'PEG Insertion',
      description: 'Placement of feeding tubes.',
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
      category: 'therapeutic'
    },
    {
      name: 'Foreign Body Removal',
      description: 'Extraction of swallowed objects.',
      icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
      category: 'therapeutic'
    }
  ];

  const features = [
    {
      title: 'HDTV Endoscopy System',
      description: 'Ultra-modern equipment for high-precision diagnostics and procedures',
      icon: <Activity className="w-6 h-6" />
    },
    {
      title: 'Expert Team',
      description: 'Highly skilled specialists with extensive experience',
      icon: <Award className="w-6 h-6" />
    },
    {
      title: 'Advanced Procedures',
      description: 'Comprehensive range of diagnostic and therapeutic services',
      icon: <Shield className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Heading
        image_url="https://static.wixstatic.com/media/f4a4c6_ffa4117acbc844e28a5cad01e137be6a~mv2.jpg/v1/fill/w_568,h_380,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/f4a4c6_ffa4117acbc844e28a5cad01e137be6a~mv2.jpg"
        title="Endoscopy Services"
        description="Comprehensive diagnostic and therapeutic endoscopic procedures delivered by expert specialists."
        style="background"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white to-red-50 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-red-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Introduction with Image */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent rounded-2xl"></div>
              <img
                src="https://static.wixstatic.com/media/f4a4c6_ffa4117acbc844e28a5cad01e137be6a~mv2.jpg/v1/fill/w_568,h_380,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/f4a4c6_ffa4117acbc844e28a5cad01e137be6a~mv2.jpg"
                alt="Advanced Endoscopy Equipment"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                <p className="text-sm font-medium text-red-900">HDTV Endoscopy System</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:pl-8"
            >
              <h2 className="text-3xl font-serif font-bold text-red-900 mb-6">
                Advanced Endoscopic Care
                <div className="mt-4 w-20 h-1 bg-yellow-600"></div>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The Endoscopy Unit at The Nairobi Hospital is equipped with an ultra-modern HDTV endoscopy system, 
                enabling our specialists to perform high-precision diagnostic and therapeutic procedures.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our state-of-the-art facility combines advanced technology with expert care to provide 
                the highest standard of endoscopic services in East Africa.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-1">State-of-the-Art</h4>
                  <p className="text-sm text-gray-600">Advanced imaging technology</p>
                </div>
                <div className="flex-1 bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-1">Expert Team</h4>
                  <p className="text-sm text-gray-600">Experienced specialists</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Procedures Grid */}
        <div className="mb-16" id="procedures">
          <div className="relative py-16 bg-gradient-to-br from-gray-50 to-white mb-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
            <div className="relative">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-red-900 mb-4">
                  Our Procedures
                  <div className="mt-4 w-20 h-1 bg-yellow-600 mx-auto"></div>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We offer a comprehensive range of diagnostic and therapeutic endoscopic procedures 
                  using advanced technology and expert techniques.
                </p>
              </div>

              {/* Diagnostic Procedures */}
              <div className="mb-12">
                <h3 className="text-2xl font-serif font-bold text-red-900 mb-6">
                  Diagnostic Procedures
                  <div className="mt-2 w-16 h-1 bg-red-900/20"></div>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {procedures
                    .filter(procedure => procedure.category === 'diagnostic')
                    .map((procedure, index) => (
                      <motion.div
                        key={procedure.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="flex-shrink-0">
                              <div className="p-3 bg-gradient-to-br from-red-100 to-red-50 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                                <svg
                                  className="w-8 h-8 text-red-900"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d={procedure.icon}
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="flex-grow">
                              <h4 className="text-lg font-bold text-gray-900 mb-2">{procedure.name}</h4>
                              <p className="text-gray-600 text-sm leading-relaxed">{procedure.description}</p>
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                              <a
                                href="#booking"
                                className="inline-flex items-center px-4 py-2 bg-red-50 text-red-900 rounded-lg font-medium hover:bg-red-100 transition-colors group"
                              >
                                Book an Appointment
                                <svg 
                                  className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M9 5l7 7-7 7" 
                                  />
                                </svg>
                              </a>
                              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Available Daily</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>

              {/* Therapeutic Procedures */}
              <div>
                <h3 className="text-2xl font-serif font-bold text-red-900 mb-6">
                  Therapeutic Procedures
                  <div className="mt-2 w-16 h-1 bg-red-900/20"></div>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {procedures
                    .filter(procedure => procedure.category === 'therapeutic')
                    .map((procedure, index) => (
                      <motion.div
                        key={procedure.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="flex-shrink-0">
                              <div className="p-3 bg-gradient-to-br from-red-100 to-red-50 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                                <svg
                                  className="w-8 h-8 text-red-900"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d={procedure.icon}
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="flex-grow">
                              <h4 className="text-lg font-bold text-gray-900 mb-2">{procedure.name}</h4>
                              <p className="text-gray-600 text-sm leading-relaxed">{procedure.description}</p>
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                              <a
                                href="#booking"
                                className="inline-flex items-center px-4 py-2 bg-red-50 text-red-900 rounded-lg font-medium hover:bg-red-100 transition-colors group"
                              >
                                Book an Appointment
                                <svg 
                                  className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M9 5l7 7-7 7" 
                                  />
                                </svg>
                              </a>
                              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Available Daily</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Team Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-red-900 mb-4">
                Our Clinical Team
                <div className="mt-4 w-20 h-1 bg-yellow-600 mx-auto"></div>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our dedicated team of specialists brings years of expertise in endoscopic procedures.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Sarah Kamau",
                  role: "Lead Endoscopist",
                  image: "https://www.shutterstock.com/image-photo/portrait-smiling-female-doctor-wearing-260nw-1393901411.jpg",
                  qualification: "MBBS, Fellowship in Advanced Endoscopy"
                },
                {
                  name: "Dr. James Omondi",
                  role: "Gastroenterologist",
                  image: "https://t4.ftcdn.net/jpg/01/36/18/77/360_F_136187711_qeBMOwkPdTg1dCN8e5TR1AmduXDz60Xn.jpg",
                  qualification: "MD, Specialist in Therapeutic Endoscopy"
                },
                {
                  name: "Dr. Anne Njeri",
                  role: "Senior Endoscopist",
                  image: "https://www.curasia.com/wp-content/uploads/2023/12/How-Endoscopy-Is-Revolutionizing-Medical-Treatments-Curasia.jpg",
                  qualification: "MBBS, Advanced Endoscopy Certification"
                }
              ].map((doctor, index) => (
                <motion.div
                  key={doctor.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-red-900 mb-1">{doctor.name}</h3>
                    <p className="text-gray-600 font-medium mb-2">{doctor.role}</p>
                    <p className="text-sm text-gray-500">{doctor.qualification}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Patient Testimonials */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-red-900 mb-4">
                Patient Testimonials
                <div className="mt-4 w-20 h-1 bg-yellow-600 mx-auto"></div>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear from our patients about their experiences with our endoscopy services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "The team was very professional and made me feel at ease throughout my procedure. Excellent care from start to finish.",
                  name: "Jane Muthoni",
                  date: "October 2025"
                },
                {
                  quote: "State-of-the-art facilities and a caring team. They explained everything clearly and ensured I was comfortable.",
                  name: "David Kiprop",
                  date: "September 2025"
                },
                {
                  quote: "Quick and efficient service. The follow-up care was thorough and the staff were very supportive.",
                  name: "Mary Akinyi",
                  date: "October 2025"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-red-900 to-red-800 text-white rounded-xl p-6 shadow-lg"
                >
                  <div className="mb-4">
                    <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-red-100 mb-6">{testimonial.quote}</p>
                  <div className="text-red-100">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm opacity-75">{testimonial.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Appointment CTA */}
        </div>

  {/* Clinical Team (inserted before ClientsSay) */}
  <TeamSection
    title="Endoscopy Clinical Team"
    team={[
      { name: 'Dr. Sarah Kamau', title: 'Lead Endoscopist', image: '/src/assets/images/image1.png', bio: 'Expert in diagnostic and therapeutic endoscopy.' },
      { name: 'Dr. James Omondi', title: 'Gastroenterologist', image: '/src/assets/images/image2.png', bio: 'Specialist in upper and lower GI procedures.' },
      { name: 'Dr. Anne Njeri', title: 'Senior Endoscopist', image: '/src/assets/images/image3.png', bio: 'Focus on complex endoscopic therapy.' },
      { name: 'Ms. Faith Mwangi', title: 'Endoscopy Nurse Lead', image: '/src/assets/images/image4.png', bio: 'Manages nursing care and patient prep.' },
    ]}
  />

  {/* Client Testimonials */}
  <ClientsSay
    title="What our clients say about Endoscopy"
    testimonials={[
      { quote: 'Procedure was explained clearly and I felt comfortable.', name: 'K. Maina', avatar: '/src/assets/images/image1.png' },
      { quote: 'Efficient service and kind staff.', name: 'B. Chebet', avatar: '/src/assets/images/image2.png' },
      { quote: 'Smooth pre-op and quick recovery guidance.', name: 'T. Mwikali', avatar: '/src/assets/images/image3.png' },
    ]}
  />

  {/* Insurance Partners */}
  <InsuranceSlider />
      </div>
    </div>
  );
};

export default EndoscopyServices;