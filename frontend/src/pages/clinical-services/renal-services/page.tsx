import { FC } from 'react';
import { Users, Phone, Clock, MonitorSmartphone, ChevronRight, Heart, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Heading from '@/components/Heading';
import TeamSection from '@/components/TeamSection';
import ClientsSay from '@/components/ClientsSay';
import InsuranceSlider from '@/components/InsuranceSlider';

const RenalServices: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Heading
        image_url="/src/assets/heroimages/renal.jpg"
        title="Renal Services"
        description="Comprehensive kidney care including dialysis and transplant support"
        style="background"
      />

      <main role="main" aria-label="Renal Services" className="pb-20">
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
                  <p className="text-sm text-gray-500 mb-2">Comprehensive Renal Care</p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-red-900 leading-tight mb-4">
                    World-Class Kidney Care Services
                  </h1>
                  <p className="text-gray-700 max-w-2xl leading-relaxed mb-6">
                    Our state-of-the-art renal unit provides comprehensive kidney care, from routine dialysis to complex transplant procedures. Our expert team delivers personalized treatment using the latest technology and evidence-based practices.
                  </p>
                  <div className="flex items-center gap-3">
                    <a href="#services" className="px-5 py-3 bg-red-900 text-white rounded-full font-medium hover:bg-red-800 transition">
                      Our Services
                    </a>
                    <a href="tel:+254703082000" className="px-4 py-3 border border-gray-200 rounded-full text-sm inline-flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Emergency Contact
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
                    src="https://www.shutterstock.com/image-photo/modern-hemodialysis-machines-hospital-260nw-358516537.jpg" 
                    alt="Modern dialysis unit" 
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
                { value: "24/7", label: "Dialysis support" },
                { value: "98%", label: "Treatment success rate" },
                { value: "5,000+", label: "Annual dialysis sessions" },
                { value: "15+", label: "Specialist nephrologists" }
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

        {/* Services / Units */}
        <section className="container mx-auto px-4 mt-16">
          <motion.h2 
            className="text-2xl font-serif font-bold text-red-900 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Specialized Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Hemodialysis Center", 
                image: "https://www.shutterstock.com/image-photo/modern-hemodialysis-machines-clinic-260nw-1506757133.jpg", 
                description: "State-of-the-art dialysis facilities with modern equipment and expert care.", 
                features: ["Latest dialysis machines", "Comfortable environment", "Infection control protocols"] 
              },
              { 
                title: "Transplant Services", 
                image: "https://www.shutterstock.com/image-photo/medical-team-performing-transplant-operation-260nw-398538389.jpg", 
                description: "Comprehensive transplant evaluation and coordination services.", 
                features: ["Pre-transplant assessment", "Donor matching", "Post-transplant care"] 
              },
              { 
                title: "Nephrology Clinic", 
                image: "https://www.shutterstock.com/image-photo/doctor-explaining-kidney-anatomy-patient-260nw-1715248611.jpg", 
                description: "Expert consultation and management of kidney conditions.", 
                features: ["Kidney disease management", "Hypertension care", "Preventive nephrology"] 
              }
            ].map((unit, idx) => (
              <motion.div
                key={unit.title}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={unit.image}
                    alt={unit.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{unit.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{unit.description}</p>
                  <ul className="space-y-2">
                    {unit.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-red-900 mt-1 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technology & Expertise */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <motion.h3 
              className="text-xl font-semibold text-red-900 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Advanced Technology & Expertise
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[{
                title: "Modern Equipment",
                icon: MonitorSmartphone,
                description: "Latest dialysis machines with advanced monitoring",
                features: ["High-flux dialyzers", "Online monitoring", "Water purification"]
              },{
                title: "Expert Care",
                icon: Heart,
                description: "Experienced nephrology team and specialists",
                features: ["Board-certified nephrologists", "Specialized nurses", "Technical support"]
              },{
                title: "Quality Standards",
                icon: Shield,
                description: "International standards of renal care",
                features: ["ISO certification", "Regular audits", "Safety protocols"]
              }].map((tech, idx) => (
                <motion.div
                  key={tech.title}
                  className="bg-white p-6 rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <tech.icon className="w-8 h-8 text-red-900 mb-4" />
                  <h4 className="font-semibold mb-2">{tech.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{tech.description}</p>
                  <ul className="space-y-2">
                    {tech.features.map((feature, i) => (
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

        {/* Team & Support */}
        <section className="container mx-auto px-4 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Medical Team Summary */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Users className="w-8 h-8 text-red-900 mb-4" />
              <h3 className="text-lg font-semibold mb-4">Our Renal Care Team</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                  Consultant Nephrologists
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                  Dialysis Specialists
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                  Transplant Coordinators
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                  Renal Nurses
                </li>
              </ul>
            </motion.div>

            {/* Hours / Contact */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Clock className="w-8 h-8 text-red-900 mb-4" />
              <h3 className="text-lg font-semibold mb-4">Contact & Hours</h3>
              <div className="space-y-4 text-sm text-gray-700">
                <p><strong>Dialysis Unit:</strong><br/>24/7 service available</p>
                <p><strong>Nephrology Clinic:</strong><br/>Mon - Fri: 8:00 AM - 5:00 PM</p>
                <p><strong>Emergency Contact:</strong><br/>Tel: +254 (0)703 082 000</p>
                <p className="text-red-900 font-medium">24-hour emergency dialysis available</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Clinical Team Section */}
        <div className="container mx-auto px-4 mt-12">
          <TeamSection
            title="Our Specialist Team"
            team={[
              { name: 'Dr. Kevin Wanjiru', title: 'Lead Nephrologist', image: '/src/assets/images/image1.png', bio: 'Specialises in dialysis and transplant assessment.' },
              { name: 'Ms. Patricia Otieno', title: 'Dialysis Nurse Lead', image: '/src/assets/images/image2.png', bio: 'Coordinates dialysis schedules and patient care.' },
              { name: 'Mr. Paul Ouma', title: 'Renal Technician', image: '/src/assets/images/image3.png', bio: 'Maintains dialysis equipment and safety.' },
              { name: 'Ms. Lillian Muthoni', title: 'Transplant Coordinator', image: '/src/assets/images/image4.png', bio: 'Manages transplant assessments and follow-up.' }
            ]}
          />

          {/* Client Testimonials */}
          <div className="mt-12">
            <ClientsSay
              title="What our clients say about Renal Services"
              testimonials={[
                { quote: 'Excellent dialysis care and attentive nursing staff who make the process comfortable.', name: 'K. Wanjiru', avatar: '/src/assets/images/image1.png', subtitle: 'Dialysis Patient' },
                { quote: 'The transplant team provided exceptional support throughout my journey.', name: 'P. Otieno', avatar: '/src/assets/images/image2.png', subtitle: 'Transplant Patient' },
                { quote: 'Professional care with a personal touch. The team goes above and beyond.', name: 'L. Muthoni', avatar: '/src/assets/images/image3.png', subtitle: 'Regular Patient' }
              ]}
            />
          </div>

          {/* Insurance Partners */}
          <div className="mt-8">
            <InsuranceSlider />
          </div>
        </div>

        {/* Contact & Support */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-semibold text-red-900 mb-6">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Dialysis Unit</h4>
                <p className="text-sm text-gray-700">
                  24/7 Service Available<br />
                  Tel: +254 (0)703 082 000<br />
                  Email: renal@hospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Transplant Services</h4>
                <p className="text-sm text-gray-700">
                  Mon - Fri: 8:00 AM - 5:00 PM<br />
                  Tel: +254 (0)703 082 001<br />
                  Email: transplant@hospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Emergency Support</h4>
                <p className="text-sm text-gray-700">
                  24/7 Emergency Dialysis<br />
                  Tel: +254 (0)703 082 911
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RenalServices;
