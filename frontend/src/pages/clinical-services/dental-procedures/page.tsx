import { FC } from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/Heading';
import { Shield, Award, Sparkles, Clock, HeartPulse, Microscope } from 'lucide-react';

const DentalProcedures: FC = () => {
  const procedures = [
    {
      name: 'Cosmetic Dentistry',
      description: 'Transform your smile with veneers, whitening, and cosmetic bonding.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      category: 'cosmetic',
      treatments: ['Teeth Whitening', 'Veneers', 'Cosmetic Bonding', 'Smile Makeover']
    },
    {
      name: 'Restorative Dentistry',
      description: 'Restore damaged teeth with crowns, bridges, and implants.',
      icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14z',
      category: 'restorative',
      treatments: ['Dental Crowns', 'Bridges', 'Implants', 'Inlays/Onlays']
    },
    {
      name: 'Orthodontics',
      description: 'Align your teeth with traditional braces or clear aligners.',
      icon: 'M4 7h16M4 12h16M4 17h16',
      category: 'orthodontics',
      treatments: ['Traditional Braces', 'Clear Aligners', 'Retainers']
    },
    {
      name: 'Preventive Care',
      description: 'Maintain oral health with cleanings and check-ups.',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      category: 'preventive',
      treatments: ['Cleanings', 'Check-ups', 'Fluoride Treatment', 'Sealants']
    },
    {
      name: 'Periodontal Treatment',
      description: 'Treat gum disease and maintain gum health.',
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      category: 'periodontal',
      treatments: ['Scaling', 'Root Planing', 'Gum Surgery', 'Maintenance']
    },
    {
      name: 'Endodontics',
      description: 'Save teeth with root canal therapy and treatments.',
      icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
      category: 'endodontic',
      treatments: ['Root Canal', 'Pulp Treatment', 'Post & Core']
    }
  ];

  const features = [
    {
      title: 'Advanced Technology',
      description: 'State-of-the-art dental equipment and digital imaging',
      icon: <Microscope className="w-6 h-6" />
    },
    {
      title: 'Expert Team',
      description: 'Highly skilled dental specialists and support staff',
      icon: <Award className="w-6 h-6" />
    },
    {
      title: 'Comfort-First Approach',
      description: 'Modern comfort amenities and gentle techniques',
      icon: <HeartPulse className="w-6 h-6" />
    }
  ];

  const highlights = [
    {
      title: 'Digital Dentistry',
      description: '3D scanning and CAD/CAM technology for precise treatments',
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      title: 'Same-Day Services',
      description: 'Advanced procedures completed in a single visit',
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: 'Safety Standards',
      description: 'Stringent sterilization and safety protocols',
      icon: <Shield className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Heading
        image_url="http://localhost:5173/clinical-services"
        title="Dental Procedures"
        description="World-class dental care with advanced technology and expert specialists."
        style="background"
      />

      {/* Welcome Section with Stats */}
      <div className="relative py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6"
            >
              Welcome to Modern Dentistry
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 leading-relaxed"
            >
              Experience exceptional dental care with our state-of-the-art technology
              and compassionate team of specialists.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-yellow-50 text-red-900 rounded-xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Showcase */}
      <div className="py-16 bg-gradient-to-br from-red-900 to-red-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-serif font-bold mb-6">
                  Advanced Dental Technology
                  <div className="mt-4 w-20 h-1 bg-yellow-600"></div>
                </h2>
                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                  Our facility is equipped with the latest dental technology,
                  ensuring precise diagnostics and comfortable treatments.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {highlights.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-red-800/50 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-yellow-400">
                          {item.icon}
                        </div>
                        <h4 className="font-semibold">{item.title}</h4>
                      </div>
                      <p className="text-red-200 text-sm">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src="https://hackleydds.com/wp-content/uploads/2021/04/shutterstock_1715643499.jpg"
                  alt="Advanced Dental Technology"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                  <p className="text-sm font-medium text-red-900">Digital Imaging System</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Procedures Grid */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-serif font-bold text-gray-900 mb-4"
            >
              Our Dental Procedures
              <div className="mt-4 w-20 h-1 bg-yellow-600 mx-auto"></div>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Comprehensive dental care using advanced techniques and technology
              for optimal oral health and beautiful smiles.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {procedures.map((procedure, index) => (
              <motion.div
                key={procedure.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
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
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{procedure.name}</h3>
                      <p className="text-gray-600 text-sm">{procedure.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {procedure.treatments.map((treatment) => (
                      <div
                        key={treatment}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <svg
                          className="w-4 h-4 text-red-900"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {treatment}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <a
                        href="#booking"
                        className="inline-flex items-center px-4 py-2 bg-yellow-50 text-red-900 rounded-lg font-medium hover:bg-yellow-100 transition-colors group"
                      >
                        Book Consultation
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
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        Available Daily
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-serif font-bold text-gray-900 mb-4"
            >
              Our Dental Specialists
              <div className="mt-4 w-20 h-1 bg-yellow-600 mx-auto"></div>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Meet our team of experienced dental professionals dedicated to
              providing you with the highest quality of care.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Louisa Mareri",
                role: "Lead Dentist",
                speciality: "Cosmetic Dentistry",
                image: "https://www.dentistokc.com/blog/wp-content/uploads/2022/02/AdobeStock_245685948__1644929547_44535.jpg",
                qualification: "BDS, MDS - Prosthodontics"
              },
              {
                name: "Dr. Sarah Njeri",
                role: "Orthodontist",
                speciality: "Orthodontics & Aligners",
                image: "https://static.wixstatic.com/media/8c9d66_219fdd42715e4363bfddbb2e1ba1c3c1~mv2.jpg/v1/fill/w_250,h_325,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/S_Mixon_edited.jpg",
                qualification: "BDS, MDS - Orthodontics"
              },
              {
                name: "Dr. Michael Omondi",
                role: "Periodontist",
                speciality: "Gum Care Specialist",
                image: "https://thumbs.dreamstime.com/b/portrait-smiling-handsome-black-dentist-doctor-digital-tablet-hands-posing-clinic-interior-young-african-american-male-220602356.jpg",
                qualification: "BDS, MDS - Periodontics"
              }
            ].map((doctor, index) => (
              <motion.div
                key={doctor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{doctor.name}</h3>
                    <p className="text-sm text-gray-200">{doctor.role}</p>
                  </div>
                </div>
                <div className="p-6">
                                      <p className="text-sm text-red-900">{doctor.speciality}</p>
                  <p className="text-sm text-gray-600">{doctor.qualification}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gradient-to-br from-yellow-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-serif font-bold text-gray-900 mb-4"
            >
              Patient Stories
              <div className="mt-4 w-20 h-1 bg-yellow-600 mx-auto"></div>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The dental team was incredibly professional and made my procedure completely painless. Best dental experience I've had!",
                name: "Alice Wanjiku",
                treatment: "Cosmetic Dentistry",
                rating: 5
              },
              {
                quote: "State-of-the-art facility with caring staff. My dental implant procedure was smooth and the results are amazing.",
                name: "James Kiprop",
                treatment: "Dental Implants",
                rating: 5
              },
              {
                quote: "Very impressed with the modern technology and expertise. The clear aligners have transformed my smile!",
                name: "Mary Akinyi",
                treatment: "Orthodontics",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4">
                  <div className="flex gap-1 text-yellow-400 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-red-900">{testimonial.treatment}</p>
                    </div>
                    <div className="text-red-900">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety & Comfort Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Your Safety & Comfort
                  <div className="mt-4 w-20 h-1 bg-yellow-600"></div>
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  We prioritize your safety and comfort with strict sterilization protocols,
                  modern amenities, and a caring approach to dental care.
                </p>
                <div className="grid grid-cols-1 gap-6">
                  {[
                    {
                      title: "Sterilization Standards",
                      description: "Advanced sterilization protocols exceeding industry standards"
                    },
                    {
                      title: "Comfort Amenities",
                      description: "Relaxing environment with entertainment and comfort features"
                    },
                    {
                      title: "Pain Management",
                      description: "Latest techniques and technologies for painless procedures"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-red-900"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src="https://www.marveldentalcare.com/blog/wp-content/uploads/2020/06/Dentist_in_Burleson_putting_on_PPE__.jpg"
                  alt="Dental Safety Protocols"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                  <p className="text-sm font-medium text-red-900">Advanced Sterilization</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentalProcedures;