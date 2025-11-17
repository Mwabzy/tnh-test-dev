import { FC } from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/Heading';
import { Activity, Clock, Phone, Users, Target, Brain, ChevronRight } from 'lucide-react';
import InsuranceSlider from '@/components/InsuranceSlider';
import ClientsSay from '@/components/ClientsSay';
import TeamSection from '@/components/TeamSection';

const PhysiotherapyRehab: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Heading
        image_url="/src/assets/heroimages/physiotherapy.jpg"
        title="Physiotherapy & Rehabilitation"
        description="Comprehensive rehabilitation services for optimal recovery"
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
                  <p className="text-sm text-gray-500 mb-2">Rehabilitation Services</p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-red-900 leading-tight mb-4">
                    Expert Rehabilitation Care
                  </h1>
                  <p className="text-gray-700 max-w-2xl leading-relaxed mb-6">
                    Our physiotherapy and rehabilitation department provides comprehensive care to help patients recover from injuries, surgeries, and various medical conditions. Our team of expert therapists uses advanced techniques and equipment to restore function and improve quality of life.
                  </p>
                  <div className="flex items-center gap-3">
                    <a href="#services" className="px-5 py-3 bg-red-900 text-white rounded-full font-medium hover:bg-red-800 transition">
                      Our Services
                    </a>
                    <a href="tel:+254703082300" className="px-4 py-3 border border-gray-200 rounded-full text-sm inline-flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Book Appointment
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
                  <h2 className="text-lg font-semibold mb-4">Department Hours</h2>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-red-900" />
                      <div>
                        <p className="font-medium">Operating Hours</p>
                        <p className="text-gray-600">Mon - Fri: 7:00 AM - 7:00 PM</p>
                        <p className="text-gray-600">Sat: 8:00 AM - 4:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-red-900" />
                      <div>
                        <p className="font-medium">Appointments</p>
                        <p className="text-gray-600">Tel: +254 (0)703 082 300</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              {/* Added Image */}
              <div className="lg:col-span-5">
                <motion.div 
                  className="rounded-2xl overflow-hidden shadow-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src="/src/assets/images/physio-rehab.jpg" 
                    alt="Physiotherapy and Rehabilitation" 
                    className="w-full h-[400px] object-cover"
                  />
                </motion.div>
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Services */}
        <section id="services" className="container mx-auto px-4 mt-16">
          <motion.h2 
            className="text-2xl font-serif font-bold text-red-900 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Rehabilitation Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Orthopedic Rehabilitation",
                icon: Activity,
                description: "Recovery from bone, joint, and muscle conditions",
                services: [
                  "Post-surgery rehabilitation",
                  "Sports injury recovery",
                  "Joint replacement therapy",
                  "Spine rehabilitation",
                  "Fracture recovery",
                  "Arthritis management"
                ]
              },
              {
                title: "Neurological Rehabilitation",
                icon: Brain,
                description: "Treatment for neurological conditions and injuries",
                services: [
                  "Stroke rehabilitation",
                  "Spinal cord injury therapy",
                  "Brain injury recovery",
                  "Multiple sclerosis care",
                  "Balance disorders",
                  "Parkinson's management"
                ]
              },
              {
                title: "Sports Rehabilitation",
                icon: Target,
                description: "Specialized care for athletes and sports injuries",
                services: [
                  "Sports injury treatment",
                  "Performance enhancement",
                  "Injury prevention",
                  "Sport-specific training",
                  "Return to play programs",
                  "Athletic conditioning"
                ]
              }
            ].map((service, idx) => (
              <motion.div
                key={service.title}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <service.icon className="w-8 h-8 text-red-900 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.services.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <ChevronRight className="w-4 h-4 text-red-900 mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Facilities & Equipment */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <motion.h3 
              className="text-xl font-semibold text-red-900 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Facilities & Equipment
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Exercise Area",
                  features: [
                    "Modern gym equipment",
                    "Cardio machines",
                    "Weight training area",
                    "Exercise mats"
                  ]
                },
                {
                  title: "Treatment Rooms",
                  features: [
                    "Private therapy rooms",
                    "Manual therapy beds",
                    "Electrotherapy units",
                    "Ultrasound equipment"
                  ]
                },
                {
                  title: "Specialized Equipment",
                  features: [
                    "Hydrotherapy pool",
                    "Balance systems",
                    "Gait analysis system",
                    "Traction units"
                  ]
                },
                {
                  title: "Assessment Tools",
                  features: [
                    "Movement analysis",
                    "Strength testing",
                    "Range of motion tools",
                    "Posture assessment"
                  ]
                }
              ].map((facility, idx) => (
                <motion.div
                  key={facility.title}
                  className="bg-white p-6 rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <h4 className="font-semibold mb-3">{facility.title}</h4>
                  <ul className="space-y-2">
                    {facility.features.map((feature, i) => (
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

        {/* Our Team */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-semibold text-red-900 mb-6">Our Rehabilitation Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <Users className="w-8 h-8 text-red-900 mb-4" />
                <h4 className="font-semibold mb-2">Physiotherapists</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Musculoskeletal Specialists
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Sports Therapists
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Neuro Physiotherapists
                  </li>
                </ul>
              </div>
              <div>
                <Target className="w-8 h-8 text-red-900 mb-4" />
                <h4 className="font-semibold mb-2">Specialists</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Occupational Therapists
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Speech Therapists
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Rehabilitation Nurses
                  </li>
                </ul>
              </div>
              <div>
                <Brain className="w-8 h-8 text-red-900 mb-4" />
                <h4 className="font-semibold mb-2">Support Team</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Exercise Physiologists
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Therapy Assistants
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Case Coordinators
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-semibold text-red-900 mb-6">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Appointments</h4>
                <p className="text-sm text-gray-700">
                  Mon - Fri: 8:00 AM - 5:00 PM<br />
                  Tel: +254 (0)703 082 300<br />
                  Email: physio@nairobihospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Emergency Rehabilitation</h4>
                <p className="text-sm text-gray-700">
                  24/7 Service<br />
                  Tel: +254 (0)703 082 000<br />
                  Email: emergency@nairobihospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Insurance & Billing</h4>
                <p className="text-sm text-gray-700">
                  Mon - Fri: 9:00 AM - 4:00 PM<br />
                  Tel: +254 (0)703 082 301<br />
                  Email: billing@nairobihospital.org
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Clinical Team (inserted before ClientsSay) */}
        <TeamSection
          title="Physiotherapy & Rehab Team"
          team={[
            { name: 'Ms. Nancy Kiprono', title: 'Head Physiotherapist', image: '/src/assets/images/image1.png', bio: 'Leads physiotherapy programs and clinical governance.' },
            { name: 'Mr. Isaac Mutua', title: 'Senior Therapist', image: '/src/assets/images/image2.png', bio: 'Specialises in neurological rehabilitation.' },
            { name: 'Ms. Angela Wanyeki', title: 'Hydrotherapy Lead', image: '/src/assets/images/image3.png', bio: 'Manages hydrotherapy and pool-based rehab.' },
            { name: 'Mr. Joseph Karanja', title: 'Exercise Physiologist', image: '/src/assets/images/image4.png', bio: 'Focus on exercise prescription and performance.' },
          ]}
        />

        {/* Client Testimonials */}
        <ClientsSay
          title="What our clients say about Physiotherapy & Rehab"
          testimonials={[
            { quote: 'Rehab sessions improved my strength and mobility.', name: 'N. Kiprono', avatar: '/src/assets/images/image1.png' },
            { quote: 'Personalized therapy plans with measurable progress.', name: 'I. Mutua', avatar: '/src/assets/images/image2.png' },
            { quote: 'Friendly therapists and great facilities.', name: 'A. Wanyeki', avatar: '/src/assets/images/image3.png' },
          ]}
        />

  {/* Insurance Partners */}
  <InsuranceSlider />
      </main>
    </div>
  );
};

export default PhysiotherapyRehab;